import {AuthRepositoryImpl} from '../../../Data/repositories/AuthRepository'
import { Driver } from '../../entities/Driver'
import * as ImagePicker from 'expo-image-picker'

const {registerWithImage} = new AuthRepositoryImpl();

export const RegisterWithImageAuthUseCase = async(driver:Driver,file:ImagePicker.ImagePickerAsset) => {
    return await registerWithImage(driver,file)
}