import api from './index';

export default {
    index() {
        return api.get('/categories')
    },
    links() {
        return api.get('/categories/links')
    },
    store(name) {
        return api.post('/categories', {
            name
        })
    },
    delete(categoryId) {
        return api.delete('/categories/' + categoryId)
    }
}