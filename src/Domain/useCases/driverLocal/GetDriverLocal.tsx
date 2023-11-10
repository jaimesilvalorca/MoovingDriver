import { DriverLocalRepositoryImpl } from "../../../Data/repositories/DriverLocalRepository";

const {getDriver} = new DriverLocalRepositoryImpl()

export const getDriverLocalUseCase = async () =>{

    return await getDriver();

}