(function() {
let countNumber = 1;
let managerTableBody = document.getElementById("managerTableBody");

const tokenById = getItemFromLocalStorage("token");
// const tokenById = localStorage.getItem("token");
const apiUrlById = `${baseUrl}api/Manager/GetAllManagers`;

getWithAuthorization(apiUrlById, tokenById, false)
    .then(data => {
        data.data.forEach(manager => {
            const row = `
                <tr>
                    <td>${countNumber}</td>
                    <td>${manager.firstName}</td>
                    <td>${manager.lastName}</td>
                    <td>${manager.phoneNumber}</td>
                    <td>${manager.address}</td>
                    <td>${manager.registrationNumber}</td>
                    <td>${manager.email}</td>
                 <td><button  class="btn btn-success mx-2"  id="${manager.id}" onclick="ViewDetails(this.id)"> <i class="fa fa-info" aria-hidden="true"></i> View </button> </td> 
                 <td><button  class="btn btn-primary mx-2"  id="${manager.id}" onclick="displayUpdateForm(this.id)"> <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td> 
                 <td><button  class="btn btn-danger mx-2"  id="${manager.id}" onclick="DeleteDetails(this.id)">  <i class="fa fa-trash" aria-hidden="true"></i> Deactivate </button> </td> 
                </tr>`;
            managerTableBody.innerHTML += row;
            countNumber++;
        });
    })
    .catch(error => {
        console.error("Error:", error);

        managerTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-danger">An error occurred while fetching data.</td>
            </tr>`;
    });

}) ();

//////////////////////////

function ViewDetails(id) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (!userId) {
        console.error("No userId found in local storage.");
        return;
    }

    getWithAuthorizationWithNonUserId(`${baseUrl}api/Manager/GetManagerById/${id}`, token, userId)
        .then(data => {
            displayManagerData(data.data);
        })
        .catch(error => {
            console.error("Error:", error);
            displayError();
        });

    function displayManagerData(manager) {

        const body = document.querySelector(".body-manager");
        body.innerHTML = `  <div class="container-fluid p-0">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <h5 class="card-header bg-primary text-white">Manager Details</h5>
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

        firstName.textContent = `${manager.firstName}`;
        lastName.textContent = `${manager.lastName}`;
        phoneNumber.textContent = `${manager.phoneNumber}`;
        address.textContent = `${manager.address}`;
        registrationNumber.textContent = `${manager.registrationNumber}`;
        email.textContent = `${manager.email}`;

        profilePicture.src = `${baseUrl}Upload/images/${manager.profilePicture}`;
        console.log(manager.profilePicture);
        profilePicture.alt = "Profile Picture";
    }

    // function displayError() {
    //     const managerDetails = document.querySelector(".card-body");
    //     managerDetails.innerHTML = `<p class="text-danger">An error occurred while fetching manager data.</p>`;
    // }

}

//////////////////////////////////////////////

function displayUpdateForm(id) {

    const body = document.querySelector(".body-manager");
    body.innerHTML = `  <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 form-container">
                <h1>Manager Update Form</h1>
                <form id="updateManagerForm">
                    <div class="form-group">
                        <label for="address">Address:</label>
                        <input type="text" class="form-control" id="address" name="Address" placeholder="Address" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" id="password" name="Password" placeholder="Password" required>
                    </div>
                    <div class="form-group">
                        <label for="phoneNumber">Phone Number:</label>
                        <input type="tel" class="form-control" id="phoneNumber" name="PhoneNumber" placeholder="Phone Number" required>
                    </div>
                    <div class="form-group">
                        <label for="profilePicture">Profile Picture:</label>
                        <input type="file" class="form-control-file" id="profilePicture" name="ProfilePicture">
                    </div>
                    <div class="text-center">
                    <a href="./managers.html" class="btn btn-secondary">Back</a>
                    <button type="submit" id="update-button" class="btn btn-primary">Update</button>
                </div>
                
                </form>
                <div id="updateResult" class="mt-3"></div>
            </div>
        </div>
    </div>
        `
        ;

    const form = document.getElementById("updateManagerForm");

    form.removeEventListener("submit", handleFormSubmit);

    form.addEventListener("submit", function (event) {
        handleFormSubmit(event, id);
    });
}


async function handleFormSubmit(event, id) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {

        const apiUrl = `${baseUrl}api/Manager/UpdateManager/${id}`;
        const token = localStorage.getItem("token");

        const response = await makeApiRequest(apiUrl, 'PUT', formData, token);

        if (response.status) {
            showSweetAlertForManagerUpdate(response);
        } else {
            showSweetAlertErrorForManagerUpdate(response);
        }
    } catch (error) {
        alert(error.message);
    }

}


function showSweetAlertForManagerUpdate(response) {
    Swal.fire({
        text: response.message,
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
        window.location.replace('../admin/dashboard.html');
    });
}

function showSweetAlertErrorForManagerUpdate(response) {
    Swal.fire({
        text: response.message,
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


////////////////////////////////



// Function to Deactivate a manager
function DeleteDetails(id) {
    Swal.fire({

        title: 'Confirm Deactivation',
        text: 'Are you sure you want to deactivate this manager?',
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

            const url = `${baseUrl}api/Manager/DeleteManager/${id}`
            const token = localStorage.getItem("token");
            deleteWithAuthorization(url, token)
                .then(data => {
                    if (data.status) {
                        showSweetAlertForManagerDeactivation(data.message);
                    } else {
                        showSweetAlertErrorForManagerDeactivation(data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    });


}

function displayManagerData(manager) {

    const body = document.querySelector(".body-manager");
    body.innerHTML = `
    <div class="container mt-5">
    <h1 class="text-center mb-4">manager Details</h1>
    <div class="row">
        <div class="col-md-4">
            <!-- Display Profile Picture Here -->
            <img id="profilePicture" src="" alt="Profile Picture" class="img-fluid rounded">
        </div>
        <div class="col-md-8">
            <table class="table table-striped">
                <tbody id="managerTableBody">
                    
                </tbody>
            </table>
        </div>
    </div>
</div>
    `

    const profilePicture = document.getElementById("profilePicture");

    profilePicture.src = `${baseUrl}Upload/images/${manager.profilePicture}`;

    const tableBodyy = document.getElementById("managerTableBody");

    tableBodyy.innerHTML = "";

    const properties = [
        { label: "First Name", value: manager.firstName },
        { label: "Last Name", value: manager.lastName },
        { label: "Phone Number", value: manager.phoneNumber },
        { label: "Address", value: manager.address },
        { label: "Registration Number", value: manager.registrationNumber },
        { label: "Email", value: manager.email },
    ];

    properties.forEach(property => {
        const row = `
            <tr>
                <td>${property.label}</td>
                <td>${property.value}</td>
            </tr>`;
        tableBodyy.innerHTML += row;
    });

    const deleteButtonRow = `
        <tr>
            <td colspan="2">
                <button class="btn btn-danger" onclick="deleteManager('${manager.id}')">Delete</button>
            </td>
        </tr>`;
    tableBodyy.innerHTML += deleteButtonRow;
}


function showSweetAlertForManagerDeactivation(message) {
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
        window.location.href = './dashboard.html';

    });
}

function showSweetAlertErrorForManagerDeactivation(message) {
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
            window.location.href = './dashboard.html';

        });
}



