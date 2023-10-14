// JavaScript for populating category data into the table

let count = 1;
let tableBody = document.getElementById("producetypeTableBody");

fetch("http://localhost:5195/api/ProduceType/GetAllProduceType")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        data.data.forEach(producetype => {
            const row = `
                <tr>
                    <td>${count}</td>
                    <td>${producetype.typeName}</td>
                 <td><button  class="btn btn-primary mx-2"  id="${producetype.id}" onclick="displayUpdateForm(this.id)"> <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td> 
                 <td><button  class="btn btn-danger mx-2"  id="${producetype.id}" onclick="DeleteDetails(this.id)">  <i class="fa fa-trash" aria-hidden="true"></i> Remove </button> </td> 
                </tr>`;
            tableBody.innerHTML += row;
            count++;
        });
    })
    .catch(error => {
        console.error("Error:", error);
        // Display an error message to the user
        tableBody.innerHTML = `
            <tr>
                <td colspan="2" class="text-danger">An error occurred while fetching data.</td>
            </tr>`;
    });



//////////////////////////

function displayUpdateForm(id) {
    // Select the elements for produce details
    const body = document.querySelector(".body");
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

    // Add event listener to the form
    const form = document.getElementById("updateProducetypeForm");

    // Remove any previous event listeners to avoid stacking
    form.removeEventListener("submit", handleFormSubmit);

    form.addEventListener("submit", function (event) {
        handleFormSubmit(event, id); // Pass the id as an argument to handleFormSubmit
    });
    // Rest of your code
}


function handleFormSubmit(event, id) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch(`http://localhost:5195/api/ProduceType/UpdateProduceType/${id}`, {
        method: "PUT",
        body: formData,
    })
        .then((response) => {
            // Handle the response here
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {

            displayUpdateForm(data.data);

            // Check if the request was successful
            if (data.status) {
                // Show SweetAlert2 modal
                showSweetAlert(data.message);
            } else {
                // Handle error and show SweetAlert2 modal
                showSweetAlertError(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            // Handle the error here
        });
}



// Function to show success SweetAlert2 modal
function showSweetAlert(message) {
    Swal.fire({
        text: message,
        icon: 'success',
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        confirmButtonText: 'CONTINUE',
        customClass: {
            popup: 'animated fadeIn', // Apply the fadeIn animation
            title: 'custom-title-class', // Create a custom class for title styling
            content: 'custom-content-class', // Create a custom class for content styling
            actions: 'custom-actions-class', // Create a custom class for action button styling
            // Apply custom classes to specific elements
            icon: 'swal-icon', // Custom class for the icon container
            confirmButton: 'swal-button', // Custom class for the confirm button
            confirmButtonText: 'swal-button-text', // Custom class for the confirm button text
        },
        background: 'rgb(1, 6, 28)',
    }).then(() => {
        // window.location.href = './getCustomerById.html';
        window.location.href = '../admin/dashboard.html';
       
    });
}

// Function to show error SweetAlert2 modal
function showSweetAlertError(message) {
    Swal.fire({
        text: message,
        icon: 'error',
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'animated fadeIn', // Apply the fadeIn animation
            title: 'custom-title-class', // Create a custom class for title styling
            content: 'custom-content-class', // Create a custom class for content styling
            actions: 'custom-actions-class', // Create a custom class for action button styling
            // Apply custom classes to specific elements
            icon: 'swal-icon', // Custom class for the icon container
            confirmButton: 'swal-button', // Custom class for the confirm button
            confirmButtonText: 'swal-button-text', // Custom class for the confirm button text
        },
        background: 'rgb(1, 6, 28)',
    })
        .then(() => {
            window.location.href = '../admin/dashboard.html';

        });
}


////////////////////////////////



// Function to delete a produce
function DeleteDetails(id) {
    Swal.fire({
        title: 'Confirm Deletion',
        text: 'Are you sure you want to delete this producetype?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        cancelButtonColor: 'hsl(0, 100%, 60%)',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // User confirmed, proceed with deletion
            // Make a DELETE request to the API
            fetch(`http://localhost:5195/api/ProduceType/DeleteProduceType/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    // Check if the request was successful
                    if (data.status) {
                        // Show success SweetAlert2 modal
                        showSweetAlert(data.message);
                    } else {
                        // Handle error and show error SweetAlert2 modal
                        showSweetAlertError(data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    // Handle network errors or other errors that may occur during the delete operation.
                });
        }
    });
}

function displayCustomerData(producetype) {

    const body = document.querySelector(".body");
    body.innerHTML = `
    <div class="container mt-5">
    <h1 class="text-center mb-4">Produce Type Details</h1>
    <div class="row">
       
        <div class="col-md-8">
            <table class="table table-striped">
                <tbody id="producetypeTableBody">
                    <!-- producetype data will be inserted here dynamically -->
                </tbody>
            </table>
        </div>
    </div>
</div>
    `

    const tableBody = document.getElementById("producetypeTableBody");

    // Clear any previous data in the table body
    tableBody.innerHTML = "";

    // Create rows for the other properties
    const properties = [
        { label: "Produce Type Name", value: producetype.typeName },
       
    ];

    properties.forEach(property => {
        const row = `
            <tr>
                <td>${property.label}</td>
                <td>${property.value}</td>
            </tr>`;
        tableBody.innerHTML += row;
    });

    // Add a Delete button row
    const deleteButtonRow = `
        <tr>
            <td colspan="2">
                <button class="btn btn-danger" onclick="deleteProducetype('${producetype.id}')">Delete</button>
            </td>
        </tr>`;
    tableBody.innerHTML += deleteButtonRow;
}



// Function to show success SweetAlert2 modal
function showSweetAlert(message) {
    Swal.fire({
        text: message,
        icon: 'success',
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'animated fadeIn', // Apply the fadeIn animation
            title: 'custom-title-class', // Create a custom class for title styling
            content: 'custom-content-class', // Create a custom class for content styling
            actions: 'custom-actions-class', // Create a custom class for action button styling
            // Apply custom classes to specific elements
            icon: 'swal-icon', // Custom class for the icon container
            confirmButton: 'swal-button', // Custom class for the confirm button
            confirmButtonText: 'swal-button-text', // Custom class for the confirm button text
        },
        background: 'rgb(1, 6, 28)',
    }).then(() => {
        window.location.href = '../admin/dashboard.html';

    });
}

// Function to show error SweetAlert2 modal
function showSweetAlertError(message) {
    Swal.fire({
        text: message,
        icon: 'error',
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'animated fadeIn', // Apply the fadeIn animation
            title: 'custom-title-class', // Create a custom class for title styling
            content: 'custom-content-class', // Create a custom class for content styling
            actions: 'custom-actions-class', // Create a custom class for action button styling
            // Apply custom classes to specific elements
            icon: 'swal-icon', // Custom class for the icon container
            confirmButton: 'swal-button', // Custom class for the confirm button
            confirmButtonText: 'swal-button-text', // Custom class for the confirm button text
        },
        background: 'rgb(1, 6, 28)',
    })
        .then(() => {
            window.location.href = '../admin/dashboard.html';

        });
}

