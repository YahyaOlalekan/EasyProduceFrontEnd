
function populateCategoryDropdownn() {
   
    const tokenById = localStorage.getItem("token");
    const apiUrlById = `${baseUrl}api/Produce/GetAllProduce`;
    getWithAuthorization(apiUrlById, tokenById, false)
    .then(data => {
            console.log("All produce:", data )
            const categoryDropdown = document.querySelector('select[name="ProduceId"]');

            categoryDropdown.innerHTML = '';
            data.data.forEach(produce => {
                const option = document.createElement('option');
                option.value = produce.id;
                option.textContent = produce.produceName;
                categoryDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.addEventListener('load', populateCategoryDropdownn);

document.getElementById('submitButton-producetypeAdd').addEventListener('click',async function (e) {
    e.preventDefault();
    const formElement = document.getElementById('myForm-producetypeAdd');
    const formData = new FormData(formElement);

    // const selectedCategory = document.querySelector('select[name="ProduceId"]').value;
   
    try {

        const apiUrl = `${baseUrl}api/ProduceType/CreateProduceType`;
        const token = localStorage.getItem("token");

        const response = await makeApiRequest(apiUrl, 'POST', formData, token);

        if (response.status) {
            showSweetAlertForProducetypeAdd(response);
        } else {
            showSweetAlertErrorForProducetypeAdd(response);
        }
    } catch (error) {
        alert(error.message);
    }

});

function showSweetAlertForProducetypeAdd(response) {
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

function showSweetAlertErrorForProducetypeAdd(response) {
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









