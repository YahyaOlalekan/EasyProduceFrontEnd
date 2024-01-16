document.getElementById('submitButton-role').addEventListener('click', async function (e) {
    e.preventDefault();
    const formElement = document.getElementById('myRoleForm');
    const formData = new FormData(formElement);

    const roleName = formData.get('RoleName');
    const roleDescription = formData.get('RoleDescription');

    if (!roleName || !roleDescription) {
        alert('Please fill out all required fields');
        return;
    }

    try {

        const apiUrl = `${baseUrl}api/Role/AddRole`;
        const token = localStorage.getItem("token");

        const response = await makeApiRequest(apiUrl, 'POST', formData, token);

        if (response.status) {
            showSweetAlertForAddRole(response);
        } else {
            showSweetAlertErrorForAddRole(response);
        }
    } catch (error) {
        alert(error.message);
    }
});


function showSweetAlertForAddRole(response) {
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

function showSweetAlertErrorForAddRole(response) {
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









