
        function showOTPContainer() {
            const otpContainer = document.getElementById('otpContainer');
            otpContainer.style.display = 'block';
        }

        async function getConfirmedInitiatedSales() {
            // const response = await fetch(`${baseUrl}api/Transaction/GetAllConfirmedProducetypeSales`);
            // if (response.ok) {
            //     const sales = await response.json();

            const tokenById = localStorage.getItem("token");
            const apiUrlById = `${baseUrl}api/Transaction/GetAllConfirmedProducetypeSales`;

            const sales = await getWithAuthorization(apiUrlById, tokenById, false)
                const salesList = document.getElementById('confirmedSalesList');

                if (!salesList) {
                    console.error("Element with ID 'confirmedSalesList' not found.");
                    return;
                }

                salesList.innerHTML = ''; 

                if (sales.data && sales.data.length > 0) {
                    sales.data.forEach((sale, index) => {
                        const saleItem = document.createElement('div');
                        saleItem.className = 'sale-item'; //Note: Apply the sale-item class
                        saleItem.innerHTML = `
                    <p><strong>Price:</strong> ${sale.price}</p>
                    <p><strong>Quantity:</strong> ${sale.quantity}</p>
                    <p><strong>Unit Of Measurement:</strong> ${sale.unitOfMeasurement}</p>
                    <p><strong>Total Amount:</strong> ${sale.totalAmount}</p>
                    <p><strong>Transaction Number:</strong> ${sale.transactionNum}</p>
                    <p><strong>Farmer Registration Number:</strong> ${sale.registrationNumber}</p>
                   
                    <button class="btn btn-outline-success mx-2 sale-button" id="${sale.id}" onclick="MakePayment(this.id)"> </i> Pay </button>
                `;

                        if (index % 2 === 0) {
                            saleItem.style.backgroundColor = '#fff';
                        }

                        salesList.appendChild(saleItem);
                    });
                } else {
                    salesList.innerHTML = '<p>No Confirmed initiated sales found.</p>';
                }
            // }
        }



        function MakePayment(id) {
            fetch(`${baseUrl}api/Transaction/InitiatePayment/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status) {
                        // Assuming "transferCode" is a property in the response data
                        const transferCode = data.data;

                        showOTPContainer();

                        generateOTP(transferCode);
                    } else {
                        showSweetAlertError(data);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("An error occurred while verifying the transaction.");
                });
        }

       
       
        function generateOTP(transferCode) {
            const otpInput = document.getElementById('otpInput');
            const submitOtpButton = document.getElementById('submitOtp');

            otpInput.style.display = 'block';
            submitOtpButton.style.display = 'block';

            submitOtpButton.addEventListener('click', () => {
                const otp = otpInput.value;

                finalizePayment(transferCode, otp);
            });
        }

        function finalizePayment(transferCode, otp) {
            fetch(`${baseUrl}api/Transaction/FinalizePayment/${transferCode}?otp=${otp}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status) {
                        showSweetAlert(data);
                    } else {
                        showSweetAlertError(data);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("An error occurred while finalizing the payment.");
                });
        }




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
                window.location.href = '../transaction/confirmedSales.html';

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
                    window.location.href = '../transaction/confirmedSales.html';

                });
        }

        getConfirmedInitiatedSales();

