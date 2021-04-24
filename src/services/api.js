import axios from 'axios'
require('dotenv').config()

const api = axios.create({
  baseURL: 'https://web-api-nodejs.herokuapp.com'
})

export default api
