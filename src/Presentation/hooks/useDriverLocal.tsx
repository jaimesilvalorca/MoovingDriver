import React,{useEffect,useState} from 'react'
import { getDriverLocalUseCase } from '../../Domain/useCases/driverLocal/GetDriverLocal'
import { Driver } from '../../Domain/entities/Driver'

export const useDriverLocal = () => {

  const [driver, setDriver] = useState<Driver>()

  useEffect(() => {
    getDriverSession()
  
  }, [])

  const getDriverSession = async () =>{
      const driver = await getDriverLocalUseCase()
      setDriver(driver)
  }
  return{
    driver,
    getDriverSession
  }
}
