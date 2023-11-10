import { Driver } from "../../Domain/entities/Driver";
import { DriverSessionRepository } from "../../Domain/repositories/DriverSessionRepository";
import { LocalStorage } from "../sources/local/LocalStorage";

export class DriverLocalRepositoryImpl implements DriverSessionRepository {

    async save(driver:Driver):Promise<void>{
        const {save} = LocalStorage();
        await save('driver',JSON.stringify(driver))
    }

    async getDriver(): Promise<Driver> {

        const {getItem} = LocalStorage()
        const data = await getItem('driver')
        const driver:Driver = JSON.parse(data as any)
        return driver
    }

    async remove():Promise<void>{

        const {remove} = LocalStorage()
        await remove('driver');

    }

}