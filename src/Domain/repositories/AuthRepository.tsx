import { ReponseAPIMooving } from "../../Data/sources/remote/models/ResponseApiMooving";
import { Driver } from "../entities/Driver";
import * as ImagePicker from 'expo-image-picker'


export interface AuthRepository{

    register(driver:Driver): Promise<ReponseAPIMooving>
    login(email:string,password:string):Promise<ReponseAPIMooving>
    registerWithImage(driver:Driver,file:ImagePicker.ImagePickerAsset):Promise<ReponseAPIMooving>
}