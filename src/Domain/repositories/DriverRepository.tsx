import * as ImagePicker from 'expo-image-picker'
import { ReponseAPIMooving } from "../../Data/sources/remote/models/ResponseApiMooving";
import { Driver } from "../entities/Driver";

export interface DriverRepository{

    update(driver:Driver):Promise<ReponseAPIMooving>
    updateWithImage(driver:Driver,file:ImagePicker.ImagePickerAsset):Promise<ReponseAPIMooving>

}