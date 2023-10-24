        // Function to populate the category dropdown dynamically
        function populateCategoryDropdown() {
            // Make an API request to get the list of categories dynamically
            fetch(`${baseUrl}api/Category/GetAllCategories`)
                .then(response => response.json())
                .then(data => {
                    const categoryDropdown = document.querySelector('select[name="CategoryId"]');
                    // Clear any existing options
                    categoryDropdown.innerHTML = '';
                    // Add new options based on the fetched data
                    data.data.forEach(category => {
                        const option = document.createElement('option');
                        option.value = category.id; // You may need to adjust the value accordingly
                        option.textContent = category.nameOfCategory; // Use the appropriate property from your API response
                        categoryDropdown.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        // Call the function to populate the category dropdown when the page loads
        window.addEventListener('load', populateCategoryDropdown);

        // Modify the submit event listener to include the selected category
        document.getElementById('submitButton').addEventListener('click', function (e) {
            e.preventDefault();
            const formElement = document.getElementById('myForm');
            const formData = new FormData(formElement);

            // Add the selected category to the form data
            const selectedCategory = document.querySelector('select[name="CategoryId"]').value;
            formData.append('CategoryId', selectedCategory);

            fetch(`${baseUrl}api/Produce/CreateProduce`, {
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
            window.location.href = '../admin/dashboard.html';

        });
}









