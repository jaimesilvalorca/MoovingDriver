import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import useViewModel from './ViewModel'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../../App'
import styles from './Styles'
import { Link, useNavigation } from '@react-navigation/native'
import { RoundedButton } from '../../../components/RoundedButton'

interface Props extends StackScreenProps<RootStackParamList> { }

export const ProfileInfoScreen = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const { driver,removeDriverSession } = useViewModel()

  useEffect(() => {
    if(driver.id === ''){
      navigation.replace('HomeScreen')
    }
  }, [driver])
  

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../../assets/background.jpg')}
        style={styles.imageBackground}
      />
      <Pressable
        style={styles.logout}
        onPress={() => {
          removeDriverSession()
        }}
      >
        <Image
          source={require('../../../../../assets/logout.png')}
          style={styles.logoutImage}
        />
      </Pressable>

      <View style={styles.logoContainer}>
        {driver?.image !== '' ? (
          <Image
            source={{ uri: driver?.image }}
            style={styles.logoImage}
          />
        ) : (
          <Image
            source={require('../../../../../assets/user_image.png')}
            style={styles.logoImage}
          />
        )}
      </View>
      <View style={styles.form}>
        <View style={styles.formInfo}>
          <Image
            source={require('../../../../../assets/user.png')}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{(driver?.name)?.toLocaleUpperCase()} {(driver?.lastname)?.toLocaleUpperCase()}</Text>
            <Text style={styles.formTextDescription}>Nombre y Apellido</Text>
          </View>
        </View>
        <View style={{ ...styles.formInfo, marginTop: 25 }}>
          <Image
            source={require('../../../../../assets/email.png')}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{(driver?.email)?.toLocaleUpperCase()}</Text>
            <Text style={styles.formTextDescription}>Correo Electronico</Text>
          </View>
        </View>
        <View style={{ ...styles.formInfo, marginTop: 25}}>
          <Image
            source={require('../../../../../assets/phone.png')}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{(driver?.phone)?.toLocaleUpperCase()}</Text>
            <Text style={styles.formTextDescription}>Correo Electronico</Text>

          </View>
        </View>
        <View style={{ ...styles.formInfo, marginTop: 25, marginBottom: 40 }}>
          <Image
            source={require('../../../../../assets/car.png')}
            style={styles.formImage}
          />
          <TouchableOpacity
          onPress={()=>{navigation.navigate('UpdateCarScreen',{driver:driver})}}
          >
          <View style={styles.formContent}>
            <Text>{(driver?.car.make)?.toLocaleUpperCase()} {(driver?.car.modelCar)?.toLocaleUpperCase()} {(driver?.car.plate)?.toLocaleUpperCase()} {(driver?.car.year)}</Text>
            <Text style={styles.formTextDescription}>Vehiculo Registrado</Text>
          </View>
          </TouchableOpacity>
        </View>
        
        <RoundedButton
          onPress={() => {
            navigation.navigate('ProfileUpdateScreen',{driver:driver!})
           }}
          text='ACTUALIZAR INFORMACIÓN'
        />
      </View>
    </View>
  )
}


{/*
<Button
onPress?{()=>{
  removeSession()
  navigation.navigate('HomeScreen')
}}
title='Cerrar Sesion' */}