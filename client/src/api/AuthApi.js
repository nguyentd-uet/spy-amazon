import { postWithoutAuth } from './ApiSender'

function registerUser(payload) {
    return postWithoutAuth('users/register', payload)
}

function login(payload) {
    return postWithoutAuth('users/login', payload)
}

function checkToken(token) {
    return postWithoutAuth('users/checkToken', {token})
}

export { registerUser, login, checkToken }