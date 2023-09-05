// JavaScript for populating customer data into the table

let count = 1;
let tableBody = document.getElementById("customerTableBody");



fetch("http://localhost:5195/api/Customer/GetAllCustomers")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        data.data.forEach(customer => {
            const row = `
                <tr>
                    <td>${count}</td>
                    <td>${customer.firstName}</td>
                    <td>${customer.lastName}</td>
                    <td>${customer.phoneNumber}</td>
                    <td>${customer.address}</td>
                    <td>${customer.registrationNumber}</td>
                    <td>${customer.email}</td>
                 <td><button  id="${customer.id}" onclick="ViewDetails(this.id)">View</button></td> 
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
function ViewDetails(id) {

    // fetch(`${baseUrl}api/Customer/GetCustomerById/${id}`)
    // fetch("http://localhost:5195/api/Customer/GetCustomerById/(id)")
     fetch(`http://localhost:5195/api/Customer/GetCustomerById/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Assuming the returned data is an object with customer attributes
                displayCustomerData(data.data);
            })
            .catch(error => {
                console.error("Error:", error);
                // Display an error message to the user
                displayError();
            });

        function displayCustomerData(customer) {

            // Select the elements for customer details
            const body = document.querySelector(".body");
            body.innerHTML = ` <div class="container-fluid p-0">
            <div class="card">
                <h5 class="card-header">Customer Details</h5>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img id="profilePicture" src="" alt="Profile Picture" style="max-width: 100%;">
                        </div>
                        <div class="col-md-9">
                            <ul class="list-group">
                                <li class="list-group-item" id="firstName">First Name: </li>
                                <li class="list-group-item" id="lastName">Last Name: </li>
                                <li class="list-group-item" id="phoneNumber">Phone Number: </li>
                                <li class="list-group-item" id="address">Address: </li>
                                <li class="list-group-item" id="registrationNumber">Registration Number: </li>
                                <li class="list-group-item" id="email">Email: </li>
                            </ul>
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

            // Set the customer details
            firstName.textContent = `First Name: ${customer.firstName}`;
            lastName.textContent = `Last Name: ${customer.lastName}`;
            phoneNumber.textContent = `Phone Number: ${customer.phoneNumber}`;
            address.textContent = `Address: ${customer.address}`;
            registrationNumber.textContent = `Registration Number: ${customer.registrationNumber}`;
            email.textContent = `Email: ${customer.email}`;

            // Set the profile picture source
            var baseUrl = "http://localhost:5195/"
            profilePicture.src =`${baseUrl}Upload/images/${customer.profilePicture}`;
            console.log(customer.profilePicture);
            profilePicture.alt = "Profile Picture";
        }

        function displayError() {
            const customerDetails = document.querySelector(".card-body");
            customerDetails.innerHTML = `<p class="text-danger">An error occurred while fetching customer data.</p>`;
        }

}



/* <td><button  id="${customer.id}" onclick="ViewDetails(this.id)">View</button></td> */
























