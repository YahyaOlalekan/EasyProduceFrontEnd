
        (function () {
            const tokenById = localStorage.getItem("token");
            const apiUrlById = `${baseUrl}api/Customer/GetCustomerById`;

            getWithAuthorization(apiUrlById, tokenById, true)
                .then(data => {
                    displayCustomerData(data.data);
                })
                .catch(error => {
                    console.error("Error:", error);
                    displayError();
                });

        })();

        function displayCustomerData(customer) {
            const firstName = document.getElementById("firstName");
            const lastName = document.getElementById("lastName");
            const phoneNumber = document.getElementById("phoneNumber");
            const address = document.getElementById("address");
            const registrationNumber = document.getElementById("registrationNumber");
            const email = document.getElementById("email");
            const profilePicture = document.getElementById("profilePicture");

            firstName.textContent = `${customer.firstName}`;
            lastName.textContent = `${customer.lastName}`;
            phoneNumber.textContent = `${customer.phoneNumber}`;
            address.textContent = `${customer.address}`;
            registrationNumber.textContent = `${customer.registrationNumber}`;
            email.textContent = `${customer.email}`;

            profilePicture.src = `${baseUrl}Upload/images/${customer.profilePicture}`;
            console.log(customer.profilePicture);
            profilePicture.alt = "Profile Picture";
        }

        function displayError() {
            const customer = document.querySelector(".card-body");
            customer.innerHTML = `<p class="text-danger">An error occurred while fetching customer data.</p>`;
        }
   