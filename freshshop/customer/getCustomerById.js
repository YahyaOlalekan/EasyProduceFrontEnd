// JavaScript for getting a single customer by ID
//  const customerId = localStorage.getItem("id");
 const customerId = '630c2e4e-0ba1-4694-b0ec-c50c7dc7e8fe';
// var customerId = localStorage.getItem("customerId")
fetch(`http://localhost:5195/api/Customer/GetCustomerById/${customerId}`)
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
    const tableBody = document.getElementById("customerTableBody");

    // Clear any previous data in the table body
    tableBody.innerHTML = "";

    // Create a row for the customer
    const row = `
        <tr>
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.phoneNumber}</td>
            <td>${customer.address}</td>
            <td>${customer.registrationNumber}</td>
            <td>${customer.email}</td>
            <td><img src="${customer.profilePicture}" alt="Profile Picture" style="max-width: 100px;">
            </td>
        </tr>`;
    tableBody.innerHTML = row;
    // <img src="${customer.profilePicture}" alt="Profile Picture" style="max-width: 100px;">

            //  <img src=${`http://localhost:5195/wwwroot/Upload/images/${customer.profilePicture}`} alt="Profile Picture" style="max-width: 100px;">

    // <td><img src="C:\\Users\\USER PC\\Desktop\\EasyProduce\\Host\\wwwroot\\Upload\\images\\0cf5cb13-824b-4ca6-8f27-abbdae60aeb1_bird.jpg" alt="Profile Picture" style="max-width: 100px;"></td>

    // profile_image.innerHTML += `<img class="rounded-circle" src="http://127.0.0.1:5502/wwwroot/Images/${response.data.profileImage}" alt="" style="width: 40px; height: 40px;">`
   // C:\Users\USER PC\Desktop\EasyProduce\Host\wwwroot\Upload\images
}

function displayError() {
    const tableBody = document.getElementById("customerTableBody");
    tableBody.innerHTML = `
        <tr>
            <td colspan="8" class="text-danger">An error occurred while fetching customer data.</td>
        </tr>`;
}






