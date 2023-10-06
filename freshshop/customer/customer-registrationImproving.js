document.getElementById('submitButton').addEventListener('click', function (e) {
    e.preventDefault();
    const formElement = document.getElementById('myForm');
    const formData = new FormData(formElement);

    if (formData.get('password') === formData.get('confirmpassword')) {
        console.log("Password match");
        
        // Submit to backend
        fetch('http://localhost:5195/api/Customer/CustomerRegistration', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                
                console.log("Response Data:", data);
                console.log("Validation Errors:", data.errors);
                console.log("Validation Errors:", data.errors.Email);
                console.log("Validation Errors:", data.errors.FirstName);
                //let er = data.errors.errors;
                //console.log("Validation Errors:", er);
                //console.log("Validation Errors:", );
                showSweetAlertErrorNew(data.errors.Email[0]);

                if (data.status) {
                    showSweetAlert(data);
                } else {

                    console.log("Validation Errors:", data.errors);

                    // Display validation errors and the existing status message
                    showSweetAlertError(data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    } else {
        document.getElementById('error').innerHTML = "Password doesn't match, please refill";
    }
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
        window.location.replace('../general/login.html');
    });
}

// Function to show error SweetAlert2 modal with validation errors
function showSweetAlertErrorNew(message) {
    //let errorMessage; // Existing status message
    
    // if (data.errors && data.errors.length > 0) {
    //     errorMessage += "<br><ul>";
    //     data.errors.forEach(error => {
    //         errorMessage += `<li>${error}</li>`;
    //     });
    //     errorMessage += "</ul>";
    // }
    
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
        window.location.href = './customer-registration.html';
    });
}
