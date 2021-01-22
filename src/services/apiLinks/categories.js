import getApi from './index';

export default {
    index() {
        return getApi().get('/categories')
    },
    links() {
        return getApi().get('/categories/links')
    },
    store(name) {
        return getApi().post('/categories', {
            name
        })
    },
    delete(categoryId) {
        return getApi().delete('/categories/' + categoryId)
    }
}