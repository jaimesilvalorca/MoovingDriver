import React from 'react'
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

  const { removeSession, driver } = useViewModel()

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../../assets/background.jpg')}
        style={styles.imageBackground}
      />
      <Pressable
        style={styles.logout}
        onPress={() => {
          removeSession()
          navigation.replace('HomeScreen')
        }}
      >
        <Image
          source={require('../../../../../assets/logout.png')}
          style={styles.logoutImage}
        />
      </Pressable>

      <View style={styles.logoContainer}>
        {driver?.image !== null ? (
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
        <View style={{ ...styles.formInfo, marginTop: 25, marginBottom: 40 }}>
          <Image
            source={require('../../../../../assets/phone.png')}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{(driver?.phone)?.toLocaleUpperCase()}</Text>
            <Text style={styles.formTextDescription}>Correo Electronico</Text>
            <Text>CarInfo</Text>
            <Text>{driver?.car.make}</Text>
            <Text>{driver?.car.modelCar}</Text>
            <Text>{driver?.car.plate}</Text>
            <Text>{driver?.car.year}</Text>

          </View>
        </View>
        <RoundedButton
          onPress={() => { }}
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