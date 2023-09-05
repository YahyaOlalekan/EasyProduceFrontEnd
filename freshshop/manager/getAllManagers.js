// JavaScript for populating managers data into the table

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
