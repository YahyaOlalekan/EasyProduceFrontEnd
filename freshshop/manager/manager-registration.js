document.getElementById('submitButton').addEventListener('click', async function (e) {
    e.preventDefault();
    const formElement = document.getElementById('myManagerForm');
    const formData = new FormData(formElement);

    if (formData.get('password') === formData.get('confirmpassword')) {
        console.log("Password match");

        // fetch(`${baseUrl}api/Manager/RegisterManager`, {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.status) {
                   
        //             showSweetAlert(data);

        //         } else {
        //             showSweetAlertError(data);
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });


        try {

            const apiUrl = `${baseUrl}api/Manager/RegisterManager`;
            const token = localStorage.getItem("token");
    
            const response = await makeApiRequest(apiUrl, 'POST', formData, token);
    
            if (response.status) {
                showSweetAlert(response);
            } else {
                showSweetAlertError(response);
            }
        } catch (error) {
            alert(error.message);
        }

    }
    else {
        document.getElementById('error').innerHTML = "password doesn't match please refill"
    }

});


function showSweetAlert(response) {
    Swal.fire({
        text: response.message,
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
        window.location.replace('../admin/dashboard.html');
    });
}

function showSweetAlertError(response) {
    Swal.fire({
        text: response.message,
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
    })
        .then(() => {
            window.location.href = '../admin/dashboard.html';

        });
}
