import api from './index';

export default {
    store(categoryId, link) {
        return api.post('/links', {
            category_id: categoryId,
            link
        })
    },
    delete(linkId) {
        return api.delete('/links/' + linkId)
    }
}