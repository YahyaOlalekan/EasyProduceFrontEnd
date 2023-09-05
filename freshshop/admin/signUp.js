let form = document.querySelector("#signup");
form.addEventListener("submit", (a) => {
    a.preventDefault()

    var formData = new FormData(form);

    fetch("https://localhost:7141/api/Customer/SignUp",
    {
        method: "POST",
        body: formData,
    })
        .then(res => res.json())
        .then(response => console.log(response))
           
})