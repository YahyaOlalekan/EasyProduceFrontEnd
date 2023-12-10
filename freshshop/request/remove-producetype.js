
        function populateProduceTypeDropdown() {

            const tokenById = localStorage.getItem("token");
            const apiUrlById = `${baseUrl}api/ProduceType/GetApprovedProduceTypesForAFarmerByUserId`;

            getWithAuthorization(apiUrlById, tokenById, true)
                .then(data => {
                    const produceTypeDropdown = document.getElementById('produceTypeId');
                    const noProduceTypeMessage = document.getElementById('noProduceTypeMessage');
                    const removeProduceTypeFormContainer = document.getElementById('removeProduceTypeFormContainer');

                    if (data.data === null || data.data.length === 0) {
                        noProduceTypeMessage.textContent = "You can't remove produce type since you have not been approved.";
                        noProduceTypeMessage.style.color = 'red';
                        removeProduceTypeFormContainer.style.display = 'none';
                    } else {
                        data.data.forEach(produceType => {
                            const option = document.createElement('option');
                            option.value = produceType.id;
                            option.textContent = produceType.typeName;
                            produceTypeDropdown.appendChild(option);
                        });

                        removeProduceTypeFormContainer.style.display = 'block';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }


        window.addEventListener('load', populateProduceTypeDropdown);

        document.getElementById('removeButton').addEventListener('click', async function (e) {
            e.preventDefault();
            const formElement = document.getElementById('removeProduceTypeForm');
            const formData = new FormData(formElement);

            const selectedProduceTypeId = document.getElementById('produceTypeId').value;
            formData.delete('produceTypeId');
            formData.append('ProduceTypeId', selectedProduceTypeId);

            try {
                const farmerId = localStorage.getItem("id");

                const apiUrl = `${baseUrl}api/Request/RemoveExistingProduceType/${farmerId}`;
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


        function showSweetAlertSuccess(response) {
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
                window.location.href = '../farmer/dashboard.html';
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
            }).then(() => {
                window.location.href = '../farmer/dashboard.html';
            });
        }
  