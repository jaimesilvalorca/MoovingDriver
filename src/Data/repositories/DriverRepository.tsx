import * as ImagePicker from 'expo-image-picker'
import { Driver } from "../../Domain/entities/Driver";
import { DriverRepository } from "../../Domain/repositories/DriverRepository";
import { ReponseAPIMooving } from "../sources/remote/models/ResponseApiMooving";
import { AxiosError } from "axios";
import { ApiMooving, ApiMoovingForImage } from "../sources/remote/api/ApiMooving";
import mime from "mime";

export class DriverRepositoryImpl implements DriverRepository {

    async update(driver: Driver): Promise<ReponseAPIMooving> {

        try {
            const response = await ApiMooving.put<ReponseAPIMooving>('/drivers/updatewithoutimage', driver)
            return Promise.resolve(response.data)

        } catch (error) {
            let err = (error as AxiosError)
            console.log('ERROR: ', JSON.stringify(err.response?.data))
            const apiError: ReponseAPIMooving = JSON.parse(JSON.stringify(err.response?.data))
            return Promise.resolve(apiError)
        }



    }

    async updateWithImage(driver: Driver, file: ImagePicker.ImagePickerAsset): Promise<ReponseAPIMooving> {

        try {
            const data = new FormData();

            // @ts-ignore
            data.append('image', {
              uri: file.uri,
              name: file.uri.split('/').pop(),
              type: mime.getType(file.uri),
            });
            
            
            Object.keys(driver).forEach((key) => {
            // @ts-ignore
              data.append(key, driver[key]);
            });
            console.log(data)
            const response = await ApiMoovingForImage.put<ReponseAPIMooving>('/drivers/updatewithimage',data)
            return Promise.resolve(response.data)

            
        } catch (error) {
            let err = (error as AxiosError)
            console.log(err)
            console.log('ERROR: al responder', JSON.stringify(err.response?.data))
            const apiError:ReponseAPIMooving = JSON.parse(JSON.stringify(err.response?.data))
            return Promise.resolve(apiError)
        }


    }

}