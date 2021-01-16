import api from './index';

export default {
    async store(categoryId, link) {
        return await api.post('/links', {
            category_id: categoryId,
            link
        })
    },
    async delete(linkId) {
        return await api.delete('/links/' + linkId)
    }
}