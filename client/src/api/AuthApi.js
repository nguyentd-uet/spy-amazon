import { postWithoutAuth } from './ApiSender'

function registerUser(payload) {
    return postWithoutAuth('user/register', payload)
}

function login(payload) {
    return postWithoutAuth('user/login', payload)
}

export { registerUser, login }