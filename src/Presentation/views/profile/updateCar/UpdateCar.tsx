import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { DriverContext } from '../../../context/DriverContext';
import { RemoveDriverLocalUseCase } from '../../../../Domain/useCases/driverLocal/RemoveDriverLocal';

const UpdateCarScreen = () => {
  const { driver } = useContext(DriverContext);
  console.log(driver)

  const [carData, setCarData] = useState({
    make: driver.car.make,
    modelCar: driver.car.modelCar,
    plate: driver.car.plate,
    year: driver.car.year.toString(),
  });

  const handleUpdateCar = async () => {
    try {
      const response = await fetch(`http://45.7.231.169:3000/api/drivers/updateCar/${driver.car._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        const updatedDriver = await response.json();
        RemoveDriverLocalUseCase()
      } else {
        console.error('Error al actualizar el automóvil');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Car Information</Text>
    
      <TextInput
        style={styles.input}
        placeholder="Make"
        value={carData.make}
        onChangeText={(text) => setCarData({ ...carData, make: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={carData.modelCar}
        onChangeText={(text) => setCarData({ ...carData, modelCar: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Plate"
        value={carData.plate}
        onChangeText={(text) => setCarData({ ...carData, plate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={carData.year}
        onChangeText={(text) => setCarData({ ...carData, year: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateCar}>
        <Text style={styles.buttonText}>Actualizar Automovil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#009788',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#009788',
    borderRadius: 5,
    borderWidth: 2, 
    borderColor: 'white',
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize:20,
    fontWeight:'bold',
    textAlign: 'center',
  },
});

export default UpdateCarScreen;
