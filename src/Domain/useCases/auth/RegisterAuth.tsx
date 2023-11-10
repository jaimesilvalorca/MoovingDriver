import {AuthRepositoryImpl} from '../../../Data/repositories/AuthRepository'
import { Driver } from '../../entities/Driver'

const {register} = new AuthRepositoryImpl();

export const RegisterAuthUseCase = async(driver:Driver) => {
    return await register(driver)
}