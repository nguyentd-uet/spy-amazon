import { get, post, put, deleteRequest } from './ApiSender'

function getAllProducts(page, sortBy, startDate = '', endDate = '', keywords= []) {
    let keywordQuery = ''
    if(Array.isArray(keywords) && keywords.length > 0) {
        keywords.map(item => {
            return keywordQuery += `&keywords[]=${item}`
        })
    }
    return get(`products?page=${page}&sort=${sortBy}&start=${startDate}&end=${endDate}${keywordQuery}`)
}

function getProductById(id) {
    return get('products/' + id)
}

function postProduct(payload) {
    return post('products', payload)
}

function putProduct(id, payload) {
    return put('products/' + id, payload)
}

function deleteProduct(id) {
    return deleteRequest('products/' + id)
}

export { getAllProducts, getProductById, postProduct, putProduct, deleteProduct }