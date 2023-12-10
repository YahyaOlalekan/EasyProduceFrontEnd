
 (function(){

let count = 1;
let tableBody = document.getElementById("roleTableBody");

const tokenByIdforRole = localStorage.getItem("token");
const apiUrlByIdForRole = `${baseUrl}api/Role/GetAllRoles`;

getWithAuthorization(apiUrlByIdForRole, tokenByIdforRole, false)
    .then(data => {
        data.data.forEach(role => {
            console.log(role)
            const row = `
                <tr>
                    <td>${count}</td>
                    <td>${role.roleName}</td>
                    <td>${role.roleDescription}</td>
                 <td><button  class="btn btn-primary mx-2" onclick="displayUpdateFormForRole('${role.id}')"> <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td> 
                 <td><button  class="btn btn-danger mx-2"  onclick="DeleteDetailsForRole('${role.id}')">  <i class="fa fa-trash" aria-hidden="true"></i> Remove </button> </td> 
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

})();


//////////////////////////

 function displayUpdateFormForRole(roleId) {
    console.log("Edit button clicked. ID:", roleId);

    const body = document.querySelector(".body-role");
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

    form.removeEventListener("submit", handleFormSubmitForRole);

    form.addEventListener("submit", function (event) {
        handleFormSubmitForRole(event, roleId);
    });
}


async function handleFormSubmitForRole(event, roleId) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    try {

        const apiUrl = `${baseUrl}api/Role/UpdateRole/${roleId}`;
        const token = localStorage.getItem("token");

        const response = await makeApiRequest(apiUrl, 'PUT', formData, token);

        if (response.status) {
            showSweetAlertForRoleUpdate(response);
        } else {
            showSweetAlertErrorForRoleUpdate(response);
        }
    } catch (error) {
        alert(error.message);
    }
}



function showSweetAlertForRoleUpdate(response) {
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

function showSweetAlertErrorForRoleUpdate(response) {
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
function DeleteDetailsForRole(id) {

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
                        showSweetAlertForRoleDelete(data.message);
                    } else {
                        showSweetAlertErrorForRoleDelete(data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    });

}



function showSweetAlertForRoleDelete(message) {
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

function showSweetAlertErrorForRoleDelete(message) {
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

