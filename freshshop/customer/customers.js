(function () {
    let count = 1;
    let tableBody = document.getElementById("customerTableBody");

    // fetch(`${baseUrl}api/Customer/GetAllCustomers`)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         return response.json();
    //     })

    const tokenById = getItemFromLocalStorage("token");
    const apiUrlById = `${baseUrl}api/Customer/GetAllCustomers`;

    getWithAuthorization(apiUrlById, tokenById, false)
        .then(data => {
            data.data.forEach(customer => {
                const row = `
                <tr>
                    <td>${count}</td>
                    <td>${customer.firstName}</td>
                    <td>${customer.lastName}</td>
                    <td>${customer.phoneNumber}</td>
                    <td>${customer.address}</td>
                    <td>${customer.registrationNumber}</td>
                    <td>${customer.email}</td>
                 <td><button  class="btn btn-success mx-2"  id="${customer.id}" onclick="ViewDetailsForCustomer(this.id)"> <i class="fa fa-info" aria-hidden="true"></i> View </button> </td> 
                 <td><button  class="btn btn-danger mx-2"  id="${customer.id}" onclick="DeleteDetailsForCustomer(this.id)">  <i class="fa fa-trash" aria-hidden="true"></i> Deactivate </button> </td> 
                </tr>`;
                tableBody.innerHTML += row;
                count++;
            });
        })
        .catch(error => {
            console.error("Error:", error);
            tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-danger">An error occurred while fetching data.</td>
            </tr>`;
        });

})();
// <td><button  class="btn btn-primary mx-2"  id="${customer.id}" onclick="displayUpdateForm(this.id)"> <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td> 


//////////////////////////

function ViewDetailsForCustomer(id) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (!userId) {
        console.error("No userId found in local storage.");
        return;
    }

    getWithAuthorizationWithNonUserId(`${baseUrl}api/Customer/GetCustomerById/${id}`, token, userId)

        // fetch(`${baseUrl}api/Customer/GetCustomerById/${id}`)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error("Network response was not ok");
        //         }
        //         return response.json();
        //     })
        .then(data => {
            displayCustomerData(data.data);
        })
        .catch(error => {
            console.error("Error:", error);
            displayError();
        });

    function displayCustomerData(customer) {

        const body = document.querySelector(".body-customer");
        body.innerHTML = `  <div class="container-fluid p-0">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <h5 class="card-header bg-primary text-white">Customer Details</h5>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3 text-center">
                                    <img id="profilePicture" src="" alt="Profile Picture" style="max-width: 100%;" class="rounded-circle">
                                </div>
                                <div class="col-md-9">
                                    <ul class="list-group">
                                        <li class="list-group-item bg-light">
                                            <strong>First Name:</strong> <span id="firstName"></span>
                                        </li>
                                        <li class="list-group-item bg-light">
                                            <strong>Last Name:</strong> <span id="lastName"></span>
                                        </li>
                                        <li class="list-group-item bg-light">
                                            <strong>Phone Number:</strong> <span id="phoneNumber"></span>
                                        </li>
                                        <li class="list-group-item bg-light">
                                            <strong>Address:</strong> <span id="address"></span>
                                        </li>
                                        <li class="list-group-item bg-light">
                                            <strong>Registration Number:</strong> <span id="registrationNumber"></span>
                                        </li>
                                        <li class="list-group-item bg-light">
                                            <strong>Email:</strong> <span id="email"></span>
                                        </li>
                                    </ul>
                                </div>
                               
                                <a href="../admin/dashboard.html" class="btn btn-secondary">Back</a>

                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const phoneNumber = document.getElementById("phoneNumber");
        const address = document.getElementById("address");
        const registrationNumber = document.getElementById("registrationNumber");
        const email = document.getElementById("email");
        const profilePicture = document.getElementById("profilePicture");

        firstName.textContent = `${customer.firstName}`;
        lastName.textContent = `${customer.lastName}`;
        phoneNumber.textContent = `${customer.phoneNumber}`;
        address.textContent = `${customer.address}`;
        registrationNumber.textContent = `${customer.registrationNumber}`;
        email.textContent = `${customer.email}`;

        profilePicture.src = `${baseUrl}Upload/images/${customer.profilePicture}`;
        console.log(customer.profilePicture);
        profilePicture.alt = "Profile Picture";
    }

    function displayError() {
        const customerDetails = document.querySelector(".card-body");
        customerDetails.innerHTML = `<p class="text-danger">An error occurred while fetching customer data.</p>`;
    }

}


////////////////////////////////
// Function to Deactivate a customer
function DeleteDetailsForCustomer(id) {
    Swal.fire({

        title: 'Confirm Deactivation',
        text: 'Are you sure you want to deactivate this customer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        cancelButtonColor: 'hsl(0, 100%, 60%)',
        confirmButtonText: 'Yes, deactivate him!',
        cancelButtonText: 'Cancel',
        customClass: {
            title: 'delete-swal-title',
            content: 'delete-swal-content',
            actions: 'delete-swal-actions',
            confirmButton: 'delete-swal-confirm-button',
            cancelButton: 'delete-swal-cancel-button',
        },
        iconHtml: '<i class="fas fa-exclamation-circle" style="color:#FF8C00"></i>',


    }).then((result) => {
        if (result.isConfirmed) {

            const url = `${baseUrl}api/Customer/DeleteCustomer/${id}`
            const token = localStorage.getItem("token");
            deleteWithAuthorization(url, token)
                .then(data => {
                    if (data.status) {
                        showSweetAlertForCustomerDeactivation(data.message);
                    } else {
                        showSweetAlertErrorForCustomerDeactivation(data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    });


}



function showSweetAlertForCustomerDeactivation(message) {
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
        window.location.href = '../admin/dashboard.html';

    });
}

function showSweetAlertErrorForCustomerDeactivation(message) {
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
            window.location.href = '../admin/dashboard.html';

        });
}


