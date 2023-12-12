

        var form = document.getElementById("updateManagerForm")
        form.addEventListener("submit", (event) => {
            event.preventDefault();
           
            const managerId = localStorage.getItem("id");
            const token = localStorage.getItem("token");
            const url = `${baseUrl}api/Manager/UpdateManager/${managerId}`;
            const formData = new FormData(form);


            putWithAuthorizationFormData(url, token, formData)
                .then((data) => {
                    if (data.status === 400 && data.errors) {
                        showSweetAlertValidationErrorsForManagerUpdate(data)

                    } else if (data.status == true) {
                        showSweetAlertForManagerUpdate(data.message);

                    } else {
                        showSweetAlertErrorForManagerUpdate(data.message);
                    }

                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        });


        function showSweetAlertValidationErrorsForManagerUpdate(data) {
            let errorMessage = "Validation errors occurred:<br><ul>";
            for (const field in data.errors) {
                errorMessage += `<li>${field}: ${data.errors[field]}</li>`;
            }
            errorMessage += "</ul>";

            Swal.fire({
                html: errorMessage,
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
            }).then(() => {
                window.location.href = './dashboard.html';

            });
        }


        function showSweetAlertForManagerUpdate(message) {
            Swal.fire({
                text: message,
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
                allowOutsideClick: false,
            }).then(() => {
                window.location.href = './dashboard.html';
                // window.location.replace('../general/login.html');

            });
        }


        function showSweetAlertErrorForManagerUpdate(errorMessage) {
            Swal.fire({
                text: errorMessage,
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
            }).then((result) => {

                if (result.value) {
                    window.location.href = './dashboard.html';
                }

            });
        }

        function validateInputForManagerUpdate(inputElement, errorElementId) {

            var inputValue = inputElement.value;
            var errorElement = document.getElementById(errorElementId);

            if (inputValue.length < 3) {
                errorElement.textContent = "Input must be at least 3 characters long";
                inputElement.focus(); 
            } else {
                errorElement.textContent = ""; 
            }
        }

   