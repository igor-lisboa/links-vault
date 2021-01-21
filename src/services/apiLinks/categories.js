import getApi from './index';

export default {
    index() {
        const api = getApi()
        return api.get('/categories')
    },
    links() {
        const api = getApi()
        return api.get('/categories/links')
    },
    store(name) {
        const api = getApi()
        return api.post('/categories', {
            name
        })
    },
    delete(categoryId) {
        const api = getApi()
        return api.delete('/categories/' + categoryId)
    }
}