document.getElementById('submitButton').addEventListener('click', async function (e) {
    e.preventDefault();
    const formElement = document.getElementById('myForm');
    const formData = new FormData(formElement);
   
        // fetch(`${baseUrl}api/Category/CreateCategory`, {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         // console.log(data);
        //         if (data.status) {
        //             // console.log(data.status);
        //             // window.alert(data.message)
        //             showSweetAlert(data);

        //         } else {
        //             // document.getElementById('error').innerHTML = data.message;
        //             showSweetAlertError(data);
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });

            
            try {

                const apiUrl = `${baseUrl}api/Category/CreateCategory`;
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









