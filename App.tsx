import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/Presentation/views/home/Home';
import { RegisterScreen } from './src/Presentation/views/register/Register';
import { DriverTabsNavigator } from './src/Presentation/navigator/DriverTabsNavigator';
import { ProfileUpdateScreen } from './src/Presentation/views/profile/update/ProfileUpdate';
import { Driver } from './src/Domain/entities/Driver';
import { DriverProvider } from './src/Presentation/context/DriverContext';

import { MapScreen } from './src/Presentation/views/mapScreen/Map';
import TripDetail from './src/Presentation/views/tripDetail/TripDetail';
import UpdateCarScreen from './src/Presentation/views/profile/updateCar/UpdateCar';


export type RootStackParamList = {
  HomeScreen: undefined,
  RegisterScreen: undefined,
  DriverTabsNavigator: undefined,
  DriverAddressListScreen: undefined,
  ProfileUpdateScreen: { driver: Driver },
  MapScreen: { driver: Driver },
  TripDetail: undefined,
  UpdateCarScreen: { driver: Driver }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <DriverState>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
          />
          <Stack.Screen
            name='RegisterScreen'
            component={RegisterScreen}
            options={{
              headerShown: true,
              title: 'Registro de usuarios'
            }}
          />
          <Stack.Screen
            name='DriverTabsNavigator'
            component={DriverTabsNavigator}
          />
          <Stack.Screen
            name='ProfileUpdateScreen'
            component={ProfileUpdateScreen}
            options={{
              headerShown: true,
              title: 'Actualizar usuario'
            }}
          />

          <Stack.Screen
            name='MapScreen'
            component={MapScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='TripDetail'
            component={TripDetail}
            options={{
              headerShown: true,
              title: 'Punto de referencia'
            }}
          />
          <Stack.Screen
            name='UpdateCarScreen'
            component={UpdateCarScreen}
            options={{
              headerShown: true,
              title: 'Car Screen Update '
            }}
          />



        </Stack.Navigator>
      </DriverState>
    </NavigationContainer>
  )
}

const DriverState = ({ children }: any) => {
  return (
    <DriverProvider>
      {children}
    </DriverProvider>
  )
}

export default App