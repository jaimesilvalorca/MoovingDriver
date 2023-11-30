import { DriverRepositoryImpl } from "../../../Data/repositories/DriverRepository";
import { Driver } from "../../entities/Driver";
import * as ImagePicker from 'expo-image-picker'

const {updateWithImage} = new DriverRepositoryImpl()

export const UpdateWithImageDriverUseCase = async(driver:Driver, file:ImagePicker.ImagePickerAsset) =>{
    return await updateWithImage(driver,file)
}