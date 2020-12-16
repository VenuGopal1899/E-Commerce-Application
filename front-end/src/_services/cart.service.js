import config from 'config';
import { authHeader } from '../_helpers';

export const cartService = {
    addItem,
    removeItem,
    getAll,
    checkout
};

function addItem(item){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };
    return fetch(`${config.apiUrl}/cart/addItem`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/cart`, requestOptions).then(handleResponse);
}

function removeItem(username, id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, id })
    };

    return fetch(`${config.apiUrl}/cart/deleteItem`, requestOptions).then(handleResponse);
}

function checkout(){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/cart`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}