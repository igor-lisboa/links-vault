import getApi from './index';

export default {
    store(categoryId, link) {
        return getApi().post('/links', {
            category_id: categoryId,
            link
        })
    },
    delete(linkId) {
        return getApi().delete('/links/' + linkId)
    }
}