import { useState } from 'react'
// import { ApiMooving } from '../../../Data/sources/remote/api/ApiMooving'
// import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';
import * as ImagePicker from 'expo-image-picker'
import { RegisterWithImageAuthUseCase } from '../../../Domain/useCases/auth/RegisterWithImageAuth';
import { SaveDriverLocalUseCase } from '../../../Domain/useCases/driverLocal/SaveDriverLocal';
import { useDriverLocal } from '../../hooks/useDriverLocal';
import { Linking } from 'react-native';

const RegisterViewModel = () => {

    const[erroMessage, setErrorMessage] = useState('')

    const [values, setValues] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        image: '',
        role: '',
        car: '',
        password: '',
        confirmPassword: '',

    })

    const [loading,setLoading] = useState(false)

    const [file,setFile] = useState<ImagePicker.ImagePickerAsset>()

    const {driver,getDriverSession} =  useDriverLocal();


    const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            quality:1
        })

        if(!result.canceled){
            onChange('image',result.assets[0].uri)
            setFile(result.assets[0])
        }
    }

    const takePhoto = async () =>{
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            quality:1
        })

        if(!result.canceled){
            onChange('image',result.assets[0].uri)
            setFile(result.assets[0])
        }
    }


    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const register = async ()=>{
            if(isValidForm()){
                setLoading(true)
                // const response = await  RegisterAuthUseCase(values)
                const response = await RegisterWithImageAuthUseCase(values,file!)
                setLoading(false)
                if(response.success){
                    await SaveDriverLocalUseCase(response.data)
                    getDriverSession()
                    console.log('Result: ' + JSON.stringify(response))
                }else{
                    setErrorMessage(response.message)
                }
                
            }
    }

    const termsAndConditions = () => {
        Linking.openURL('http://45.7.231.169:3000/api/terms').catch((err) => console.error('Error al abrir el enlace', err));
    }

    const isValidForm = () =>{
        if(values.name === ''){
            setErrorMessage('Ingresa tu nombre')
            return false;
        }
        if(values.lastname === ''){
            setErrorMessage('Ingresa tu apellido')
            return false;
        }
        if(values.phone === ''){
            setErrorMessage('Ingresa tu telefono')
            return false;
        }
        if(values.email === ''){
            setErrorMessage('Ingresa tu email')
            return false;
        }
        if(values.password === ''){
            setErrorMessage('Ingresa la contraseña')
            return false;
        }
        if(values.confirmPassword === ''){
            setErrorMessage('Ingresa la confirmacion del password')
            return false;
        }

        if(values.password !== values.confirmPassword){
            setErrorMessage('las contraseñas son distintas')
            return false;
        }

        if(values.image === ''){
            setErrorMessage('Selecciona una imagen')
            return false
        }

        return true
    }

    return {
        ...values,
        onChange,
        register,
        erroMessage,
        pickImage,
        takePhoto,
        driver,
        loading,
        termsAndConditions
    }
}

export default RegisterViewModel
