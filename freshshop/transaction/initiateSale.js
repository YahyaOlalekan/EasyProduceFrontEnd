
        fetch(`${baseUrl}api/ProduceType/GetAllProduceType`)
            .then(response => response.json())
            .then(data => {
                // console.log('data:', data)
                const produceTypeDropdown = document.getElementById('produceType');
                data.data.forEach(produceType => {
                    const option = document.createElement('option');
                    option.value = produceType.id;
                    option.textContent = produceType.typeName;
                    produceTypeDropdown.appendChild(option);
                });
            });


        document.getElementById('initiateSalesForm').addEventListener('submit', async function (e) {
            e.preventDefault();
            const farmerId = localStorage.getItem("id");
            const produceTypeId = document.getElementById('produceType').value;
            const price = parseFloat(document.getElementById('price').value);
            const quantity = parseFloat(document.getElementById('quantity').value);
            const unitOfMeasurement = document.getElementById('unitOfMeasurement').value;

            const data = {
                ProduceTypeId: produceTypeId,
                Price: price,
                Quantity: quantity,
                UnitOfMeasurement: unitOfMeasurement
            };

            // fetch(`${baseUrl}api/Transaction/InitiateProducetypeSales/${farmerId}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(data)
            // })
            //     .then(response => response.json())
            //     .then(result => {
            //         if (result.status) {
            //             // alert(result.message);
            //             showSweetAlert(result)
            //         } else {
            //             // alert(result.message);
            //             showSweetAlertError(result)
            //         }
            //     });


            try {

                const apiUrl = `${baseUrl}api/Transaction/InitiateProducetypeSales/${farmerId}`;
                const token = localStorage.getItem("token");

                const response = await makeApiRequest(apiUrl, 'PUT', data, token);

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
                window.location.replace('../farmer/dashboard.html');
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
                    window.location.href = '../farmer/dashboard.html';

                });
        }









