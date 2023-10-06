// JavaScript for populating farmer data into the table

let count = 1;
let tableBody = document.getElementById("farmerTableBody");

fetch("http://localhost:5195/api/Farmer/GetAllFarmers")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        data.data.forEach(farmer => {
            const row = `
                <tr>
                    <td>${count}</td>
                    <td>${farmer.firstName}</td>
                    <td>${farmer.lastName}</td>
                    <td>${farmer.phoneNumber}</td>
                    <td>${farmer.address}</td>
                    <td>${farmer.registrationNumber}</td>
                    <td>${farmer.email}</td>
                 <td><button  class="btn btn-success mx-2"  id="${farmer.id}" onclick="ViewDetails(this.id)"> <i class="fa fa-info" aria-hidden="true"></i> View </button> </td> 
                 <td><button  class="btn btn-primary mx-2"  id="${farmer.id}" onclick="displayUpdateForm(this.id)"> <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td> 
                 <td><button  class="btn btn-danger mx-2"  id="${farmer.id}" onclick="DeleteDetails(this.id)">  <i class="fa fa-trash" aria-hidden="true"></i> Remove </button> </td> 
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
    // fetch("http://localhost:5195/api/Customer/GetCustomerById/(id)")
    fetch(`http://localhost:5195/api/Farmer/GetFarmerAlongWithRegisteredProduceType/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Assuming the returned data is an object with customer attributes
            displayFarmerData(data.data);
        })
        .catch(error => {
            console.error("Error:", error);
            // Display an error message to the user
            displayError();
        });

    function displayFarmerData(farmer) {
        // Select the elements for farmer details
        const body = document.querySelector(".body");
        body.innerHTML = `
         <div class="container-fluid p-0">
             <div class="row justify-content-center">
                 <div class="col-md-8">
                     <div class="card">
                         <h5 class="card-header bg-primary text-white">Farmer Details</h5>
                         <div class="card-body">
                             <div class="row">
                                 <div class="col-md-3 text-center">
                                     <img id="profilePicture" src="" alt="Profile Picture" style="max-width: 100%;" class="rounded-circle">
                                 </div>
                                 <!-- Add the new fields to the card-body section -->
                                 <div class="col-md-9">
                                     <ul class="list-group">
                                         <li class="list-group-item bg-light">
                                             <strong>First Name:</strong> <span id="firstName"></span>
                                         </li>
                                         <li class="list-group-item bg-light">
                                             <strong>Name Of Category, Produce Name, Type Name:</strong>
                                             <ul id="produceInfoList"></ul>
                                         </li>
                                         <li class="list-group-item bg-light">
                                             <strong>Farmer Registration Status:</strong> <span id="farmerRegStatus"></span>
                                         </li>
                                         <li class="list-group-item bg-light">
                                             <strong>Farm Name:</strong> <span id="farmName"></span>
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
                                 <a href="./farmers.html" class="btn btn-secondary">Back</a>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     `;

        // Select the elements for farmer details
        const firstName = document.getElementById("firstName");
        const farmerRegStatus = document.getElementById("farmerRegStatus");
        const farmName = document.getElementById("farmName");
        const lastName = document.getElementById("lastName");
        const phoneNumber = document.getElementById("phoneNumber");
        const address = document.getElementById("address");
        const registrationNumber = document.getElementById("registrationNumber");
        const email = document.getElementById("email");

        console.log("Farmer Object:", farmer);
        console.log("Profile Picture URL:", farmer.profilePicture);

        const profilePicture = document.getElementById("profilePicture");

        // Set the farmer details
        firstName.textContent = `${farmer.firstName}`;
        lastName.textContent = `${farmer.lastName}`;
        phoneNumber.textContent = `${farmer.phoneNumber}`;
        address.textContent = `${farmer.address}`;
        registrationNumber.textContent = `${farmer.registrationNumber}`;
        email.textContent = `${farmer.email}`;
        farmerRegStatus.textContent = `${farmer.farmerRegStatus}`;
        farmName.textContent = `${farmer.farmName}`;

        //  // Combine NameOfCategory, ProduceName, and TypeName into a single array
        //  const produceInfo = [...farmer.NameOfCategory, ...farmer.ProduceName, ...farmer.TypeName];


        // // Combine NameOfCategory, ProduceName, and TypeName into a single array
        // const produceInfo = [
        //     ...(Array.isArray(farmer.NameOfCategory) ? farmer.NameOfCategory : []),
        //     ...(Array.isArray(farmer.ProduceName) ? farmer.ProduceName : []),
        //     ...(Array.isArray(farmer.TypeName) ? farmer.TypeName : [])
        // ];


        // Combine the properties into a single array if they exist and are arrays
        const nameOfCategoryArray = Array.isArray(farmer.NameOfCategory) ? farmer.NameOfCategory : [];
        const produceNameArray = Array.isArray(farmer.ProduceName) ? farmer.ProduceName : [];
        const typeNameArray = Array.isArray(farmer.TypeName) ? farmer.TypeName : [];

        // Combine the arrays
        const produceInfo = [...nameOfCategoryArray, ...produceNameArray, ...typeNameArray];


        // Select the list element
        const produceInfoList = document.getElementById("produceInfoList");

        // Loop through the produceInfo array and create list items
        produceInfo.forEach(info => {
            const listItem = document.createElement("li");
            listItem.textContent = info;
            produceInfoList.appendChild(listItem);
        });

       // Check if a valid profilePicture URL exists
    if (farmer.profilePicture && farmer.profilePicture.trim() !== "") {
        // Trim the profilePicture value
        const profilePictureUrl = farmer.profilePicture.trim();

        // Set the profile picture source
        var baseUrl = "http://localhost:5195/";
        profilePicture.src = `${baseUrl}Upload/images/${profilePictureUrl}`;
        profilePicture.alt = "Profile Picture";
    } else {
        // Handle the case where there's no valid profilePicture URL
        profilePicture.src = "../producePictures/farmIcons.jpg"; // Provide a placeholder image URL
        profilePicture.alt = "Profile Picture";
    }



        // // Check if a valid profilePicture URL exists
        // if (farmer.profilePicture !== "undefined") {
        //     // Set the profile picture source
        //     var baseUrl = "http://localhost:5195/";
        //     profilePicture.src = `${baseUrl}Upload/images/${farmer.profilePicture}`;
        //     profilePicture.alt = "Profile Picture";
        // } else {
        //     // Handle the case where there's no valid profilePicture URL
        //     profilePicture.src = "./freshshop/producePictures/farmIcons.jpg"; // Provide a placeholder image URL
        //     profilePicture.alt = "Profile Picture";
        // }


    }



    function displayError() {
        const farmerDetails = document.querySelector(".card-body");
        farmerDetails.innerHTML = `<p class="text-danger">An error occurred while fetching farmer data.</p>`;
    }

}

