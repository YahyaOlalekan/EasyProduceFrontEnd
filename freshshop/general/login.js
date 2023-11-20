
document.querySelector('#loginform').addEventListener('submit', e => {
    e.preventDefault();
    let formElement = document.querySelector('#loginform');
    const formData = new FormData(formElement);
    console.log(formData.get('email'));
    fetch(`${baseUrl}api/User/Login`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                // alert(data.message)
                showSweetAlert(data);
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
        // localStorage.setItem("id", data.id)
        localStorage.setItem("id", data.data.id.toString()); 
        localStorage.setItem("token", data.data.token.toString()); 


        if (data.data.roleName == "customer") {
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
            popup: 'animated fadeIn', 
            title: 'custom-title-class', 
            content: 'custom-content-class', 
            actions: 'custom-actions-class', 
            // Apply custom classes to specific elements
            icon: 'swal-icon', 
            confirmButton: 'swal-button', 
            confirmButtonText: 'swal-button-text', 
        },
        background: 'rgb(1, 6, 28)',
    })
        .then(() => {
            window.location.href = './login.html';

        });
}