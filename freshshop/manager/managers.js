// JavaScript for populating manager data into the table

let count = 1;
let tableBody = document.getElementById("managerTableBody");

fetch("http://localhost:5195/api/Manager/GetAllManagers")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        data.data.forEach(manager => {
            const row = `
                <tr>
                    <td>${count}</td>
                    <td>${manager.firstName}</td>
                    <td>${manager.lastName}</td>
                    <td>${manager.phoneNumber}</td>
                    <td>${manager.address}</td>
                    <td>${manager.registrationNumber}</td>
                    <td>${manager.email}</td>
                 <td><button  class="btn btn-success mx-2"  id="${manager.id}" onclick="ViewDetails(this.id)"> <i class="fa fa-info" aria-hidden="true"></i> View </button> </td> 
                 <td><button  class="btn btn-primary mx-2"  id="${manager.id}" onclick="displayUpdateForm(this.id)"> <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td> 
                 <td><button  class="btn btn-danger mx-2"  id="${manager.id}" onclick="DeleteDetails(this.id)">  <i class="fa fa-trash" aria-hidden="true"></i> Remove </button> </td> 
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
                <td colspan="7" class="text-danger">An error occurred while fetching data.</td>
            </tr>`;
    });



//////////////////////////

function ViewDetails(id) {
    // fetch(`${baseUrl}api/Customer/GetCustomerById/${id}`)
    fetch(`http://localhost:5195/api/Manager/GetManagerById/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Assuming the returned data is an object with manager attributes
            displayManagerData(data.data);
        })
        .catch(error => {
            console.error("Error:", error);
            // Display an error message to the user
            displayError();
        });

    function displayManagerData(manager) {

        // Select the elements for manager details
        const body = document.querySelector(".body");
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
                               
                                <a href="./managers.html" class="btn btn-secondary">Back</a>

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

        // Set the manager details
        firstName.textContent = `${manager.firstName}`;
        lastName.textContent = `${manager.lastName}`;
        phoneNumber.textContent = `${manager.phoneNumber}`;
        address.textContent = `${manager.address}`;
        registrationNumber.textContent = `${manager.registrationNumber}`;
        email.textContent = `${manager.email}`;

        // Set the profile picture source
        var baseUrl = "http://localhost:5195/"
        profilePicture.src = `${baseUrl}Upload/images/${manager.profilePicture}`;
        console.log(manager.profilePicture);
        profilePicture.alt = "Profile Picture";
    }

    function displayError() {
        const managerDetails = document.querySelector(".card-body");
        managerDetails.innerHTML = `<p class="text-danger">An error occurred while fetching manager data.</p>`;
    }

}

//////////////////////////////////////////////

function displayUpdateForm(id) {
    // Select the elements for manager details
    const body = document.querySelector(".body");
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

    // Add event listener to the form
    const form = document.getElementById("updateManagerForm");

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

    fetch(`http://localhost:5195/api/Manager/UpdateManager/${id}`, {
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
        window.location.href = './managers.html';
       
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
            window.location.href = './managers.html';

        });
}


////////////////////////////////



// Function to delete a customer
function DeleteDetails(id) {
    Swal.fire({
        title: 'Confirm Deletion',
        text: 'Are you sure you want to delete this manager?',
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
            fetch(`http://localhost:5195/api/Manager/DeleteManager/${id}`, {
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

function displayManagerData(manager) {

    const body = document.querySelector(".body");
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
                    <!-- manager data will be inserted here dynamically -->
                </tbody>
            </table>
        </div>
    </div>
</div>
    `

    // Display Profile Picture
    const profilePicture = document.getElementById("profilePicture");
    // profilePicture.src = manager.profilePicture;
    profilePicture.src = `${baseUrl}Upload/images/${manager.profilePicture}`;



    const tableBody = document.getElementById("managerTableBody");

    // Clear any previous data in the table body
    tableBody.innerHTML = "";

    // Create rows for the other properties
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
        tableBody.innerHTML += row;
    });

    // Add a Delete button row
    const deleteButtonRow = `
        <tr>
            <td colspan="2">
                <button class="btn btn-danger" onclick="deleteManager('${manager.id}')">Delete</button>
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
        // window.location.href = './getCustomerById.html';
        window.location.href = './managers.html';
       
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
            window.location.href = './managers.html';

        });
}


