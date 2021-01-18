import api from './index';

export default {
    login(email, password) {
        return api.post('/users/login', {
            email,
            password
        })
    },
    register(email, password) {
        return api.post('/users/register', {
            email,
            password
        })
    },
    logout() {
        return api.post('/users/logout')
    }
}