
        function populateProduceTypeDropdown() {
          
            const tokenById = localStorage.getItem("token");
            const apiUrlById = `${baseUrl}api/ProduceType/GetUnApprovedProduceTypesForAFarmerByUserId`;

            getWithAuthorization(apiUrlById, tokenById, true)
                .then(data => {
                    console.log('data..........:', data)
                    const produceTypeDropdown = document.getElementById('produceId');
                    data.data.forEach(produceType => {
                        const option = document.createElement('option');
                        option.value = produceType.id;
                        option.textContent = produceType.typeName;
                        produceTypeDropdown.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        window.addEventListener('load', populateProduceTypeDropdown);

        document.getElementById('submitButton').addEventListener('click', async function (e) {
            e.preventDefault();
            const formElement = document.getElementById('addProduceTypeForm');
            const formData = new FormData(formElement);
             const farmerId = localStorage.getItem("id");

            const selectedProduceId = document.getElementById('produceId').value;
            formData.delete('produceTypeId');
            formData.append('produceTypeId', selectedProduceId);
           
            try {

                const apiUrl = `${baseUrl}api/Request/AddNewProduceType/${farmerId}/${selectedProduceId}`;
                const token = localStorage.getItem("token");
                const response = await makeApiRequest(apiUrl, 'POST', formData, token);
                console.log('Response.....:', response)
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
                window.location.href = './farmers.html';

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
                    window.location.href = './farmers.html';

                });
        }

