
function LoadProduce() {
            fetch(`${baseUrl}api/ProduceType/GetAllProduceType`)
                .then(response => response.json())
                .then(res => {
                    const selectElement = document.getElementById('produceTypesSelect');
                    res.data.forEach(option => {
                        // Create an <option> element for each produce type
                        const optionElement = document.createElement('option');
                        optionElement.value = option.id;
                        optionElement.textContent = option.typeName;
                        // Append the option to the select element
                        selectElement.appendChild(optionElement);
                    });

                    // Initialize Select2 for the dropdown
                    $('#produceTypesSelect').select2();
                });
        }

        document.querySelector('#farmer-form').addEventListener('submit', e => {
            e.preventDefault();
            let formElement = document.querySelector('#farmer-form');
            const formData = new FormData(formElement);
            const selectedProduceTypes = $('#produceTypesSelect').val();
            formData.delete('ProduceTypes');
            selectedProduceTypes.forEach(type => {
                formData.append('ProduceTypes', type);
            });
            fetch(`${baseUrl}api/Farmer/RegisterFarmer`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())

                .then(data => {
                    if (data.status === 400 && data.errors) {
                        //  validation errors
                        showSweetAlertValidationErrors(data)

                    } else if (data.status === 200) {
                        // success
                        showSweetAlert(data.message);

                    } else {
                        // other errors
                        showSweetAlertError(data.message);
                    }
                })

                .catch(error => {
                    console.error('Error:', error);
                });
        });



        function loadBanks() {
            const url = `${baseUrl}api/Farmer/GetAllBanks`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

                // const url = 'https://api.paystack.co/bank';
                // const authorization = 'Bearer sk_test_bcd26e03b2282ddf4f2affe2c8ff796c91b86ba5';

                // fetch(url, {
                //     method: 'GET',
                //     headers: {
                //         'Authorization': authorization
                //     }
                // })

                // .then(response => response.json())

                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })

                .then(data => {
                    console.log('data', data)

                    const bankSelect = document.getElementById('bankCode');
                    const selectedBankNameInput = document.getElementById('selectedBankName');

                    while (bankSelect.options.length > 1) {
                        bankSelect.remove(1);
                    }

                    data.data.forEach(bank => {
                        const option = document.createElement('option');
                        option.value = bank.code;
                        option.textContent = bank.name;
                        bankSelect.appendChild(option);
                    });

                    // Add an event listener to update the hidden input with the selected bank name
                    bankSelect.addEventListener('change', function () {
                        const selectedIndex = bankSelect.selectedIndex;
                        const selectedBank = data.data[selectedIndex - 1]; // Subtract 1 because of the "All" option
                        if (selectedBank) {
                            selectedBankNameInput.value = selectedBank.name;
                        } else {
                            selectedBankNameInput.value = ''; // No bank selected
                        }
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }




        document.addEventListener('DOMContentLoaded', function () {
            loadBanks();
        });


        async function verifyAccountOnBankSelection() {
            const bankCode = document.getElementById('bankCode').value;
            const accountNumberInput = document.getElementById('accountNumber');

            if (bankCode) {
                accountNumberInput.removeAttribute('disabled');
                await verifyAccount();

            } else {
                accountNumberInput.setAttribute('disabled', true);
            }
        }


        async function verifyAccount() {
            const accountNumber = document.getElementById('accountNumber').value;
            const bankCode = document.getElementById('bankCode').value;
            const accountNameInput = document.getElementById('accountName');

            if (!accountNumber || !bankCode) {
                alert('Please enter the account number.');
                return;
            }


            const response = await fetch(`${baseUrl}api/Farmer/VerifyAccountNumber?accountNumber=${accountNumber}&bankCode=${bankCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // const response = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
            //     method: 'GET',
            //     headers: {
            //         'Authorization': 'Bearer sk_test_bcd26e03b2282ddf4f2affe2c8ff796c91b86ba5'
            //     }
            // });

            if (response.ok) {
                const result = await response.json();

                if (result.status === true) {
                    // Set the value of the "accountName" input field to the obtained name
                    accountNameInput.value = result.data.account_name;
                    accountNameInput.removeAttribute('disabled'); // Enable the input field
                    accountNameInput.blur(); // Trigger the onblur event to validate the input
                    alert('Account details verified successfully.');
                } else {
                    alert('Account verification failed. Please check the account number and bank code.');
                }
            } else {
                alert('Account verification request failed.');
            }
        }







        function showSweetAlertValidationErrors(data) {
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
                window.location.href = './farmer-registration.html';

            });
        }


        // Function to show success SweetAlert2 modal
        function showSweetAlert(message) {
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
                window.location.href = '../general/login.html';
                // window.location.replace('../general/login.html');

            });
        }


        // Function to show error SweetAlert2 modal with status message
        function showSweetAlertError(errorMessage) {
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
            })
                .then((result) => {

                    if (result.value) {
                        window.location.href = './farmer-registration.html';
                    }


                });
        };

        function validateInput(inputElement, errorElementId) {
            // Get the input value
            var inputValue = inputElement.value;
            var errorElement = document.getElementById(errorElementId);

            if (inputValue.length < 3) {
                errorElement.textContent = "Input must be at least 3 characters long";
                inputElement.focus(); // Keep focus on the input field
            } else {
                errorElement.textContent = ""; // Clear any previous error message
            }
        }

