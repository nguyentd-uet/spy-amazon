import { get, post, put, deleteRequest } from './ApiSender'

function getAllProducts(page, sortBy, startDate = '', endDate = '') {
    return get(`product/all/${page}/${sortBy}?start=${startDate}&end=${endDate}`)
}

function getProductById(id) {
    return get('product/' + id)
}

function postProduct(payload) {
    return post('product', payload)
}

function putProduct(id, payload) {
    return put('product/' + id, payload)
}

function deleteProduct(id) {
    return deleteRequest('product/' + id)
}

export { getAllProducts, getProductById, postProduct, putProduct, deleteProduct }