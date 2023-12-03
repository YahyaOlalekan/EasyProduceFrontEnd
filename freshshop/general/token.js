// Reusable function for making authenticated HTTP GET requests
async function getWithAuthorization(url, token, getById = false) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        // Decode the token to get user information
        const decodedToken = decodeJwt(token);

        if (!decodedToken || !decodedToken.userId) {
            console.error("Invalid token format or missing userId.");
            return null;
        }

        const userId = decodedToken.userId;

        // Include the token in the headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        // Modify the URL based on getById parameter
        const apiUrl = getById ? `${url}/${userId}` : url;

        // Make the HTTP GET request
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Example usage for "Get by Id":
const apiUrlById = `${baseUrl}api/Farmer/GetFarmerAlongWithApprovedProduceType`;
const tokenById = localStorage.getItem("token");

// Use the reusable function for making authenticated HTTP GET requests
getWithAuthorization(apiUrlById, tokenById, true)
    .then(data => {
        if (data) {
            // Handle the data as needed for "Get by Id"
            // console.log('data:', data);
        } else {
            // Handle the case when there is an issue with the request
            console.error("Failed to get data.");
        }
    });






//////////////////////////

// Reusable function for decoding JWT token
function decodeJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(base64));
        return decoded;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
}

////////////////////////////


// Reusable function for making authenticated HTTP POST requests
async function postWithAuthorization(url, token, data) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        // Decode the token to get user information
        const decodedToken = decodeJwt(token);

        if (!decodedToken || !decodedToken.userId) {
            console.error("Invalid token format or missing userId.");
            return null;
        }

        const userId = decodedToken.userId;

        // Include the token in the headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        // Include user ID in the request body (modify as needed)
        const body = {
            ...data,
            userId: userId,
        };

        // Make the HTTP POST request
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Example usage for HTTP POST request
const apiUrlForPost = `${baseUrl}api/Farmer/AddFarmer`; // Replace with your actual POST endpoint
const tokenForPost = localStorage.getItem("token");

// Example data to be sent in the POST request body
const postData = {
    // Include your data properties here
    name: "John Doe",
    // Add more properties as needed
};

// Use the reusable function for making authenticated HTTP POST requests
postWithAuthorization(apiUrlForPost, tokenForPost, postData)
    .then(responseData => {
        if (responseData) {
            // Handle the response data as needed
            // console.log('responseData:', responseData);
        } else {
            // Handle the case when there is an issue with the request
            console.error("Failed to post data.");
        }
    });


///////////////////////////


// Reusable function for making authenticated HTTP POST requests with FormData
async function postFormDataWithAuthorization(url, token, formData) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        // Decode the token to get user information
        const decodedToken = decodeJwt(token);

        if (!decodedToken || !decodedToken.userId) {
            console.error("Invalid token format or missing userId.");
            return null;
        }

        const userId = decodedToken.userId;

        // Include the token in the headers
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        // Append user ID to the FormData (modify as needed)
        formData.append('userId', userId);

        // Make the HTTP POST request with FormData
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Example usage for HTTP POST request with FormData
const apiUrlForPostFormData = `${baseUrl}api/Farmer/AddFarmerWithImage`; // Replace with your actual POST endpoint
const tokenForPostFormData = localStorage.getItem("token");

// Example FormData instance for file upload
const formData = new FormData();
formData.append('image', fileInput.files[0]); // Assuming fileInput is an input element of type file

// Use the reusable function for making authenticated HTTP POST requests with FormData
postFormDataWithAuthorization(apiUrlForPostFormData, tokenForPostFormData, formData)
    .then(responseData => {
        if (responseData) {
            // Handle the response data as needed
            // console.log('responseData:', responseData);
        } else {
            // Handle the case when there is an issue with the request
            console.error("Failed to post data.");
        }
    });



/////////////////////////


// Reusable function for making authenticated HTTP PUT requests
async function putWithAuthorization(url, token, data) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        // Decode the token to get user information
        const decodedToken = decodeJwt(token);

        if (!decodedToken || !decodedToken.userId) {
            console.error("Invalid token format or missing userId.");
            return null;
        }

        const userId = decodedToken.userId;

        // Include the token in the headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        // Include user ID in the request body (modify as needed)
        const body = {
            ...data,
            userId: userId,
        };

        // Make the HTTP PUT request
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Example usage for HTTP PUT request
const apiUrlForPut = `${baseUrl}api/Farmer/UpdateFarmer`; // Replace with your actual PUT endpoint
const tokenForPut = localStorage.getItem("token");

// Example data to be sent in the PUT request body
const putData = {
    // Include your data properties here
    name: "Updated John Doe",
    // Add more properties as needed
};

// Use the reusable function for making authenticated HTTP PUT requests
putWithAuthorization(apiUrlForPut, tokenForPut, putData)
    .then(responseData => {
        if (responseData) {
            // Handle the response data as needed
            // console.log('responseData:', responseData);
        } else {
            // Handle the case when there is an issue with the request
            console.error("Failed to update data.");
        }
    });



