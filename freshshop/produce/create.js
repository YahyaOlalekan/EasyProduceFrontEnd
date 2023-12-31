function populateCategoryDropdown() {

    const tokenById = localStorage.getItem("token");
    const apiUrlById = `${baseUrl}api/Category/GetAllCategories`;
    getWithAuthorization(apiUrlById, tokenById, false)
        .then(data => {
            const categoryDropdown = document.querySelector('select[name="CategoryId"]');
            categoryDropdown.innerHTML = '';

            data.data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.nameOfCategory;
                categoryDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.addEventListener('load', populateCategoryDropdown);

document.getElementById('submitButton-produce-add').addEventListener('click', async function (e) {
    e.preventDefault();
    const formElement = document.getElementById('myForm-produce-add');
    const formData = new FormData(formElement);

    try {

        const apiUrl = `${baseUrl}api/Produce/CreateProduce`;
        const token = localStorage.getItem("token");

        const response = await makeApiRequest(apiUrl, 'POST', formData, token);

        if (response.status) {
            showSweetAlertForProduceAdd(response);
        } else {
            showSweetAlertErrorForProduceAdd(response);
        }
    } catch (error) {
        alert(error.message);
    }

});


function showSweetAlertForProduceAdd(response) {
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

function showSweetAlertErrorForProduceAdd(response) {
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







