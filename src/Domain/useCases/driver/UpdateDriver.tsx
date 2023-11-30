import { DriverRepositoryImpl } from "../../../Data/repositories/DriverRepository";
import { Driver } from "../../entities/Driver";

const {update} = new DriverRepositoryImpl()

export const UpdateDriverUseCase = async(driver:Driver) =>{
    return await update(driver)
}