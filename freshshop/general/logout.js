
        document.getElementById('logoutButton').addEventListener('click', function() {
        // 1. Clear the user's token from local storage or cookies
        localStorage.removeItem('token');
        // 2. Redirect to the login page (or another page)
        // window.location.href = './login.html'; 
        window.location.href = '../index.html'; 
        // 3. (Optional) Call a server-side endpoint to invalidate the session
        // Example fetch request here.
    });
    
    
    // fetch('/api/logout', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${token}`, // Include the token for authentication
    //         'Content-Type': 'application/json',
    //     },
    // })
    // .then(response => {
    //     if (response.ok) {
    //         // Server-side logout was successful
    //         // Redirect or update UI as needed
    //     } else {
    //         // Handle errors if necessary
    //     }
    // })
    // .catch(error => {
    //     // Handle network errors
    // });
    
 