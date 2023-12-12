import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Modal from 'react-native-modal';
import { RoundedButton } from '../../components/RoundedButton';
import { DriverContext } from '../../context/DriverContext';
import { useNavigation } from '@react-navigation/native';

export const MapScreen = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const mapRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [pendingTrips, setPendingTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);


  const { driver } = useContext(DriverContext);
  const userEmail = driver.email;
  const driverEmail = driver.email;
  const navigation = useNavigation();

  const handleSelectOrigin = async (data, details = null) => {
    // Lógica para seleccionar el origen
  };

  const handleSelectDestination = (data, details = null) => {
    // Lógica para seleccionar el destino
  };

  const fetchPendingTrips = useCallback(async () => {
    try {
      const response = await axios.get(`http://45.7.231.169:3000/api/trips/pending/${driverEmail}`);

      console.log('Response:', response.data);

      if (response.status === 200) {
        const pendingTripData = response.data.data;
        console.log('Pending Trip Data:', pendingTripData);
        setPendingTrips(pendingTripData ? [pendingTripData] : []);
      } else {
        console.log('ningun viaje pendiente')
      }
    } catch (error) {
      console.log('ningun viaje')
    }
  }, [driverEmail]);

  const toggleConnection = useCallback(async () => {
    try {
      const response = await axios.put('http://45.7.231.169:3000/api/drivers/connected', {
        email: userEmail,
        connected: !connected,
      });

      if (response.status === 200) {
        setConnected(!connected);

        if (!connected) {
          fetchPendingTrips();
        }
      } else {
        console.error('Error al cambiar el estado de conexión:', response.data);
      }
    } catch (error) {
      console.error('Error al cambiar el estado de conexión:', error.message);
    }
  }, [connected, fetchPendingTrips, userEmail]);

  const acceptTrip = useCallback(async () => {
    try {
      const response = await axios.put(
        `http://45.7.231.169:3000/api/trips/accept/${selectedTrip._id}`
      );

      if (response.status === 200) {
        console.log('Viaje aceptado:', selectedTrip);
        navigation.navigate('TripDetail', { tripId: selectedTrip._id });
      } else {
        console.error('Error al aceptar el viaje:', response.data);
      }
    } catch (error) {
      console.error('Error al aceptar el viaje:', error.message);
    } finally {
      setModalVisible(false);
    }
  }, [selectedTrip]);

  const cancelTrip = useCallback(async () => {
    try {
      const response = await axios.put(
        `http://45.7.231.169:3000/api/trips/cancel/${selectedTrip._id}`
      );

      if (response.status === 200) {
        console.log('Viaje cancelado:', selectedTrip);
        // Aquí puedes realizar las acciones adicionales necesarias después de cancelar el viaje
      } else {
        console.error('Error al cancelar el viaje:', response.data);
      }
    } catch (error) {
      console.error('Error al cancelar el viaje:', error.message);
    } finally {
      setModalVisible(false);
    }
  }, [selectedTrip]);

  useEffect(() => {
    console.log('Viajes pendientes actualizados:', pendingTrips);
    if (pendingTrips.length > 0) {
      openModal(pendingTrips[0]);
    }
  }, [pendingTrips, openModal]);

  const openModal = useCallback((trip) => {
    console.log('Abriendo modal para el viaje:', trip);
    setSelectedTrip(trip);
    setModalVisible(true);
  }, []);

  useEffect(() => {
    // Lógica adicional cuando cambian origin y destination
  }, [origin, destination]);

  useEffect(() => {
    if (mapRef.current && origin && destination) {
      // Lógica adicional cuando cambian origin y destination
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

        {pendingTrips.map((trip) => (
          <Marker
            key={trip._id}
            coordinate={{
              latitude: trip.originLatitude,
              longitude: trip.originLongitude,
            }}
            title={`Viaje Pendiente - ${trip._id}`}
            pinColor="orange"
            onPress={() => openModal(trip)}
          />
        ))}
      </MapView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{`¿Aceptar o cancelar el viaje ${selectedTrip ? selectedTrip._id : ''}?`}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={acceptTrip}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={cancelTrip}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <RoundedButton
          text={connected ? 'Desconectar' : 'Conectar'}
          onPress={toggleConnection}
        />
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
    alignSelf: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#009788',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapScreen;
