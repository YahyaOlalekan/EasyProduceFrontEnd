        // Function to populate the category dropdown dynamically
        function populateCategoryDropdown() {
            // Make an API request to get the list of categories dynamically
            fetch(`${baseUrl}api/Produce/GetAllProduce`)
                .then(response => response.json())
                .then(data => {
                    const categoryDropdown = document.querySelector('select[name="ProduceId"]');
                    // Clear any existing options
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

        window.addEventListener('load', populateCategoryDropdown);

        // Modify the submit event listener to include the selected category
        document.getElementById('submitButton').addEventListener('click', function (e) {
            e.preventDefault();
            const formElement = document.getElementById('myForm');
            const formData = new FormData(formElement);

            // Add the selected category to the form data
            const selectedCategory = document.querySelector('select[name="ProduceId"]').value;
            formData.append('ProduceId', selectedCategory);

            fetch(`${baseUrl}api/ProduceType/CreateProduceType`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        showSweetAlert(data);
                    } else {
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
        window.location.replace('../admin/dashboard.html');
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









