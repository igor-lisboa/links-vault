import getApi from './index';

export default {
    store(categoryId, link, name = null) {
        return getApi().post('/links', {
            category_id: categoryId,
            link,
            name
        })
    },
    delete(linkId) {
        return getApi().delete('/links/' + linkId)
    }
}