import { get, post, put, deleteRequest } from './ApiSender'

function getAllLink() {
    return get(`link/all/get`)
}

function getLinkById(id) {
    return get('link/' + id)
}

function postLink(payload) {
    return post('link', payload)
}

function putLink(id, payload) {
    console.log(payload)
    return put('link/' + id, payload)
}

function deleteLink(id) {
    return deleteRequest('link/' + id)
}

export { getAllLink, getLinkById, postLink, putLink, deleteLink }