import store from 'store'
import { checkToken } from '../api/AuthApi'

function getUserInfo() {
    const token = store.get('jwt_token')
    return checkToken(token)
}

function setUserInfo(token, userInfo) {
    store.set('jwt_token', token)
    store.set('user_info', userInfo)
}

function logout() {
    store.clearAll()
}

function getToken() {
    return 'JWT ' + store.get('jwt_token');
}

export { getUserInfo, setUserInfo, logout, getToken }
