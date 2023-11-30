import { useState,useContext } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { SaveDriverLocalUseCase } from '../../../../Domain/useCases/driverLocal/SaveDriverLocal';
import { useDriverLocal } from '../../../hooks/useDriverLocal';
import { UpdateDriverUseCase } from '../../../../Domain/useCases/driver/UpdateDriver';
import { UpdateWithImageDriverUseCase } from '../../../../Domain/useCases/driver/UpdateWithImageDriver';
import { Driver } from '../../../../Domain/entities/Driver';
import { ReponseAPIMooving } from '../../../../Data/sources/remote/models/ResponseApiMooving';
import { DriverContext } from '../../../context/DriverContext';

const ProfileUpdateViewModel = (driver:Driver) => {


    const [erroMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [values, setValues] = useState(driver)
    const [loading,setLoading] = useState(false)
    const [file,setFile] = useState<ImagePicker.ImagePickerAsset>()
    const {getDriverSession} = useDriverLocal()
    const {saveDriverSession} = useContext(DriverContext)
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

    const onChangeInfoUpdate = (name:string, lastname:string, phone:string) => {
        setValues({ ...values, name:name,lastname:lastname,phone:phone})
    }

    const update = async () => {
        try {
          let response = {} as ReponseAPIMooving;
      
          if (isValidForm()) {
            setLoading(true);
      
            console.log(response);

      
            if (values.image?.includes('https://')) {
              response = await UpdateDriverUseCase(values);

            } else {
              response = await UpdateWithImageDriverUseCase(values, file!);
            }
      
            setLoading(false);
            console.log('RESULT: ' + JSON.stringify(response) + 'aqui esta la otra');
      
            if (response.success) {
              saveDriverSession(response.data)
              setSuccessMessage(response.message)
            } else {
              setErrorMessage(response.message);
            }
          }
        } catch (error) {
          console.error('Error in update:', error);
        }
      };
      

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

        return true
    }

    return {
        ...values,
        onChange,
        update,
        pickImage,
        takePhoto,
        onChangeInfoUpdate,
        successMessage,
        erroMessage,
        loading,
        driver,
        
    }
}

export default ProfileUpdateViewModel
