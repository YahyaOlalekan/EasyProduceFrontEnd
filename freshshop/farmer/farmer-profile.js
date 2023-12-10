
window.onload = function () {
    ViewDetails();
};

function ViewDetails() {

    const tokenById = localStorage.getItem("token");
    const apiUrlById = `${baseUrl}api/Farmer/GetFarmerAlongWithApprovedProduceType`;
    console.log('Token:', tokenById);

    getWithAuthorization(apiUrlById, tokenById, true)
        .then(data => {
            // console.log('data:', data);

            displayFarmerData(data.data);
        })
        .catch(error => {
            console.error("Error:", error);
            displayError();
        });

    function displayFarmerData(data) {
        console.log('Data received:', data);
        const firstName = document.getElementById("firstName");
        const farmerRegStatus = document.getElementById("farmerRegStatus");
        const farmName = document.getElementById("farmName");
        const lastName = document.getElementById("lastName");
        const phoneNumber = document.getElementById("phoneNumber");
        const address = document.getElementById("address");
        const registrationNumber = document.getElementById("registrationNumber");
        const email = document.getElementById("email");
        const profilePicture = document.getElementById("profilePicture");

        firstName.textContent = data.farmerDto.firstName;
        lastName.textContent = data.farmerDto.lastName;
        phoneNumber.textContent = data.farmerDto.phoneNumber;
        address.textContent = data.farmerDto.address;
        registrationNumber.textContent = data.farmerDto.registrationNumber;
        email.textContent = data.farmerDto.email;
        farmerRegStatus.textContent = mapFarmerRegStatus(data.farmerDto.farmerRegStatus);
        farmName.textContent = data.farmerDto.farmName;

        const produceInfoList = document.getElementById("produceInfoList");

        data.produceTypeDto.forEach(produceType => {
            const listItem = document.createElement("li");
            listItem.textContent = `Type Name: ${produceType.typeName}, Produce Name: ${produceType.produceName}, Category: ${produceType.nameOfCategory}`;
            produceInfoList.appendChild(listItem);
        });

        if (data.farmerDto.profilePicture && data.farmerDto.profilePicture.trim() !== "") {
            const profilePictureUrl = data.farmerDto.profilePicture.trim();
            profilePicture.src = `${baseUrl}Upload/images/${profilePictureUrl}`;
            profilePicture.alt = "Profile Picture";
        } else {
            profilePicture.src = "../producePictures/farmIcons.jpg";
            profilePicture.alt = "Profile Picture";
        }
    }

    function displayError() {
        console.log('An error occurred while fetching farmer data.');
        const farmerDetails = document.querySelector(".card-body");
        farmerDetails.innerHTML = `<p class="text-danger"> You have not been approved as a farmer!</p>`;
    }

    function mapFarmerRegStatus(status) {
        switch (status) {
            case 1:
                return "Pending";
            case 2:
                return "Declined";
            case 3:
                return "Approved";
        }
    }
}

