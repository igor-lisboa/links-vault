import getApi from './index';

export default {
    login(email, password) {
        return getApi().post('/users/login', {
            email,
            password
        })
    },
    update(email, password = null) {
        let data = {}
        if (password === null || password === undefined || password === "") {
            data = {
                email
            }
        } else {
            data = {
                email,
                password
            }
        }
        return getApi().post('/users/update', data)
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