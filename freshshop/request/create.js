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


function LoadProduce() {
    fetch('http://localhost:5195/api/ProduceType/GetAllProduceType')
        .then(response => response.json())
        .then(res => {
            const selectElement = document.getElementById('produceTypesSelect');
            res.data.forEach(option => {
                // Create an <option> element for each produce type
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.typeName;
                // Append the option to the select element
                selectElement.appendChild(optionElement);
            });

            // Initialize Select2 for the dropdown
            $('#produceTypesSelect').select2();
        });
}

document.querySelector('#farmer-form').addEventListener('submit', e => {
    e.preventDefault();
    let formElement = document.querySelector('#farmer-form');
    const formData = new FormData(formElement);
    const selectedProduceTypes = $('#produceTypesSelect').val();
    formData.delete('ProduceTypes');
    selectedProduceTypes.forEach(type => {
        formData.append('ProduceTypes', type);
    });
    fetch('http://localhost:5195/api/Farmer/RegisterFarmer', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())

        .then(data => {
            if (data.status === 400 && data.errors) {
                // Handle validation errors
                showSweetAlertValidationErrors(data)

            } else if (data.status === 200) {
                // Handle success
                showSweetAlert(data.message);

            } else {
                // Handle other errors
                showSweetAlertError(data.message);
            }
        })

        .catch(error => {
            console.error('Error:', error);
        });
});



// Function to show validation errors
function showSweetAlertValidationErrors(data) {
    let errorMessage = "Validation errors occurred:<br><ul>";
    for (const field in data.errors) {
        errorMessage += `<li>${field}: ${data.errors[field]}</li>`;
    }
    errorMessage += "</ul>";

    Swal.fire({
        html: errorMessage,
        icon: 'error',
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'animated fadeIn',
            title: 'custom-title-class',
            content: 'custom-content-class',
            actions: 'custom-actions-class',
            icon: 'swal-icon',
            confirmButton: 'swal-button',
            confirmButtonText: 'swal-button-text',
        },
        background: 'rgb(1, 6, 28)',
    }).then(() => {
        window.location.href = './farmer-registration.html';

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
            popup: 'animated fadeIn',
            title: 'custom-title-class',
            content: 'custom-content-class',
            actions: 'custom-actions-class',
            icon: 'swal-icon',
            confirmButton: 'swal-button',
            confirmButtonText: 'swal-button-text',
        },
        background: 'rgb(1, 6, 28)',
        allowOutsideClick: false, // Add this line
    }).then(() => {
        window.location.href = '../general/login.html';
        // window.location.replace('../general/login.html');

    });
}


// Function to show error SweetAlert2 modal with status message
function showSweetAlertError(errorMessage) {
    Swal.fire({
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: 'hsl(210, 17%, 93%)',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'animated fadeIn',
            title: 'custom-title-class',
            content: 'custom-content-class',
            actions: 'custom-actions-class',
            icon: 'swal-icon',
            confirmButton: 'swal-button',
            confirmButtonText: 'swal-button-text',
        },
        background: 'rgb(1, 6, 28)',
    }).then((result) => {

        if (result.value) {
            window.location.href = './farmer-registration.html';
        }


    });
}

function validateInput(inputElement, errorElementId) {
    // Get the input value
    var inputValue = inputElement.value;
    var errorElement = document.getElementById(errorElementId);

    if (inputValue.length < 3) {
        errorElement.textContent = "Input must be at least 3 characters long";
        inputElement.focus(); // Keep focus on the input field
    } else {
        errorElement.textContent = ""; // Clear any previous error message
    }
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









