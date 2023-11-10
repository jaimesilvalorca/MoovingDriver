import React from 'react'
import { RemoveDriverLocalUseCase } from '../../../../Domain/useCases/driverLocal/RemoveDriverLocal'
import { useDriverLocal } from '../../../hooks/useDriverLocal';

const ProfileInfoViewModel = () => {

  const {driver} = useDriverLocal();

    const removeSession = async () =>{
        await RemoveDriverLocalUseCase();
    }

  return {
    removeSession,
    driver
  }
}

export default ProfileInfoViewModel