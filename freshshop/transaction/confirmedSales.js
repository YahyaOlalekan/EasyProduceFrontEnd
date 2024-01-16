
async function getConfirmedInitiatedSales() {

    const tokenById = localStorage.getItem("token");
    const apiUrlById = `${baseUrl}api/Transaction/GetAllConfirmedProducetypeSales`;

    const sales = await getWithAuthorization(apiUrlById, tokenById, false)
    const salesList = document.getElementById('confirmedSalesList');
    salesList.innerHTML = '';

    if (sales.data && sales.data.length > 0) {
        sales.data.forEach((sale, index) => {
            const saleItem = document.createElement('div');
            saleItem.className = 'sale-item';
            saleItem.innerHTML = `
                    <p><strong>Price:</strong> #${sale.price}</p>
                    <p><strong>Quantity:</strong> ${sale.quantity}</p>
                    <p><strong>Unit Of Measurement:</strong> ${sale.unitOfMeasurement}</p>
                    <p><strong>Total Amount:</strong> #${sale.totalAmount}</p>
                    <p><strong>Transaction Number:</strong> ${sale.transactionNum}</p>
                    <p><strong>Farmer Registration Number:</strong> ${sale.registrationNumber}</p>
                   
                    <button class="btn btn-outline-success mx-2 sale-button" id="${sale.id}" onclick="GenerateReceipt(this.id)"> </i> Generate Receipt </button>
                `;

            if (index % 2 === 0) {
                saleItem.style.backgroundColor = '#fff';
            }

            salesList.appendChild(saleItem);
        });
    } else {
        salesList.innerHTML = '<p>No Confirmed initiated sales found.</p>';
    }

}



function GenerateReceipt(id) {
    fetch(`${baseUrl}api/Transaction/GenerateReceipt/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.status) {

                displayReceipt(data.data);
                // showSweetAlert(data)

            } else {
                showSweetAlertError(data);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while verifying the transaction.");
        });
}


function displayReceipt(receiptData) {
    const receiptDetails = document.getElementById('receiptDetails');
    receiptDetails.innerHTML = `
                <p><strong>Transaction Number:</strong> ${receiptData.transactionNum}</p>
                <p><strong>Price:</strong> #${receiptData.price}</p>
                <p><strong>Quantity:</strong> ${receiptData.quantity}</p>
                <p><strong>Total Amount:</strong> #${receiptData.totalAmount}</p>
                <p><strong>Unit Of Measurement:</strong> ${receiptData.unitOfMeasurement}</p>
                <p><strong>Farmer Registration Number:</strong> ${receiptData.registrationNumber}</p>
                <p><strong>Account Name:</strong> ${receiptData.accountName}</p>
                <p><strong>Bank Name:</strong> ${receiptData.bankName}</p>
                <p><strong>Account Number:</strong> ${receiptData.accountNumber}</p>
                <p><strong>Date Created:</strong> ${receiptData.dateCreated}</p>
            `;

    $('#receiptModal').modal('show');
}


$(document).on('click', '#closeModalBtn', function () {
    $('#receiptModal').modal('hide');
});


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
        window.location.href = '../manager/dashboard.html';

    });
}

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
            window.location.href = '../manager/dashboard.html';

        });
}

getConfirmedInitiatedSales();

