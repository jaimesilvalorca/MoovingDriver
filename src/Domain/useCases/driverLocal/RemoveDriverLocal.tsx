import { DriverLocalRepositoryImpl } from "../../../Data/repositories/DriverLocalRepository";

const {remove} = new DriverLocalRepositoryImpl()

export const RemoveDriverLocalUseCase = async () =>{

    return await remove();

}