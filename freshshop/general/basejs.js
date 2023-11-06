const baseUrl = 'http://localhost:5195/';
// const baseUrl = 'https://localhost:7044/';



/* <script src="../general/basejs.js"></script> */

    // ${baseUrl}

// fetch(`${baseUrl}api/Customer/GetCustomerById/`,




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


