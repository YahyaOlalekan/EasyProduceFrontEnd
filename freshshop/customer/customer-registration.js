document.getElementById('submitButton').addEventListener('click', function (e) {
    e.preventDefault();
    const formElement = document.getElementById('myForm');
    const formData = new FormData(formElement);
    // console.log(formData.get('LastName'));
    if (formData.get('password') === formData.get('confirmpassword')) {
        console.log("Password match");
        //submit to backend
        fetch('http://localhost:5195/api/Customer/CustomerRegistration', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (data.status) {
                    // console.log(data.status);
                    window.alert(data.message)
                    // Registration successful, redirect to the login page
                    // location.href = "C:\Users\USER PC\Desktop\EasyProduceFrontEnd\freshshop\login.html";
                    window.location.replace('../login.html');
                } else {
                    document.getElementById('error').innerHTML = data.message;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }
    else {
        document.getElementById('error').innerHTML = "password doesn't match please refill"
    }

});