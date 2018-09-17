import { postWithoutAuth } from './ApiSender'

function registerUser(payload) {
    return postWithoutAuth('user/register', payload)
}

function login(payload) {
    return postWithoutAuth('user/login', payload)
}

function checkToken(token) {
    return postWithoutAuth('user/checkToken', {token})
}

export { registerUser, login, checkToken }