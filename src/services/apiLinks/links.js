import getApi from './index';

export default {
    store(categoryId, link) {
        const api = getApi()
        return api.post('/links', {
            category_id: categoryId,
            link
        })
    },
    delete(linkId) {
        const api = getApi()
        return api.delete('/links/' + linkId)
    }
}