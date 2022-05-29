import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export function get(url, token) {
    return axios({
        method: 'GET',
        url: API_BASE_URL + url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...token && {'Authorization': 'Bearer ' + token}
        }
    });
}

export function post(url, data, token) {
    return axios({
        method: 'POST',
        url: API_BASE_URL + url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...token && {'Authorization': 'Bearer ' + token}
        },
        data: data
    });
}

export function put(url, data, token) {
    data.append('_method', 'put');
    return axios({
        method: 'POST',
        url: API_BASE_URL + url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...token && {'Authorization': 'Bearer ' + token}
        },
        data: data
    });
}

export function remove(url, token) {
    return axios({
        method: 'DELETE',
        url: API_BASE_URL + url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...token && {'Authorization': 'Bearer ' + token}
        }
    });
}