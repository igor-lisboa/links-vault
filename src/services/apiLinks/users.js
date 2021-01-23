import getApi from './index';

export default {
    login(email, password) {
        return getApi().post('/users/login', {
            email,
            password
        })
    },
    update(email, password) {
        return getApi().post('/users/update', {
            email,
            password
        })
    },
    register(email, password) {
        return getApi().post('/users/register', {
            email,
            password
        })
    },
    logout() {
        return getApi().post('/users/logout')
    }
}