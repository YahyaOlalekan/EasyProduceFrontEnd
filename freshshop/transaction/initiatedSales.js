
        async function getInitiatedSales() {
            // const response = await fetch(`${baseUrl}api/Transaction/GetAllInitiatedProducetypeSales`);
            // if (response.ok) {
            //     const sales = await response.json();

            const tokenById = localStorage.getItem("token");
            const apiUrlById = `${baseUrl}api/Transaction/GetAllInitiatedProducetypeSales`;

            const sales = await getWithAuthorization(apiUrlById, tokenById, false)
            console.log('Sales:', sales);
            const salesList = document.getElementById('salesList');
            salesList.innerHTML = '';

            if (sales.data && sales.data.length > 0) {
                sales.data.forEach((sale, index) => {

                    console.log('SalesData:', sales.data);
                    const saleItem = document.createElement('div');
                    saleItem.className = 'sale-item';
                    saleItem.innerHTML = `
                    <p><strong>Price:</strong> ${sale.price}</p>
                    <p><strong>Quantity:</strong> ${sale.quantity}</p>
                    <p><strong>Unit Of Measurement:</strong> ${sale.unitOfMeasurement}</p>
                    <p><strong>Total Amount:</strong> ${sale.totalAmount}</p>
                    <p><strong>Transaction Number:</strong> ${sale.transactionNum}</p>
                    <p><strong>Farmer Registration Number:</strong> ${sale.registrationNumber}</p>
                    <button class="btn btn-outline-info mx-2 sale-button" id="${sale.id}" onclick="VerifyInitiatedProducetypeSales(this.id, 2)"><i class="fa fa-check-circle" aria-hidden="true"></i> Confirm</button>
                    <button class="btn btn-outline-danger mx-2 sale-button" id="${sale.id}" onclick="VerifyInitiatedProducetypeSales(this.id, 3)"> <i class="fa fa-times-circle" aria-hidden="true"></i> Decline </button>
                `;

                    if (index % 2 === 0) {
                        saleItem.style.backgroundColor = '#fff';
                    }

                    salesList.appendChild(saleItem);
                });
            } else {
                salesList.innerHTML = '<p>No initiated sales found.</p>';
            }
            // }
        }



        async function VerifyInitiatedProducetypeSales(id, transactionStatus) {
            const verificationData = {
                Id: id,
                TransactionStatus: transactionStatus
            };

            try {

                const apiUrl = `${baseUrl}api/Transaction/VerifyInitiatedProducetypeSales`;
                const token = localStorage.getItem("token");

                const response = await makeApiRequest(apiUrl, 'POST', verificationData, token);

                if (response.status) {
                    showSweetAlertForInitiatedSales(response);
                } else {
                    showSweetAlertErrorForInitiatedSales(response);
                }
            } catch (error) {
                alert(error.message);
            }

           
        }

        function showSweetAlertForInitiatedSales(response) {
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
                window.location.href = '../manager/dashboard.html';

            });
        }

        function showSweetAlertErrorForInitiatedSales(response) {
            Swal.fire({
                text: response.message,
                // html: `<div>${response.message}</div>`,
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
                    window.location.href = '../manager/dashboard.html';

                });
        }

        getInitiatedSales();






   