//////////////////////////////////////////////

function displayUpdateForm(id) {
    // Select the elements for farmer details
    const body = document.querySelector(".body");
    body.innerHTML = `  <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 form-container">
                <h1>Farmer Update Form</h1>
                <form id="updateFarmerForm">
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
                    <a href="./customers.html" class="btn btn-secondary">Back</a>
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
    const form = document.getElementById("updateFarmerForm");

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
    // const id = /* Get the customer ID here */;

    fetch(`http://localhost:5195/api/Farmer/UpdateFarmer/${id}`, {
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
        window.location.href = './farmers.html';

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
            window.location.href = './farmers.html';

        });
}


////////////////////////////////



// Function to delete a farmer
function DeleteDetails(id) {
    Swal.fire({
        title: 'Confirm Deletion',
        text: 'Are you sure you want to delete this farmer?',
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
            fetch(`http://localhost:5195/api/Farmer/DeleteFarmer/${id}`, {
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

function displayFarmerData(farmer) {

    const body = document.querySelector(".body");
    body.innerHTML = `
    <div class="container mt-5">
    <h1 class="text-center mb-4">Farmer Details</h1>
    <div class="row">
        <div class="col-md-4">
            <!-- Display Profile Picture Here -->
            <img id="profilePicture" src="" alt="Profile Picture" class="img-fluid rounded">
        </div>
        <div class="col-md-8">
            <table class="table table-striped">
                <tbody id="farmerTableBody">
                    <!-- Farmer data will be inserted here dynamically -->
                </tbody>
            </table>
        </div>
    </div>
</div>
    `

    // Display Profile Picture
    const profilePicture = document.getElementById("profilePicture");
    // profilePicture.src = farmer.profilePicture;
    profilePicture.src = `${baseUrl}Upload/images/${farmer.profilePicture}`;



    const tableBody = document.getElementById("farmerTableBody");

    // Clear any previous data in the table body
    tableBody.innerHTML = "";

    // Create rows for the other properties
    const properties = [
        { label: "First Name", value: farmer.firstName },
        { label: "Last Name", value: farmer.lastName },
        { label: "Phone Number", value: farmer.phoneNumber },
        { label: "Address", value: farmer.address },
        { label: "Registration Number", value: farmer.registrationNumber },
        { label: "Email", value: farmer.email },
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
                <button class="btn btn-danger" onclick="deleteFarmer('${farmer.id}')">Delete</button>
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
        window.location.href = './farmers.html';
        // Handle the "Continue" button click here if needed
        // For example, you can redirect to another page or perform other actions
        // window.location.href = 'your_target_url';
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
            window.location.href = './farmers.html';

        });
}


