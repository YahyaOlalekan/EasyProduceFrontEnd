(function(){
let count = 1;
let tableBody = document.getElementById("categoryTableBody");

const tokenById = localStorage.getItem("token");
const apiUrlById = `${baseUrl}api/Category/GetAllCategories`;

getWithAuthorization(apiUrlById, tokenById, false)
    .then(data => {
        data.data.forEach(category => {
            const row = `
                <tr>
                    <td>${count}</td>
                    <td>${category.nameOfCategory}</td>
                    <td>${category.descriptionOfCategory}</td>
                 <td><button  class="btn btn-primary mx-2"  id="${category.id}" onclick="displayUpdateFormForCategory(this.id)"> <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td> 
                 <td><button  class="btn btn-danger mx-2"  id="${category.id}" onclick="DeleteDetailsForCategory(this.id)">  <i class="fa fa-trash" aria-hidden="true"></i> Remove </button> </td> 
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

function displayUpdateFormForCategory(id) {

    const body = document.querySelector(".body-category");
    body.innerHTML = `  <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 form-container">

                <h1>Category Update Form</h1>

                <form id="updateCategoryForm">

                <div class="form-group">
                <label for="nameOfCategory">Category Name:</label>
                <input type="text" class="form-control" id="nameOfCategory" name="NameOfCategory" placeholder="Category Name"
                    required>
            </div>

            <div class="form-group">
                <label for="descriptionOfCategory">Category Description:</label>
                <input type="text" class="form-control" id="descriptionOfCategory" name="DescriptionOfCategory" placeholder="Category Description"
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

    const form = document.getElementById("updateCategoryForm");

    form.removeEventListener("submit", handleFormSubmitForCategoryUpdate);

    form.addEventListener("submit", function (event) {
        handleFormSubmitForCategoryUpdate(event, id); 
    });
}


async function handleFormSubmitForCategoryUpdate(event, id) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
   
    try {

        const apiUrl = `${baseUrl}api/Category/UpdateCategory/${id}`;
        const token = localStorage.getItem("token");

        const response = await makeApiRequest(apiUrl, 'PUT', formData, token);

        if (response.status) {
            showSweetAlertForCategoryUpdate(response);
        } else {
            showSweetAlertErrorForCategoryUpdate(response);
        }
    } catch (error) {
        alert(error.message);
    }
}



function showSweetAlertForCategoryUpdate(response) {
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

function showSweetAlertErrorForCategoryUpdate(response) {
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



// Function to delete a category
function DeleteDetailsForCategory(id) {
    Swal.fire({

        title: 'Confirm deletion',
        text: 'Are you sure you want to delete this category?',
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

            const url = `${baseUrl}api/Category/DeleteCategory/${id}`
            const token = localStorage.getItem("token");
            deleteWithAuthorization(url, token)
                .then(data => {
                    if (data.status) {
                        showSweetAlertCategoryRemoval(data);
                    } else {
                        showSweetAlertErrorCategoryRemoval(data);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    });


}

function showSweetAlertCategoryRemoval(data) {
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
        window.location.href = '../admin/dashboard.html';

    });
}

function showSweetAlertErrorCategoryRemoval(data) {
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
            window.location.href = '../admin/dashboard.html';

        });
}


