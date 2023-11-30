
import React,{createContext,useEffect,useState} from 'react'
import { Driver } from "../../Domain/entities/Driver";
import { SaveDriverLocalUseCase } from '../../Domain/useCases/driverLocal/SaveDriverLocal';
import { getDriverLocalUseCase } from '../../Domain/useCases/driverLocal/GetDriverLocal';
import { RemoveDriverLocalUseCase } from '../../Domain/useCases/driverLocal/RemoveDriverLocal';

export const driverInitialState: Driver = {

    id: '',
    name: '',
    lastname: '',
    phone: '',
    email: '',
    image: '',
    car: {
        make:'',
        modelCar:'',
        year:0,
        plate:''
    },
    role: '',
    password: '',
    confirmPassword: '',
}

export interface DriverContextProps{
    driver:Driver,
    saveDriverSession:(driver:Driver)=>Promise<void>
    getDriverSession:()=>Promise<void>
    removeDriverSession:()=>Promise<void>
}

export const DriverContext = createContext ({} as DriverContextProps)

export const DriverProvider = ({children}:any) =>{

    const [driver, setDriver] = useState(driverInitialState)

    useEffect(() => {
        getDriverSession()
      
      }, [])

    const saveDriverSession = async(driver:Driver)=>{
        await SaveDriverLocalUseCase(driver);
        setDriver(driver)
    }

    const getDriverSession = async () =>{
        const driver = await getDriverLocalUseCase()
        setDriver(driver)
    }

    const removeDriverSession = async()=>{
        await RemoveDriverLocalUseCase();
        setDriver(driverInitialState)
    }

    return(
        <DriverContext.Provider value={{
            driver,
            saveDriverSession,
            getDriverSession,
            removeDriverSession
        }}>
        {children}
        </DriverContext.Provider>
    )
}