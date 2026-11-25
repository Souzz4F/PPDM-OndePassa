import axios from 'axios'

const backendClient = axios.create({
    baseURL: 'http://192.168.0.87:3000',
})

export default backendClient