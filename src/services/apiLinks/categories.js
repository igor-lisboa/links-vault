import api from './index';

export default {
    async index() {
        return await api.get('/categories')
    },
    async links() {
        return await api.get('/categories/links')
    },
    async store(name) {
        return await api.post('/categories', {
            name
        })
    },
    async delete(categoryId) {
        return await api.delete('/categories/' + categoryId)
    }
}