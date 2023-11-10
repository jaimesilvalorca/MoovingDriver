import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/Presentation/views/home/Home';
import { RegisterScreen } from './src/Presentation/views/register/Register';
import { DriverTabsNavigator } from './src/Presentation/navigator/DriverTabsNavigator';

export type RootStackParamList = {
  HomeScreen: undefined,
  RegisterScreen: undefined,
  DriverTabsNavigator: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App