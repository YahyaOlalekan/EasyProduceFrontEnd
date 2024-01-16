 const baseUrl = 'http://localhost:5195/';
// const baseUrl = 'https://localhost:7044/';


function getItemFromLocalStorage(key) {
    return localStorage.getItem(key);
}

//GetWithUserId and GetAll
 async function getWithAuthorization(url, token, getById = false) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        const userId = localStorage.getItem("id");

        if (!userId) {
            console.error("No userId found in local storage.");
            return null;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const apiUrl = getById ? `${url}/${userId}` : url;
      
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error("Network response was not ok", response);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

//Get with a NonUserId
// export {getWithAuthorizationWithNonUserId};
 async function getWithAuthorizationWithNonUserId(url, token, userId, getById = false) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        if (!userId) {
            console.error("No userId found.");
            return null;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const apiUrl = getById ? `${url}/${userId}` : url;
       
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error("Network response was not ok", response);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}


/////////////////////////

// //Post and put
// export {makeApiRequest};
 async function makeApiRequest(url, method, data, token) {
    try {
        let headers = {
            'Authorization': `Bearer ${token}`
        };
        let body;

        if (method.toUpperCase() === 'GET') {

            body = undefined;
        } else if (data instanceof FormData) {

            body = data;
        } else {

            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });

        const responseData = await response.json();
        console.log('responseData:', responseData);
        return responseData;
    } catch (error) {
        console.error("Error:", error);
        throw new Error("An error occurred while making the API request.");
    }
}

// async function makeApiRequest(url, method, data, token) {
//     try {
//         const response = await fetch(url, {
//             method,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(data)
//         });

//         const responseData = await response.json();
//         console.log('responseData:', responseData);
//         return responseData;
//     } catch (error) {
//         console.error("Error:", error);
//         throw new Error("An error occurred while making the API request.");
//     }
// }


///////////////////////////

// export {deleteWithAuthorization};
 async function deleteWithAuthorization(url, token) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        const userId = localStorage.getItem("id");

        if (!userId) {
            console.error("No userId found in local storage.");
            return null;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
        };

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


/////////////////////////
///////////////////////////

// export {postFormDataWithAuthorization};
 async function postFormDataWithAuthorization(url, token, formData) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        const userId = localStorage.getItem("id");

        if (!userId) {
            console.error("No userId found in local storage.");
            return null;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        formData.append('userId', id);

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

/////////////////////////

// export {putWithAuthorizationFormData};
 async function putWithAuthorizationFormData(url, token, formData) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        const userId = localStorage.getItem("id");

        if (!userId) {
            console.error("No userId found in local storage.");
            return null;
        }

        formData.append('userId', userId);

        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        const response = await fetch(url, {
            method: 'PUT',
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



// export {putWithAuthorization};
 async function putWithAuthorization(url, token, data) {
    try {
        if (!token) {
            console.error("No token found.");
            return null;
        }

        const userId = localStorage.getItem("id");

        if (!userId) {
            console.error("No userId found in local storage.");
            return null;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const body = {
            ...data,
            userId: id,
        };

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

//(function() { /* ... */ })(); syntax creates an anonymous function and immediately invokes it
// import { getWithAuthorization, makeApiRequest, deleteWithAuthorization, getWithAuthorizationWithNonUserId, putWithAuthorization, putWithAuthorizationFormData, postFormDataWithAuthorization } from '../general/basejs';

