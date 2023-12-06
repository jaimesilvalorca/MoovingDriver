import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_MAPS_KEY } from '@env';
import axios from 'axios';
import { RoundedButton } from '../../components/RoundedButton';
import { DriverContext } from '../../context/DriverContext';

export const MapScreen = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const mapRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const { driver } = useContext(DriverContext);

  const userEmail = driver.email; // Asegúrate de que esta variable esté definida

  const handleSelectOrigin = async (data, details = null) => {
    // Implementa la lógica según tus necesidades
  };

  const handleSelectDestination = (data, details = null) => {
    // Implementa la lógica según tus necesidades
  };

  const toggleConnection = async () => {
    try {
      const response = await axios.put('http://45.7.231.169:3000/api/drivers/connected', {
        email: userEmail,
        connected: !connected,
      });

      if (response.status === 200) {
        // Actualiza el estado después de un cambio exitoso
        setConnected(!connected);
      } else {
        console.error('Error al cambiar el estado de conexión:', response.data);
      }
    } catch (error) {
      console.error('Error al cambiar el estado de conexión:', error.message);
    }
  };

  useEffect(() => {
    // Implementa la lógica según tus necesidades
    // Este useEffect se ejecuta cuando cambia 'origin' o 'destination'
  }, [origin, destination]);

  useEffect(() => {
    if (mapRef.current && origin && destination) {
      // Implementa la lógica según tus necesidades
      // Este useEffect se ejecuta cuando 'origin' o 'destination' cambian
    }
  }, [origin, destination]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -33.4489,
          longitude: -70.6693,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {origin && <Marker coordinate={origin} title="Origen" />}
        {destination && <Marker coordinate={destination} title="Destino" />}
        {/* Incluye aquí el código necesario para las direcciones si es necesario */}
      </MapView>

      <View style={styles.buttonContainer}>
        <RoundedButton text={connected ? 'Desconectar' : 'Conectar'} onPress={toggleConnection} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
