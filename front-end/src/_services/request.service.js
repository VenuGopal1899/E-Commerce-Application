import config from 'config';
import { authHeader } from '../_helpers';
import API_URL from '../assets/API_URL';

export const requestService = {
    addRequest,
    getAll,
    approveRequest,
    rejectRequest
};

function addRequest(r){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(r)
    };
    return fetch(`http://${API_URL}/requests/addRequest`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://${API_URL}/requests`, requestOptions).then(handleResponse);
}

function approveRequest(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://${API_URL}/requests/approve/${id}`, requestOptions).then(handleResponse);
}

function rejectRequest(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://${API_URL}/requests/reject/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}