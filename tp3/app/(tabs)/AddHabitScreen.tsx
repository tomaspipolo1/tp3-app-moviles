// AddHabitScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CarouselPicker from '../../components/Picker/CarouselPicker';

const AddHabitScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  const handleSave = () => {
    if (!name.trim() || !importance.trim()) {
      Alert.alert("Error", "Los campos Nombre e Importancia son obligatorios.");
      return;
    }

    const createdAt = new Date();
    const updatedAt = new Date();

    const newHabit = {
      name,
      description,
      importance,
      horaInicio,
      horaFin,
      createdAt,
      updatedAt,
    };

    console.log('Habit to save:', newHabit);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar un Hábito</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del hábito"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción del hábito"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Importancia</Text>
      <CarouselPicker
        data={[
          { label: 'Alto', value: 'Alto' },
          { label: 'Medio', value: 'Medio' },
          { label: 'Bajo', value: 'Bajo' },
        ]}
        onSelect={setImportance}
        selectedValue={importance}
        label="Seleccione una opción"
      />

      <Text style={styles.label}>Hora de Inicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 08:00"
        value={horaInicio}
        onChangeText={setHoraInicio}
      />

      <Text style={styles.label}>Hora de Fin</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 18:00"
        value={horaFin}
        onChangeText={setHoraFin}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#d9534f',
  },
  saveButton: {
    backgroundColor: '#5cb85c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddHabitScreen;
