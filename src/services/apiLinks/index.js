import axios from 'axios'
import store from '../../store'


const api = axios.create({
    baseURL: process.env.VUE_APP_API_LINKS_URL,
    headers: {
        Authorization: store?.state?.user?.token
    }
})

export default api