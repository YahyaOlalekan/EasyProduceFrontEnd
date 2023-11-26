document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.getElementById('filterButton');

    filterButton.addEventListener('click', function () {
        populateProduceTypeRequests();
    });

    document.addEventListener('click', function (event) {
        const target = event.target;

        if (target.matches('button[data-action="approve"]')) {
            const requestId = target.getAttribute('data-requestId');
            const farmerId = target.getAttribute('data-farmerId');
            approveRequest(requestId, farmerId, 2);
        }

        if (target.matches('button[data-action="reject"]')) {
            const requestId = target.getAttribute('data-requestId');
            const farmerId = target.getAttribute('data-farmerId');
            openModal(requestId, farmerId);
        }
    });

    // Define the closeModal function
    function closeModal() {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    }

    // Define the openModal function
    function openModal(requestId, farmerId) {
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
        document.getElementById('modalRequestId').value = requestId;
        document.getElementById('modalFarmerId').value = farmerId;

        const modalRequestId = document.getElementById('modalRequestId');
        const modalFarmerId = document.getElementById('modalFarmerId');
        const rejectionReasonInput = document.getElementById('rejectionReasonInput');
        const submitReasonButton = document.getElementById('submitReason');

        document.getElementById('closeModal').addEventListener('click', function () {
            closeModal();
        });

        submitReasonButton.addEventListener('click', function () {
            const requestId = modalRequestId.value;
            const farmerId = modalFarmerId.value;
            const rejectionReason = rejectionReasonInput.value;

            if (rejectionReason) {
                rejectRequest(requestId, farmerId, 3, rejectionReason);
                closeModal();
            } else {
                alert('Please enter a rejection reason.');
            }
        });
    }

    async function approveRequest(requestId, farmerId, status) {
        try {
            const response = await fetch(`${baseUrl}api/Request/VerifyRequest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requestId: requestId,
                    farmerId: farmerId,
                    requestStatus: status
                })
            });

            if (response.ok) {
                // document.getElementById('fbutton').innerHTML = "Approved"
                document.getElementById('fbutton').setAttribute('disabled', 'true');
                showSweetAlert('Request Approved Successfully');

            } else {
                showSweetAlertError('Failed to Approve Request');
                console.log('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    // .then(data => {
    //     if (data.status) {
    //         // alert("Produce type verification successful!");
    //         showSweetAlert(data.message);
    //     } else {
    //         // alert("Produce type verification failed.");
    //         showSweetAlertError(data.message);
    //     }
    // })
    // .catch(error => {
    //     console.error("Error:", error);
    //     alert("An error occurred while verifying the produce type.");
    // });


    async function rejectRequest(requestId, farmerId, status, rejectionReason) {
        try {
            const response = await fetch(`${baseUrl}api/Request/VerifyRequest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestId: requestId,
                    farmerId: farmerId,
                    requestStatus: status,
                    rejectionReason: rejectionReason,
                }),
            });

            if (response.ok) {
                showSweetAlert('Request Rejected Successfully');
            } else {
                showSweetAlertError('Failed to Reject Request');
                console.log('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function populateProduceTypeRequests() {
        fetch(`${baseUrl}api/Request/GetAllProduceTypeRequests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requestType: parseInt(document.getElementById('requestType').value),
                requestStatus: document.getElementById('requestStatus').value === '' ? null : parseInt(document.getElementById('requestStatus').value),
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const requestList = document.getElementById('requestLists');
                const title = document.getElementById('titles');
                title.textContent = 'Produce-Type List';
                const block = document.getElementById('block');
                block.style.display = 'none';
                requestList.style.padding = '20px';
                if (data.status) {
                    data.data.forEach(request => {
                        const requestItem = document.createElement('div');
                        requestList.classList.add('m-3');
                        // requestList.classList.add('bg-light');
                        requestItem.innerHTML = `<div class="mb-3 bg-light p-2">
                                <strong>Request Type:</strong> ${mapFarmerRequestType(request.requestType)}
                                <hr />
                                <strong>Request Status:</strong> ${mapFarmerRequestStatus(request.requestStatus)}
                                <hr />
                                <strong>Reason for Stop Selling:</strong> ${request.reasonForStopSelling}
                                <hr />
                                <strong>Rejection Reason:</strong> ${request.rejectionReason}
                                <hr />
                                <strong>Registration Number:</strong> ${request.registrationNumber}
                                <hr />
                                <strong>Produce Type:</strong> ${request.typeName}
                                <hr />
                                <button class="btn btn-outline-info mx-2" id="fbutton" data-requestId="${request.id}" data-farmerId="${request.farmerId}" data-action="approve" ><i class="fa fa-check-circle" aria-hidden="true"></i>Approve</button>
                                
                                <button class="btn btn-outline-danger mx-2" id="lbutton" data-requestId="${request.id}" data-farmerId="${request.farmerId}" data-action="reject" ><i class="fa fa-times-circle" aria-hidden="true"></i>Reject</button>
                                
                                </div>
                                `;

                        requestList.appendChild(requestItem);
                        console.log(request.farmerId + '\n' + request.id);
                    });
                } else {
                    requestList.textContent = 'No requests found.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    function mapFarmerRequestType(requestType) {
        switch (requestType) {
            case 1:
                return "Add New Produce Type";
            case 2:
                return "Remove From Existing Produce Type";

        }
    }
    function mapFarmerRequestStatus(requestStatus) {
        switch (requestStatus) {
            case 1:
                return "Initialized";
            case 2:
                return "Approved";
            case 3:
                return "Rejected";
            default:
                return "All";
        }
    }



    // Function to show success SweetAlert2 modal
    function showSweetAlert(message) {
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonColor: 'hsl(210, 17%, 93%)',
            confirmButtonText: 'CONTINUE',
            customClass: {
                popup: 'animated fadeIn',
                title: 'custom-title-class',
                content: 'custom-content-class',
                actions: 'custom-actions-class',
                icon: 'swal-icon',
                confirmButton: 'swal-button',
                confirmButtonText: 'swal-button-text',
            },
            background: 'rgb(1, 6, 28)',
        }).then(() => {
            window.location.href = './producetypes-requests.html';
            //  Swal.close();
            //  Swal.closeModal()

            // setTimeout(() => {
            //     Swal.close();
            // }, 100); // Adjust the delay as needed

            // onClose: () => {
            // // This code will be executed when the modal is closed
            // // You can add additional logic here if needed
            // };

            // onClose: () => {
            //     // This code will be executed when the modal is closed
            //     Swal.close();
            // }

            // willClose: () => {
            //     // This code will be executed when the modal is about to close
            //     // You can add additional logic here if needed
            //     Swal.close();
            // }

        });
    }



    
    // // Function to show success SweetAlert2 modal
    // function showSweetAlert(message) {
    //     Swal.fire({
    //         text: message,
    //         icon: 'success',
    //         confirmButtonColor: 'hsl(210, 17%, 93%)',
    //         confirmButtonText: 'CONTINUE',
    //         customClass: {
    //             popup: 'animated fadeIn',
    //             title: 'custom-title-class',
    //             content: 'custom-content-class',
    //             actions: 'custom-actions-class',
    //             icon: 'swal-icon',
    //             confirmButton: 'swal-button',
    //             confirmButtonText: 'swal-button-text',
    //         },
    //         background: 'rgb(1, 6, 28)',
    //         // onClose: () => {
    //         //     // This code will be executed when the modal is closed
    //         //     // You can add additional logic here if needed
    //         //     Swal.close();
    //         // }

    //         willClose: () => {
    //             // This code will be executed when the modal is about to close
    //             // You can add additional logic here if needed
    //             Swal.close();
    //         }
    

    //     });
    // }




    // Function to show error SweetAlert2 modal
    function showSweetAlertError(message) {
        Swal.fire({
            text: message,
            icon: 'error',
            confirmButtonColor: 'hsl(210, 17%, 93%)',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'animated fadeIn',
                title: 'custom-title-class',
                content: 'custom-content-class',
                actions: 'custom-actions-class',
                icon: 'swal-icon',
                confirmButton: 'swal-button',
                confirmButtonText: 'swal-button-text',
            },
            background: 'rgb(1, 6, 28)',
        })
            .then(() => {
                window.location.href = './producetypes-requests.html';
                // Swal.close()

            });
    }





  
});


