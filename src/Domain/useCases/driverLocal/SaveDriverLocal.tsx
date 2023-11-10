import { DriverLocalRepositoryImpl } from "../../../Data/repositories/DriverLocalRepository";
import { Driver } from "../../entities/Driver";

const {save} = new DriverLocalRepositoryImpl()

export const SaveDriverLocalUseCase = async (driver:Driver) =>{

    return await save(driver)

}