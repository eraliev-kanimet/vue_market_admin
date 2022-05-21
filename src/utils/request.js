const API_BASE_URL = 'http://127.0.0.1:8000/api/';

function playWithResponsePromise(response) {
    return new Promise(function (resolve) {
        if (response.status === 401) {
            localStorage.removeItem('admin_key');
            window.location.href = '/';
        }
        if (response.status < 400) {
            response.json().then(resolve);
        } else {
            response.json().then(resolve);
        }
    });
}

export function get(url, token) {
    return fetch(API_BASE_URL + url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...token && {'Authorization': 'Bearer ' + token}
        }
    }).then(playWithResponsePromise);
}

export function post(url, data, token) {
    return fetch(API_BASE_URL + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...token && {'Authorization': 'Bearer ' + token}
        },
        body: JSON.stringify(data)
    }).then(playWithResponsePromise);
}

export function put(url, data, token) {
    return fetch(API_BASE_URL + url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...token && {'Authorization': 'Bearer ' + token}
        },
        body: JSON.stringify(data)
    }).then(playWithResponsePromise);
}

export function remove(url, token) {
    return fetch(API_BASE_URL + url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...token && {'Authorization': 'Bearer ' + token}
        }
    });
}

export function postFormData(url, data, token) {
    return fetch(API_BASE_URL + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            ...token && {'Authorization': 'Bearer ' + token}
        },
        body: data
    }).then(playWithResponsePromise);
}

export function putFormData(url, data, token) {
    data.append('_method', 'PUT');
    return fetch(API_BASE_URL + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            ...token && {'Authorization': 'Bearer ' + token}
        },
        body: data
    }).then(playWithResponsePromise);
}
