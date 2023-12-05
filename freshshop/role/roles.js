
let count = 1;
let tableBody = document.getElementById("roleTableBody");

const tokenById = localStorage.getItem("token");
const apiUrlById = `${baseUrl}api/Role/GetAllRoles`;

getWithAuthorization(apiUrlById, tokenById, false)
    .then(data => {
        data.data.forEach(role => {
            const row = `
                <tr>
                    <td>${count}</td>
                    <td>${role.roleName}</td>
                    <td>${role.roleDescription}</td>
                 <td><button  class="btn btn-primary mx-2"  id="${role.id}" onclick="displayUpdateForm(this.id)"> <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td> 
                 <td><button  class="btn btn-danger mx-2"  id="${role.id}" onclick="DeleteDetails(this.id)">  <i class="fa fa-trash" aria-hidden="true"></i> Remove </button> </td> 
                </tr>`;
            tableBody.innerHTML += row;
            count++;
        });
    })
    .catch(error => {
        console.error("Error:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="2" class="text-danger">An error occurred while fetching data.</td>
            </tr>`;
    });



//////////////////////////

function displayUpdateForm(id) {

    const body = document.querySelector(".body");
    body.innerHTML = `  <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 form-container">

                <h1>Role Update Form</h1>

                <form id="updateRoleForm">

                <div class="form-group">
                <label for="roleName">Role Name:</label>
                <input type="text" class="form-control" id="roleName" name="RoleName" placeholder="Role Name"
                    required>
            </div>

            <div class="form-group">
                <label for="roleDescription">Role Description:</label>
                <input type="text" class="form-control" id="roleDescription" name="RoleDescription" placeholder="Role Description"
                    required>
            </div>

                    <div class="text-center">
                    <a href="../admin/dashboard.html" class="btn btn-secondary">Back</a>
                    <button type="submit" id="update-button" class="btn btn-primary">Update</button>
                </div>
                
                </form>
                <div id="updateResult" class="mt-3"></div>
            </div>
        </div>
    </div>
        `
        ;

    const form = document.getElementById("updateRoleForm");

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

        const apiUrl = `${baseUrl}api/Role/UpdateRole/${id}`;
        const token = localStorage.getItem("token");

        const response = await makeApiRequest(apiUrl, 'PUT', formData, token);

        if (response.status) {
            showSweetAlert(response.message);
        } else {
            showSweetAlertError(response.message);
        }
    } catch (error) {
        alert(error.message);
    }
}



function showSweetAlert(response) {
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

function showSweetAlertError(response) {
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



// Function to delete a role
function DeleteDetails(id) {

    Swal.fire({

        title: 'Confirm deletion',
        text: 'Are you sure you want to delete this role?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        cancelButtonColor: 'hsl(0, 100%, 60%)',
        confirmButtonText: 'Yes, delete it!',
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

            const url = `${baseUrl}api/Role/DeleteRole/${id}`
            const token = localStorage.getItem("token");
            deleteWithAuthorization(url, token)
                .then(data => {
                    if (data.status) {
                        showSweetAlert(data.message);
                    } else {
                        showSweetAlertError(data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    });

}

function displayCustomerData(role) {

    const body = document.querySelector(".body");
    body.innerHTML = `
    <div class="container mt-5">
    <h1 class="text-center mb-4">Role Details</h1>
    <div class="row">
       
        <div class="col-md-8">
            <table class="table table-striped">
                <tbody id="roleTableBody">
                    <!-- Role data will be inserted here dynamically -->
                </tbody>
            </table>
        </div>
    </div>
</div>
    `

    const tableBody = document.getElementById("roleTableBody");

    tableBody.innerHTML = "";

    const properties = [
        { label: "Role Name", value: role.roleName },
        { label: "Role Description", value: role.roleDescription },

    ];

    properties.forEach(property => {
        const row = `
            <tr>
                <td>${property.label}</td>
                <td>${property.value}</td>
            </tr>`;
        tableBody.innerHTML += row;
    });

    const deleteButtonRow = `
        <tr>
            <td colspan="2">
                <button class="btn btn-danger" onclick="deleteRole('${role.id}')">Delete</button>
            </td>
        </tr>`;
    tableBody.innerHTML += deleteButtonRow;
}



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
        window.location.href = '../admin/dashboard.html';

    });
}

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
            window.location.href = '../admin/dashboard.html';

        });
}


