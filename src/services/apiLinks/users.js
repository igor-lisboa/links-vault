import getApi from './index';

export default {
    login(email, password) {
        const api = getApi()
        return api.post('/users/login', {
            email,
            password
        })
    },
    register(email, password) {
        const api = getApi()
        return api.post('/users/register', {
            email,
            password
        })
    },
    logout() {
        const api = getApi()
        return api.post('/users/logout')
    }
}