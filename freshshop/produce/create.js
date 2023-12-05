        function populateCategoryDropdown() {
            // Make an API request to get the list of categories dynamically
            // fetch(`${baseUrl}api/Category/GetAllCategories`)
            //     .then(response => response.json())

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

        document.getElementById('submitButton').addEventListener('click', async function (e) {
            e.preventDefault();
            const formElement = document.getElementById('myForm');
            const formData = new FormData(formElement);

            // Add the selected category to the form data
            // const selectedCategory = document.querySelector('select[name="CategoryId"]').value;
            // formData.append('CategoryId', selectedCategory);
            
            // fetch(`${baseUrl}api/Produce/CreateProduce`, {
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

                    const apiUrl = `${baseUrl}api/Produce/CreateProduce`;
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







