import axios, { AxiosHeaders } from 'axios'
import { LocalStorage } from '../../local/LocalStorage'
import { Driver } from '../../../../Domain/entities/Driver'

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

ApiMooving.interceptors.request.use(
    async (config) => {
      const data = await LocalStorage().getItem('driver');
      if (data) {
        const driver: Driver = JSON.parse(data as any);
        console.log('Token:', driver?.session_token);
        config.headers['Authorization'] = `${driver?.session_token}`;
      }
  
      return config;
    }
  );

ApiMoovingForImage.interceptors.request.use(
    async (config) => {
        const data = await LocalStorage().getItem('driver');
        if (data) {
            const driver: Driver = JSON.parse(data as any);
            config.headers['Authorization'] = `${driver?.session_token}`;
        }

        return config;
    }
);

export {ApiMooving,ApiMoovingForImage}