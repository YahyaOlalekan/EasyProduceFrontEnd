
document.querySelector('#loginform').addEventListener('submit', e => {
    e.preventDefault();
    let formElement = document.querySelector('#loginform');
    const formData = new FormData(formElement);
    console.log(formData.get('email'));
    fetch('http://localhost:5195/api/User/Login', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.status) {
                alert(data.message)
                // console.log(data.status);
                // // Registration successful, redirect to the login page
                // // location.href = "C:\Users\USER PC\Desktop\EasyProduceFrontEnd\freshshop\login.html";
                // window.location.replace('.');
                // console.log(data)

                // localStorage.setItem("customerId", data.id)
                // localStorage.setItem("farmerId", data.id)
                // localStorage.setItem("managerId", data.id)
                localStorage.setItem("id", data.id)

                if (data.data.roleName == "customer") {
                    // location.href = "./customer/getAllCustomers.html";
                    location.href = "./customer/customer-dashboard.html";
                }
                 else if (data.data.roleName == "admin") {
                    location.href = "./admin/dashboard.html";
                }
                 else if (data.data.roleName == "manager") {
                    location.href = "./manager/dashboard.html";
                }
                 else if (data.data.roleName == "farmer") {
                    location.href = "./farmer/dashboard.html";
                } 
                else {
                    window.alert("Unknown role: " + data.data.role);
                }
            } else {
                document.getElementById('error').innerHTML = data.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

