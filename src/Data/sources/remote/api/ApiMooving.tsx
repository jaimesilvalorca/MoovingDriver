import axios from 'axios'

const ApiMooving = axios.create({
    baseURL: 'http://45.7.231.169:3000/api',
    headers:{
        'Content-Type': 'application/json'
    }
})

const ApiMoovingForImage = axios.create({
    baseURL: 'http://45.7.231.169:3000/api',
    headers:{
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json'
    }
})

export {ApiMooving,ApiMoovingForImage}