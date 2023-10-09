
document.getElementById('submitButton').addEventListener('click', function (e) {
    e.preventDefault();
    // console.log("Submit button clicked"); 

    const formElement = document.getElementById('myForm');
    const formData = new FormData(formElement);

    // if (formData.get('Password') === formData.get('ConfirmPassword')) {
        // Submit to backend
        fetch('http://localhost:5195/api/Customer/CustomerRegistration', {
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
    // } else {
    //     document.getElementById('error').innerHTML = "Password doesn't match, please refill";
    // }
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
        window.location.href = './customer-registration.html';

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
            window.location.href = './customer-registration.html';
        }

        // if (result.isConfirmed) {
        //     window.location.href = './customer-registration.html';
        // }

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

