(function(){
let count = 1;
let tableBody = document.getElementById("producetypeTableBody");

const tokenById = localStorage.getItem("token");
const apiUrlById = `${baseUrl}api/ProduceType/GetAllProduceType`;

getWithAuthorization(apiUrlById, tokenById, false)
    .then(data => {
        data.data.forEach(producetype => {
            const row = `
                <tr>
                    <td>${count}</td>
                    <td>${producetype.typeName}</td>
                 <td><button  class="btn btn-primary mx-2"  id="${producetype.id}" onclick="displayUpdateFormForProducetype(this.id)"> <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td> 
                 <td><button  class="btn btn-danger mx-2"  id="${producetype.id}" onclick="DeleteDetailsForProducetype(this.id)">  <i class="fa fa-trash" aria-hidden="true"></i> Remove </button> </td> 
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

function displayUpdateFormForProducetype(id) {

    const body = document.querySelector(".body-producetype");
    body.innerHTML = `  <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 form-container">

                <h1>Produce Type Update Form</h1>

                <form id="updateProducetypeForm">

                <div class="form-group">
                <label for="produceName">Produce Type Name:</label>
                <input type="text" class="form-control" id="producetypeName" name="TypeName" placeholder="Produce Type Name"
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

    const form = document.getElementById("updateProducetypeForm");

    form.removeEventListener("submit", handleFormSubmitForProducetypeAdd);

    form.addEventListener("submit", function (event) {
        handleFormSubmitForProducetypeAdd(event, id);
    });
}


async function handleFormSubmitForProducetypeAdd(event, id) {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    try {

        const apiUrl = `${baseUrl}api/ProduceType/UpdateProduceType/${id}`;
        const token = localStorage.getItem("token");

        const response = await makeApiRequest(apiUrl, 'PUT', formData, token);

        if (response.status) {
            showSweetAlertForProducetypeAdd(response);
        } else {
            showSweetAlertErrorForProducetypeAdd(response);
        }
    } catch (error) {
        alert(error.message);
    }

}


function showSweetAlertForProducetypeAdd(response) {
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

function showSweetAlertErrorForProducetypeAdd(response) {
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



// Function to delete a produce
function DeleteDetailsForProducetype(id) {
    Swal.fire({

        title: 'Confirm deletion',
        text: 'Are you sure you want to delete this producetype?',
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

            const url = `${baseUrl}api/ProduceType/DeleteProduceType/${id}`
            const token = localStorage.getItem("token");
            deleteWithAuthorization(url, token)
                .then(data => {
                    if (data.status) {
                        showSweetAlertForProducetypeRemoval(data.message);
                    } else {
                        showSweetAlertErrorForProducetypeRemoval(data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    });
}


function showSweetAlertForProducetypeRemoval(message) {
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

function showSweetAlertErrorForProducetypeRemoval(message) {
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