///////////////////////////////


// Reusable function for making authenticated HTTP DELETE requests
async function deleteWithAuthorization(url, token) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        // Decode the token to get user information
        const decodedToken = decodeJwt(token);

        if (!decodedToken || !decodedToken.userId) {
            console.error("Invalid token format or missing userId.");
            return null;
        }

        // Include the token in the headers
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        // Make the HTTP DELETE request
        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Example usage for HTTP DELETE request
const apiUrlForDelete = `${baseUrl}api/Farmer/DeleteFarmer/123`; // Replace with your actual DELETE endpoint (with the specific ID)
const tokenForDelete = localStorage.getItem("token");

// Use the reusable function for making authenticated HTTP DELETE requests
deleteWithAuthorization(apiUrlForDelete, tokenForDelete)
    .then(responseData => {
        if (responseData) {
            // Handle the response data as needed
            // console.log('responseData:', responseData);
        } else {
            // Handle the case when there is an issue with the request
            console.error("Failed to delete data.");
        }
    });



//////////////////////////////////


// Reusable function for making authenticated HTTP GET requests
async function getWithAuthorization(url, token) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        // Decode the token to get user information
        const decodedToken = decodeJwt(token);

        if (!decodedToken || !decodedToken.userId) {
            console.error("Invalid token format or missing userId.");
            return null;
        }

        const userId = decodedToken.userId;

        // Include the token in the headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        // Make the HTTP GET request
        const response = await fetch(`${url}/${userId}`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Example usage:
const apiUrl = `${baseUrl}api/Farmer/GetFarmerAlongWithApprovedProduceType`;
const token = localStorage.getItem("token");

// Use the reusable function for making authenticated HTTP GET requests
getWithAuthorization(apiUrl, token)
    .then(data => {
        if (data) {
            // Handle the data as needed
            // console.log('data:', data);
        } else {
            // Handle the case when there is an issue with the request
            console.error("Failed to get data.");
        }
    });


/////////////////////////////////////////////






function ViewDetails() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found.");
        return;
    }

    // Decode the token to get user information
    const decodedToken = decodeJwt(token);

    if (!decodedToken || !decodedToken.userId) {
        console.error("Invalid token format or missing userId.");
        return;
    }

    const farmerId = decodedToken.userId;

    // Include the token in the headers
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    fetch(`${baseUrl}api/Farmer/GetFarmerAlongWithApprovedProduceType/${farmerId}`, {
        method: 'GET',
        headers: headers,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // You can handle the data as needed
            // console.log('data:', data);

            // Assuming there is a function displayFarmerData
            displayFarmerData(data.data);
        })
        .catch(error => {
            console.error("Error:", error);
            displayError();
        });
}

// A simple function to decode the JWT token
function decodeJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(base64));
        return decoded;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
}




// const token = localStorage.getItem("token");
// fetch(`${baseUrl}api/Customer/GetCustomerById/`,
//     {
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${token}`
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Assuming the returned data is an object with customer attributes
//         displayCustomerData(data.data);
//     })
//     .catch(error => {
//         console.error("Error:", error);
//         // Display an error message to the user
//         displayError();
//     });




// const token = localStorage.getItem("token");

// fetch(`${baseUrl}api/SomeResource/${resourceId}`, {
//   method: "DELETE",
//   headers: {
//     "Authorization": `Bearer ${token}`
//   }
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   // Successful DELETE requests often have no response body
//   console.log("Resource deleted successfully");
// })
// .catch(error => {
//   console.error("Error:", error);
//   // Handle the error
// });





//     const token = localStorage.getItem("token");
// const dataToSend = {
//   // Add the data you want to send in the request body
//   key1: "value1",
//   key2: "value2"
// };

// fetch(`${baseUrl}api/SomeResource`, {
//   method: "POST",
//   headers: {
//     "Authorization": `Bearer ${token}`,
//     "Content-Type": "application/json" // Specify the content type of the request body
//   },
//   body: JSON.stringify(dataToSend) // Convert data to JSON string
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// })
// .then(data => {
//   // Handle the response data
//   console.log(data);
// })
// .catch(error => {
//   console.error("Error:", error);
//   // Handle the error
// });




// const token = localStorage.getItem("token");
// const dataToUpdate = {
//   // Add the data you want to send in the request body for the update
//   key1: "updatedValue1",
//   key2: "updatedValue2"
// };

// fetch(`${baseUrl}api/SomeResource/${resourceId}`, {
//   method: "PUT",
//   headers: {
//     "Authorization": `Bearer ${token`,
//     "Content-Type": "application/json" // Specify the content type of the request body
//   },
//   body: JSON.stringify(dataToUpdate) // Convert updated data to JSON string
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// })
// .then(data => {
//   // Handle the response data
//   console.log(data);
// })
// .catch(error => {
//   console.error("Error:", error);
//   // Handle the error
// });


