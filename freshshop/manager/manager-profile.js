
        (function () {
           
            const tokenById = localStorage.getItem("token");
            // const apiUrlById = `${baseUrl}api/Manager/GetManagerById/${managerId}`;
            const apiUrlById = `${baseUrl}api/Manager/GetManagerById`;

            getWithAuthorization(apiUrlById, tokenById, true)
                .then(data => {
                    displayManagerData(data.data);
                })
                .catch(error => {
                    console.error("Error:", error);
                    displayError();
                });

        })();

        function displayManagerData(manager) {
            const firstName = document.getElementById("firstName");
            const lastName = document.getElementById("lastName");
            const phoneNumber = document.getElementById("phoneNumber");
            const address = document.getElementById("address");
            const registrationNumber = document.getElementById("registrationNumber");
            const email = document.getElementById("email");
            const profilePicture = document.getElementById("profilePicture");

            firstName.textContent = `${manager.firstName}`;
            lastName.textContent = `${manager.lastName}`;
            phoneNumber.textContent = `${manager.phoneNumber}`;
            address.textContent = `${manager.address}`;
            registrationNumber.textContent = `${manager.registrationNumber}`;
            email.textContent = `${manager.email}`;

            profilePicture.src = `${baseUrl}Upload/images/${manager.profilePicture}`;
            // console.log(manager.profilePicture);
            profilePicture.alt = "Profile Picture";
        }

        function displayError() {
            const manager = document.querySelector(".card-body");
            manager.innerHTML = `<p class="text-danger">An error occurred while fetching manager data.</p>`;
        }
  