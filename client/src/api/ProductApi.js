import { get, post, put, deleteRequest } from './ApiSender'

function getAllProducts(page, sortBy, startDate = '', endDate = '', keywords= []) {
    let keywordQuery = ''
    if(Array.isArray(keywords) && keywords.length > 0) {
        keywords.map(item => {
            return keywordQuery += `&keywords[]=${item}`
        })
    }
    return get(`product/all/get/${page}/${sortBy}?start=${startDate}&end=${endDate}${keywordQuery}`)
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