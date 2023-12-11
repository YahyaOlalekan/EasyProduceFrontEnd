
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

        if (target.matches('#submitReason')) {
            const requestId = document.getElementById('modalRequestId').value;
            const farmerId = document.getElementById('modalFarmerId').value;
            const rejectionReason = document.getElementById('rejectionReasonInput').value;

            if (rejectionReason) {
                rejectRequest(requestId, farmerId, 3, rejectionReason);
                closeModal();
            } else {
                alert('Please enter a rejection reason.');
            }
        }

        if (target.matches('#closeModal')) {
            closeModal();
        }
    });

    function openModal(requestId, farmerId) {
        createModal(requestId, farmerId);
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('myModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function createModal(requestId, farmerId) {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'myModal';
        modalContainer.classList.add('modal');
        modalContainer.innerHTML = `
            <div class="modal-content">
                <span class="close" id="closeModal">&times;</span>
                <h2>Enter Rejection Reason</h2>
                <input type="hidden" id="modalRequestId">
                <input type="hidden" id="modalFarmerId">
                <textarea id="rejectionReasonInput" rows="4" cols="50" placeholder="Enter the reason for rejection"></textarea>
                <button id="submitReason">Submit</button>
            </div>
        `;
        document.body.appendChild(modalContainer);

        document.getElementById('modalRequestId').value = requestId;
        document.getElementById('modalFarmerId').value = farmerId;
        attachModalEventListeners(requestId, farmerId);
    }

    function attachModalEventListeners() {
        const closeModalButton = document.getElementById('closeModal');
        const submitReasonButton = document.getElementById('submitReason');

        if (closeModalButton && submitReasonButton) {
            closeModalButton.addEventListener('click', closeModal);
            submitReasonButton.addEventListener('click', submitReason);
        } else {
            console.error('Close or Submit button not found in the modal.');
        }
    }

    async function submitReason() {
        const requestId = document.getElementById('modalRequestId').value;
        const farmerId = document.getElementById('modalFarmerId').value;
        const rejectionReason = document.getElementById('rejectionReasonInput').value;

        if (rejectionReason) {
            rejectRequest(requestId, farmerId, 3, rejectionReason);
            closeModal();
        } else {
            alert('Please enter a rejection reason.');
        }
    }


    async function approveRequest(requestId, farmerId, status) {

        // const verificationData = {
        //     RequestId: requestId,
        //     FarmerId: farmerId,
        //     RequestStatus: status
        // };
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

            // const apiUrl = `${baseUrl}api/Request/VerifyRequest`;
            // const token = localStorage.getItem("token");

            // const response = await makeApiRequest(apiUrl, 'POST', verificationData, token);

            if (response.ok) {

                showSweetAlertForApproveRequest('Request Approved Successfully');

            } else {
                showSweetAlertErrorForApproveRequest('Failed to Approve Request');
                console.log('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    async function rejectRequest(requestId, farmerId, status, rejectionReason) {
        // const verificationData = {
        //     RequestId: requestId,
        //     FarmerId: farmerId,
        //     RequestStatus: status,
        //     RejectionReason: rejectionReason
        // };

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

            // const apiUrl = `${baseUrl}api/Request/VerifyRequest`;
            // const token = localStorage.getItem("token");

            // const response = await makeApiRequest(apiUrl, 'POST', verificationData, token);

            console.log('Response:', response);
            if (response.ok) {
                showSweetAlertForRejectRequest('Request Rejected Successfully');
            } else {
                showSweetAlertErrorForRejectRequest('Failed to Reject Request');
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

        // const tokenById = localStorage.getItem("token");
        // const apiUrlById = `${baseUrl}api/Request/GetAllProduceTypeRequests`;

        // getWithAuthorization(apiUrlById, tokenById, false)
            .then(data => {
                console.log(data);
                const requestList = document.getElementById('requestLists');
                const title = document.getElementById('titles');
                title.textContent = 'Produce-Type List';
                const block = document.getElementById('block');
                block.style.display = 'none';
                requestList.style.padding = '20px';

                requestList.innerHTML = '';

                if (data.status) {
                    data.data.forEach(request => {
                        const requestItem = document.createElement('div');
                        requestList.classList.add('m-3');
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
                            ${getActionButtons(request.requestStatus, request.id, request.farmerId)}
                            </div>
                            
                            `;

                        requestList.appendChild(requestItem);
                        console.log(request.farmerId + '\n' + request.id);

                        const backButton = document.createElement('a');
                        backButton.href = '../admin/dashboard.html';
                        backButton.classList.add('btn', 'btn-secondary');
                        backButton.textContent = 'Back';
            
                        requestList.appendChild(backButton);
            
                    });
                } else {
                    requestList.textContent = 'No requests found.';
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    function getActionButtons(requestStatus, requestId, farmerId) {
        if (requestStatus === 1) {
            return `<button class="btn btn-outline-info mx-2" data-requestId="${requestId}" data-farmerId="${farmerId}" data-action="approve" ><i class="fa fa-check-circle" aria-hidden="true"></i>Approve</button>
                <button class="btn btn-outline-danger mx-2" data-requestId="${requestId}" data-farmerId="${farmerId}" data-action="reject" ><i class="fa fa-times-circle" aria-hidden="true"></i>Reject</button>`;
        } else if (requestStatus === 2) {
            return `<button class="btn btn-outline-danger mx-2" data-requestId="${requestId}" data-farmerId="${farmerId}" data-action="reject" ><i class="fa fa-times-circle" aria-hidden="true"></i>Reject</button>`;
        } else if (requestStatus === 3) {
            return `<button class="btn btn-outline-info mx-2" data-requestId="${requestId}" data-farmerId="${farmerId}" data-action="approve" ><i class="fa fa-check-circle" aria-hidden="true"></i>Approve</button>`;
            
        }

        return '';
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

    function showSweetAlertForApproveRequest(message) {
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
            // window.location.href = './producetypes-requests.html';
            window.location.href = '../admin/dashboard.html';

        });
    }


    function showSweetAlertErrorForApproveRequest(message) {
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
                // window.location.href = './producetypes-requests.html';
                window.location.href = '../admin/dashboard.html';

            });
    }

    function showSweetAlertForRejectRequest(message) {
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
            // window.location.href = './producetypes-requests.html';
            window.location.href = '../admin/dashboard.html';

        });
    }


    function showSweetAlertErrorForRejectRequest(message) {
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
                // window.location.href = './producetypes-requests.html';
                window.location.href = '../admin/dashboard.html';

            });
    }






});


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