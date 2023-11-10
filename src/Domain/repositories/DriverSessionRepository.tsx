import { Driver } from "../entities/Driver";

export interface DriverSessionRepository {

    save(driver:Driver): Promise<void>
    getDriver(): Promise<Driver>
    remove():Promise<void>
}