import axios from 'axios'
import store from '../../store'

export default () => {
    const userToken = store.state?.user?.token
    const api = axios.create({
        baseURL: process.env.VUE_APP_API_LINKS_URL,
        headers: {
            Authorization: userToken
        }
    })
    return api
}
