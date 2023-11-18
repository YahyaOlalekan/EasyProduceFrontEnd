// JavaScript for populating farmer data into the table

let count = 1;
let tableBody = document.getElementById("farmerTableBody");

fetch(`${baseUrl}api/Farmer/GetAllFarmers`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        data.data.forEach(farmer => {
            console.log(farmer);
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
              
     <td>
    <button class="btn btn-outline-info mx-2" id="${farmer.id}" onclick="VerifyFarmer(this.id, 3)"><i class="fa fa-check-circle" aria-hidden="true"></i> Approve </button>
    <button class="btn btn-outline-danger mx-2" id="${farmer.id}" onclick="VerifyFarmer(this.id, 2)"> <i class="fa fa-times-circle" aria-hidden="true"></i> Decline </button>
     </td>
    
     
     <td> <button class="btn btn-success mx-2" onclick="ApproveProducetypes('${farmer.id}')"><i class="fas fa-check"></i> Approve</button></td>

              
     <td><button class="btn btn-success mx-2" id="${farmer.id}" onclick="fetchAndDisplayApprovedProduceTypes(this.id)"><i class="fa fa-info" aria-hidden="true"></i> View</button></td>
     <td><button  class="btn btn-success mx-2"  id="${farmer.id}" onclick="AccountDetails(this.id)"> <i class="fa fa-info" aria-hidden="true"></i> View </button> </td> 
                 <td><button  class="btn btn-danger mx-2"  id="${farmer.id}" onclick="DeleteDetails(this.id)">  <i class="fa fa-trash" aria-hidden="true"></i> Deactivate </button> </td> 
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

//  <td><button  class="btn btn-primary mx-2"  id="${farmer.id}" onclick="displayUpdateForm(this.id)"> <i class="fa-solid fa-pen-to-square"></i> Edit </button> </td> 





/////////////////////////////////////////////////////////////////////////////////////////////////////

function ViewDetails(id) {
    fetch(`${baseUrl}api/Farmer/GetFarmerAlongWithRegisteredProduceType/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Assuming the returned data is an object with customer attributes
            displayFarmerData(data.data);
            // showSweetAlert(data.message);
        })
        .catch(error => {
            console.error("Error:", error);
            // Display an error message to the user
            displayError();
        });


    function displayFarmerData(data) {
        // Select the elements for farmer details
        const body = document.querySelector(".body");
        // <strong>Category Name, Produce Name, Type Name:</strong>

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
                                    <strong>Farmer's Registered Produce </strong> <br/>
                                    <ul id="produceInfoList"></ul>
                                </li>
                                <li class="list-group-item bg-light">
                                    <strong> Current Farmer Registration Status:</strong> <span id="farmerRegStatus"></span>
                                </li>
                                <li class="list-group-item bg-light">
                                    <strong>Farm Name:</strong> <span id="farmName"></span>
                                </li>
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
                        <a href="./farmers.html" class="btn btn-secondary">Back</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

     `;

        const farmerData = data.farmerDto;

        // Select the elements for farmer details
        const firstName = document.getElementById("firstName");
        const farmerRegStatus = document.getElementById("farmerRegStatus");
        const farmName = document.getElementById("farmName");
        const lastName = document.getElementById("lastName");
        const phoneNumber = document.getElementById("phoneNumber");
        const address = document.getElementById("address");
        const registrationNumber = document.getElementById("registrationNumber");
        const email = document.getElementById("email");
        const profilePicture = document.getElementById("profilePicture");

        // Set the farmer details
        firstName.textContent = farmerData.firstName;
        lastName.textContent = farmerData.lastName;
        phoneNumber.textContent = farmerData.phoneNumber;
        address.textContent = farmerData.address;
        registrationNumber.textContent = farmerData.registrationNumber;
        email.textContent = farmerData.email;
        farmerRegStatus.textContent = mapFarmerRegStatus(farmerData.farmerRegStatus);
        farmName.textContent = farmerData.farmName;

        // Select the list element for produce types
        const produceInfoList = document.getElementById("produceInfoList");

        data.produceTypeDto.forEach(produceType => {
            const listItem = document.createElement("li");
            listItem.textContent = `Type Name: ${produceType.typeName}, Produce Name: ${produceType.produceName}, Category: ${produceType.nameOfCategory}`;
            produceInfoList.appendChild(listItem);
        });

        if (farmerData.profilePicture && farmerData.profilePicture.trim() !== "") {
            const profilePictureUrl = farmerData.profilePicture.trim();
            profilePicture.src = `${baseUrl}Upload/images/${profilePictureUrl}`;
            profilePicture.alt = "Profile Picture";
        } else {
            profilePicture.src = "../producePictures/farmIcons.jpg"; 
            profilePicture.alt = "Profile Picture";
        }
    }


    function displayError() {
        const farmerDetails = document.querySelector(".card-body");
        farmerDetails.innerHTML = `<p class="text-danger">An error occurred while fetching farmer data.</p>`;
    }

}

function mapFarmerRegStatus(status) {
    switch (status) {
        case 1:
            return "Pending";
        case 2:
            return "Declined";
        case 3:
            return "Approved";
        // default:
        //     return "Unknown";
    }
}


//////////////////////////////////////////////////////////////////////////////////////

function VerifyFarmer(id, status) {
    const verificationData = {
        Id: id,
        Status: status 
    };

    fetch(`${baseUrl}api/Farmer/VerifyFarmer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(verificationData)
    })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error("Network response was not ok");
        //     }
        //     return response.json();
        // })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                // alert("Farmer verification successful!");
                showSweetAlert(data.message);
            } else {
                // alert("Farmer verification failed.");
                showSweetAlertError(data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            // Display an error message to the user
            alert("An error occurred while verifying the farmer.");
        });
}


//////////////////////////////////////////////////////////////////////////////////////




function ApproveProducetypes(farmerId) {
    // Fetch the list of produce types to be approved
    console.log("FARMERID", farmerId)
    fetch(`${baseUrl}api/ProduceType/GetProduceTypesToBeApprovedAsync/${farmerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.status) {
                // Display the list of produce types to be approved
                displayProduceTypes(data.data, farmerId);
            } else {
                alert("No produce types to be approved found.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while fetching produce types to be approved.");
        });
}


function displayProduceTypes(produceTypes) {
    // Select the elements for displaying produce types
    const body = document.querySelector(".body");
    console.log(produceTypes)
    body.innerHTML = `
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h4>Produce Types to be Approved</h4>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Type Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${produceTypes.map(produceType => `
                                    <tr>
                                        <td>${produceType.typeName}</td>
                                        <td>
                                            <button class="btn btn-success mx-2" id="${produceType.id}" data-farmerid="${produceType.farmerId}" data-status=2 onclick="approveProduceType(this)">
                                                Approve
                                            </button>
                                            <button class="btn btn-danger mx-2" id="${produceType.id}" data-farmerid="${produceType.farmerId}" data-status=3 onclick="approveProduceType(this)">
                                                Not Approved
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <a href="./farmers.html" class="btn btn-secondary">Back</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function approveProduceType(button) {
    const produceTypeId = button.id;
    const farmerId = button.getAttribute("data-farmerid");
    const status = button.getAttribute("data-status");

    // Create an object to send to the server
    const verificationData = {
        produceTypeId: produceTypeId,
        farmerId: farmerId,
        status: status
    };
    console.log(JSON.stringify(verificationData))

    // Send a POST request to the server to verify the produce type
    fetch(`${baseUrl}api/ProduceType/VerifyProduceType`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(verificationData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.status) {
                // alert("Produce type verification successful!");
                showSweetAlert(data.message);
            } else {
                // alert("Produce type verification failed.");
                showSweetAlertError(data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while verifying the produce type.");
        });
}

//////////////////////////////////////////////////////////////////////////////////////

function fetchAndDisplayApprovedProduceTypes(farmerId) {
    fetch(`${baseUrl}api/ProduceType/GetApprovedProduceTypesForAFarmer/${farmerId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.status) {
                displayApprovedFarmerProducetypes(data.data);
                // showSweetAlert(data.message);

            } else {
                // displayError();
                showSweetAlertError(data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            displayError();
        });
}

function displayApprovedFarmerProducetypes(data) {
    // const approvedProduceTypesContainer = document.getElementById("approvedProduceTypesContainer");
    // approvedProduceTypesContainer.innerHTML = `
    const body = document.querySelector(".body");
    body.innerHTML = `
    <div class="container mt-3">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h4>Approved Farmer Produce Types</h4>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        ${data.map(produceType => `
                            <li class="list-group-item">
                                <strong>Produce Type Name:</strong> ${produceType.typeName}
                            </li>
                        `).join('')}
                    </ul>
                    <br>
                    <a href="./farmers.html" class="btn btn-secondary">Back</a>
                </div>
            </div>
        </div>
    </div>
</div>


    `;
}

function displayError() {
    const approvedProduceTypesContainer = document.getElementById("approvedProduceTypesContainer");
    approvedProduceTypesContainer.innerHTML = `<p>An error occurred while fetching the data.</p>`;
}

//////////////////////////////////////////////////////////////////////////////////////

function AccountDetails(id) {
    // Fetch the farmer's account details
    fetch(`${baseUrl}api/Farmer/GetFarmerAccountDetails/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.status) {
                // Display the account details
                displayFarmerAccountDetails(data);
            } else {
                alert("Farmer account details not found.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while fetching farmer account details.");
        });

    function displayFarmerAccountDetails(data) {
        // Select the elements for farmer details
        const body = document.querySelector(".body");
        body.innerHTML = `
            <div class="container mt-3">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header bg-primary text-white">
                                <h4>Farmer Account Details</h4>
                            </div>
                            <div class="card-body">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <strong>Bank Name:</strong> ${data.data.bankName}
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Account Name:</strong> ${data.data.accountName}
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Account Number:</strong> ${data.data.accountNumber}
                                    </li>
                                </ul>
                                <br>
                                  <a href="./farmers.html" class="btn btn-secondary">Back</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

}








//////////////////////////////////////////////////////////////////////////////////////

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
                    <a href="./farmers.html" class="btn btn-secondary">Back</a>
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

    fetch(`${baseUrl}api/Farmer/UpdateFarmer/${id}`, {
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

            if (data.status) {
                showSweetAlert(data.message);
            } else {
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
            fetch(`${baseUrl}api/Farmer/DeleteFarmer/${id}`, {
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


