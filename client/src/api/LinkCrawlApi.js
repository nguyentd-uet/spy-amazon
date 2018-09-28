import { get, post, put, deleteRequest } from './ApiSender'

function getAllLink() {
    return get(`links`)
}

function getLinkById(id) {
    return get('links/' + id)
}

function postLink(payload) {
    return post('links', payload)
}

function putLink(id, payload) {
    console.log(payload)
    return put('links/' + id, payload)
}

function deleteLink(id) {
    return deleteRequest('links/' + id)
}

export { getAllLink, getLinkById, postLink, putLink, deleteLink }