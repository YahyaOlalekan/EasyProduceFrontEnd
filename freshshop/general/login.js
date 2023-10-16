
document.querySelector('#loginform').addEventListener('submit', e => {
    e.preventDefault();
    let formElement = document.querySelector('#loginform');
    const formData = new FormData(formElement);
    console.log(formData.get('email'));
    fetch('http://localhost:5195/api/User/Login', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.status) {
                // alert(data.message)
                showSweetAlert(data);
                // console.log(data.status);
            } else {
                // document.getElementById('error').innerHTML = data.message;
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
        // window.location.href = './getCustomerById.html';
        // localStorage.setItem("id", data.id)
        localStorage.setItem("id", data.data.id.toString()); // Convert to string before storing
        localStorage.setItem("token", data.data.token.toString()); // Convert to string before storing


        if (data.data.roleName == "customer") {
            // location.href = "./customer/getAllCustomers.html";
            window.location.href = "../customer/dashboard.html";
        }
        else if (data.data.roleName == "admin") {
            window.location.href = "../admin/dashboard.html";
        }
        else if (data.data.roleName == "manager") {
            window.location.href = "../manager/dashboard.html";
        }
        else if (data.data.roleName == "farmer") {
            window.location.href = "../farmer/dashboard.html";
        }
        else {
            window.alert("Unknown role: " + data.data.role);
        }
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
            window.location.href = './login.html';

        });
}