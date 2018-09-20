import axios from 'axios';
import { getToken } from '../helpers/AuthHelper'

const BASE_URL = 'https://young-wildwood-22986.herokuapp.com/api/'

function get(route, access_token = getToken()) {
    let headers = {
        'authorization': access_token
    };

    return axios.get(BASE_URL + route, {headers})
        .then(handleResponse);
};

function post(route, payload, access_token = getToken()) {
    let headers = {
        'authorization': access_token
    };
console.log(access_token)
    return axios.post(BASE_URL + route, payload, {headers})
        .then(handleResponse);
};

function put(route, payload, access_token = getToken()) {
    let headers = {
        'authorization': access_token
    };

    return axios.put(BASE_URL + route, payload, {headers})
        .then(handleResponse);
};

function deleteRequest(route, access_token = getToken()) {
    let headers = {
        'authorization': access_token
    };

    return axios.delete(BASE_URL + route, {headers})
        .then(handleResponse);
};

function handleResponse(res) {
    if (!res.data) {
        return Promise.reject(new Error('Something went wrong'));
    } else {
        if (res.data.success) {
            return Promise.resolve(res.data);
        } else {
            return Promise.reject(res.data.message);
        }
    }
}

function getWithoutAuth(route) {
    return axios.get(BASE_URL + route)
        .then(handleResponse);
};

function postWithoutAuth(route, payload) {
    return axios.post(BASE_URL + route, payload)
        .then(handleResponse);
};

export { get, post, put, deleteRequest, getWithoutAuth, postWithoutAuth }
