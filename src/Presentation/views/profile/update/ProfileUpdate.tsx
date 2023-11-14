import React, { useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, ToastAndroid, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RoundedButton } from '../../../components/RoundedButton';
import useViewModel from './ViewModel'
import { CustomTextInput } from '../../../components/CustomTextInput';
import styles from './Styles'
import { ModalPickImage } from '../../../components/ModalPickImage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import { MyColors } from '../../../theme/AppTheme';


interface Props extends StackScreenProps<RootStackParamList, 'ProfileUpdateScreen'> { }

export const ProfileUpdateScreen = ({ navigation, route }: Props) => {

  const { name, lastname, image, phone, email, password, confirmPassword, onChange, register, erroMessage, pickImage, takePhoto, driver, loading } = useViewModel()
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (erroMessage != '') {
      ToastAndroid.show(erroMessage, ToastAndroid.LONG)
    }

  }, [erroMessage])

useEffect(() => {
  
}, [])

  return (
    <View style={styles.container}>

      <Image
        source={require('../../../../../assets/background.jpg')}
        style={styles.imageBackground}
      />
      <View style={styles.logoContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}

        >
          {
            image == ''
              ? <Image
                source={{uri:driver?.image}}
                style={styles.logoImage} />
              : <Image
                source={{ uri: image }}
                style={styles.logoImage} />

          }

        </TouchableOpacity>
        <Text style={styles.logoText}>
          Subir una imagen
        </Text>
      </View>
      <View style={styles.form}>

        <ScrollView>


          <Text style={styles.formText}>
            Actualizar perfil
          </Text>

          {/*nombres*/}
          <CustomTextInput
            image={require('../../../../../assets/user.png')}
            keyboardType='default'
            placeholder='Nombres'
            property='name'
            onChangeText={onChange}
            value={name}
          />

          {/*apellidos*/}
          <CustomTextInput
            image={require('../../../../../assets/my_user.png')}
            keyboardType='default'
            placeholder='Apellidos'
            property='lastname'
            onChangeText={onChange}
            value={lastname}
          />

          {/*Telefono*/}

          <CustomTextInput
            image={require('../../../../../assets/phone.png')}
            keyboardType='phone-pad'
            placeholder='Telefono'
            property='phone'
            onChangeText={onChange}
            value={phone}
          />

          <View style={{ marginTop: 30 }}>
            <RoundedButton
              text='Confirmar Registro'
              onPress={() => {
                register()
              }} />
          </View>
        </ScrollView>
      </View>
      <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />

      {
        loading && <ActivityIndicator style={styles.loading} size="large" color={MyColors.primary} />
      }

    </View>
  )
}



