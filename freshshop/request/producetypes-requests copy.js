//  document.addEventListener('DOMContentLoaded', function () {


// const filter = document.getElementById('filterButton');

// filter.addEventListener('click', function () {
//     populateProduceTypeRequests();
// })


document.addEventListener('DOMContentLoaded', function () {
    const filter = document.getElementById('filterButton');

    filter.addEventListener('click', function () {
        populateProduceTypeRequests();
    });


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
                            <hr />
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

// document.addEventListener('click', function (event) {
//     const target = event.target;

//     if (target.matches('button[data-action="approve"]')) {
//         const requestId = target.getAttribute('data-requestId');
//         const farmerId = target.getAttribute('data-farmerId');
//         approveRequest(requestId, farmerId, 2);
//     }

//     if (target.matches('button[data-action="reject"]')) {
//         const requestId = target.getAttribute('data-requestId');
//         const farmerId = target.getAttribute('data-farmerId');
//         rejectRequest(requestId, farmerId, 3);
//     }
// });


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
           
        } else {
            console.log('Request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



// Open the modal when the "Reject" button is clicked
document.addEventListener('click', function (event) {
    const target = event.target;
  
    if (target.matches('button[data-action="reject"]')) {
      const requestId = target.getAttribute('data-requestId');
      const farmerId = target.getAttribute('data-farmerId');
      
      // Display the modal
      openModal(requestId, farmerId);
    }
  });
  
  // Close the modal when the close button is clicked
  document.getElementById('closeModal').addEventListener('click', function () {
    closeModal();
  });
  
  // Submit the rejection reason when the "Submit" button is clicked
  document.getElementById('submitReason').addEventListener('click', function () {
    const requestId = document.getElementById('modalRequestId').value;
    const farmerId = document.getElementById('modalFarmerId').value;
    const rejectionReason = document.getElementById('rejectionReasonInput').value;
    
    if (rejectionReason) {
      rejectRequest(requestId, farmerId, 3, rejectionReason);
      closeModal();
    } else {
      alert('Please enter a rejection reason.');
    }
  });
  
  // Function to open the modal
  function openModal(requestId, farmerId) {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    document.getElementById('modalRequestId').value = requestId;
    document.getElementById('modalFarmerId').value = farmerId;
  }
  
  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
  



// async function rejectRequest(requestId, farmerId, status) {
//     // Prompt the user for the rejection reason
//     const rejectionReason = prompt('Please enter the reason for rejection:');
//     if (rejectionReason === null) {
//         return; // User canceled the prompt
//     }

//     try {
//         const response = await fetch(`${baseUrl}api/Request/VerifyRequest`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 requestId: requestId,
//                 farmerId: farmerId,
//                 requestStatus: status,
//                 rejectionReason: rejectionReason
//             })
//         });

//         if (response.ok) {
//             // Update the button text and disable the button
//             const button = document.querySelector(`button[data-requestId="${requestId}"][data-action="reject"]`);
//             button.innerHTML = "Reject";
//             button.setAttribute('disabled', 'true');
//         } else {
//             console.log('Request failed with status:', response.status);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }




// async function rejectRequest(requestId, farmerId, status, rejectionReason) {
//     try {
//                const response = await fetch(`${baseUrl}api/Request/VerifyRequest`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 requestId: requestId,
//                 farmerId: farmerId,
//                 requestStatus: status,
//                 rejectionReason: rejectionReason
//             })
//         });

//         if (response.ok) {
//             // document.getElementById('lbutton').innerHTML = "reject"
//             document.getElementById('lbutton').setAttribute('disabled', 'true');
//         }
//         else {
//             console.log('Request failed with status:', response.status);
//         }
//     }

//     catch (error) {
//         console.error('Error:', error);
//     }
// }



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

})