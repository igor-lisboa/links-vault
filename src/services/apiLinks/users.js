import api from './index';

export default {
    async login(email, password) {
        return await api.post('/users/login', {
            email,
            password
        })
    },
    async register(email, password) {
        return await api.post('/users/register', {
            email,
            password
        })
    },
    async logout() {
        return await api.post('/users/logout')
    }
}