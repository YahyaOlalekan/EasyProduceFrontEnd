document.getElementById('submitButton-category').addEventListener('click', async function (e) {
    e.preventDefault();
    const formElement = document.getElementById('myForm-category-reg');
    const formData = new FormData(formElement);
   
                 
            try {

                const apiUrl = `${baseUrl}api/Category/CreateCategory`;
                const token = localStorage.getItem("token");
        
                const response = await makeApiRequest(apiUrl, 'POST', formData, token);
        
                if (response.status) {
                    showSweetAlertAddCategory(response);
                } else {
                    showSweetAlertErrorAddCategory(response);
                }
            } catch (error) {
                alert(error.message);
            }
});

function showSweetAlertAddCategory(response) {
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

function showSweetAlertErrorAddCategory(response) {
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









