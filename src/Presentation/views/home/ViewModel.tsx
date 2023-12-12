import React, { useContext, useState } from 'react'
import { LoginAuthUseCase } from '../../../Domain/useCases/auth/LoginAuth'
import { SaveDriverLocalUseCase } from '../../../Domain/useCases/driverLocal/SaveDriverLocal'
import { useDriverLocal } from '../../hooks/useDriverLocal'
import { Linking } from 'react-native'
import { DriverContext } from '../../context/DriverContext'


const HomeViewModel = () => {

    // const { driver, getDriverSession } = useDriverLocal();
    const {driver,saveDriverSession,getDriverSession} = useContext(DriverContext)
    

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const [errorMessage, setErrorMessage] = useState('')

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const login = async () => {
        if (isValidForm()) {
            const response = await LoginAuthUseCase(values.email, values.password)
            console.log(JSON.stringify(response))
            if (!response.success) {
                setErrorMessage(response.message)
            } else {
                saveDriverSession(response.data)
            }
        }
    }

    const isValidForm = () => {
        if (values.email === '') {
            setErrorMessage('Campo correo electronico vacio')
        }
        if (values.password === '') {
            setErrorMessage('Campo password vacio')
        }
        return true;
    }

    const forggotPassword = () => {
        Linking.openURL('http://45.7.231.169:3000/reset-password').catch((err) => console.error('Error al abrir el enlace', err));
    }

    const termsAndConditions = () => {
        Linking.openURL('http://45.7.231.169:3000/api/terms').catch((err) => console.error('Error al abrir el enlace', err));
    }

    return {
        ...values,
        driver,
        onChange,
        errorMessage,
        login,
        forggotPassword,
        termsAndConditions
    }
}

export default HomeViewModel