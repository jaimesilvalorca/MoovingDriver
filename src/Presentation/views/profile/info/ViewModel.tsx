import React,{useContext}from 'react'
import { RemoveDriverLocalUseCase } from '../../../../Domain/useCases/driverLocal/RemoveDriverLocal'
import { useDriverLocal } from '../../../hooks/useDriverLocal';
import { DriverContext } from '../../../context/DriverContext';

const ProfileInfoViewModel = () => {

  const {driver,removeDriverSession} = useContext(DriverContext);

  return {
    removeDriverSession,
    driver
  }
}

export default ProfileInfoViewModel