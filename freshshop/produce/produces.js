(function(){
let count = 1;
let tableBody = document.getElementById("produceTableBody");

const tokenById = localStorage.getItem("token");
const apiUrlById = `${baseUrl}api/Produce/GetAllProduce`;

getWithAuthorization(apiUrlById, tokenById, false)
    .then(data => {
        data.data.forEach(produce => {
            const row = `
                <tr>
                    <td>${count}</td>
                    <td>${produce.produceName}</td>
                    <td>${produce.descriptionOfProduce}</td>
                 <td><button  class="btn btn-primary mx-2"  id="${produce.id}" onclick="displayUpdateFormForProduce(this.id)"> <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td> 
                 <td><button  class="btn btn-danger mx-2"  id="${produce.id}" onclick="DeleteDetailsForProduce(this.id)">  <i class="fa fa-trash" aria-hidden="true"></i> Remove </button> </td> 
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

function displayUpdateFormForProduce(id) {

    const body = document.querySelector(".body-produce");
    body.innerHTML = `  <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 form-container">

                <h1>Produce Update Form</h1>

                <form id="updateProduceForm">

                <div class="form-group">
                <label for="produceName">Produce Name:</label>
                <input type="text" class="form-control" id="produceName" name="ProduceName" placeholder="Produce Name"
                    required>
            </div>

            <div class="form-group">
                <label for="descriptionOfProduce">Produce Description:</label>
                <input type="text" class="form-control" id="descriptionOfProduce" name="DescriptionOfProduce" placeholder="Produce Description"
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

    const form = document.getElementById("updateProduceForm");

    form.removeEventListener("submit", handleFormSubmitForProduce);

    form.addEventListener("submit", function (event) {
        handleFormSubmitForProduce(event, id);
    });
}


async function handleFormSubmitForProduce(event, id) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {

        const apiUrl = `${baseUrl}api/Produce/UpdateProduce/${id}`;
        const token = localStorage.getItem("token");

        const response = await makeApiRequest(apiUrl, 'PUT', formData, token);

        if (response.status) {
            showSweetAlertForProduce(response);
        } else {
            showSweetAlertErrorForProduce(response);
        }
    } catch (error) {
        alert(error.message);
    }
}



function showSweetAlertForProduce(response) {
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

function showSweetAlertErrorForProduce(response) {
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
function DeleteDetailsForProduce(id) {
    Swal.fire({

        title: 'Confirm deletion',
        text: 'Are you sure you want to delete this produce?',
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

            const url = `${baseUrl}api/Produce/DeleteProduce/${id}`
            const token = localStorage.getItem("token");
            deleteWithAuthorization(url, token)
                .then(data => {
                    if (data.status) {
                        showSweetAlertForProduceRemoval(data);
                    } else {
                        showSweetAlertErrorForProduceRemoval(data);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    });

}



function showSweetAlertForProduceRemoval(data) {
    Swal.fire({
        text: data.message,
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

function showSweetAlertErrorForProduceRemoval(data) {
    Swal.fire({
        text: data.message,
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
            window.location.replace('../admin/dashboard.html');

        });
}


