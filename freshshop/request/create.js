function addNewProduceType() {
    const farmerId = 'YOUR_FARMER_ID'; // Replace with the actual farmer ID
    const produceTypeId = document.getElementById('produceTypeId').value;
    const rejectionReason = document.getElementById('rejectionReason').value;

    const data = new FormData();
    data.append('produceTypeId', produceTypeId);
    data.append('rejectionReason', rejectionReason);

    fetch(`/api/ProduceType/AddNewProduceType/${farmerId}`, {
        method: 'POST',
        body: data,
    })
    .then(response => response.json())
    .then(result => {
        const resultElement = document.getElementById('result');
        if (result) {
            resultElement.innerHTML = result;
        } else {
            resultElement.innerHTML = 'Failed to submit the request.';
        }
    })
    .catch(error => {
        console.error(error);
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = 'An error occurred while submitting the request.';
    });
}

        
        
        
        
        
        
        // Function to populate the category dropdown dynamically
        function populateCategoryDropdown() {
            // Make an API request to get the list of categories dynamically
            fetch('http://localhost:5195/api/Produce/GetAllProduce')
                .then(response => response.json())
                .then(data => {
                    const categoryDropdown = document.querySelector('select[name="ProduceId"]');
                    // Clear any existing options
                    categoryDropdown.innerHTML = '';
                    // Add new options based on the fetched data
                    data.data.forEach(produce => {
                        const option = document.createElement('option');
                        option.value = produce.id; // You may need to adjust the value accordingly
                        option.textContent = produce.produceName; // Use the appropriate property from your API response
                        categoryDropdown.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        // Call the function to populate the category dropdown when the page loads
        window.addEventListener('load', populateCategoryDropdown);

        // Modify the submit event listener to include the selected category
        document.getElementById('submitButton').addEventListener('click', function (e) {
            e.preventDefault();
            const formElement = document.getElementById('myForm');
            const formData = new FormData(formElement);

            // Add the selected category to the form data
            const selectedCategory = document.querySelector('select[name="ProduceId"]').value;
            formData.append('ProduceId', selectedCategory);

            fetch('http://localhost:5195/api/ProduceType/CreateProduceType', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        showSweetAlert(data);
                    } else {
                        showSweetAlertError(data);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });

        // Function to show success SweetAlert2 modal
function showSweetAlert(data) {
    Swal.fire({
        text: data.message,
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
        window.location.replace('../admin/dashboard.html');
    });
}

// Function to show error SweetAlert2 modal
function showSweetAlertError(data) {
    Swal.fire({
        text: data.message,
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









