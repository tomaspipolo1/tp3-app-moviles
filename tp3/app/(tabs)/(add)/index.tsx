import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ColorPalette } from '@/constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImportancePickerModal from '@/components/Picker/ImportanceModalPicker';
import { useAddHabit } from '@/hooks/useAddHabit';
import { useAuth } from '@/context/auth';
import { router } from 'expo-router';
import { useEditHabit } from '@/hooks/useEditHabit';

const AddHabitScreen = () => {
  const navigation = useNavigation();
  const { userData } = useAuth()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [habitId, setHabitId] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const { addHabit } = useAddHabit(userData?.id!)
  const { editHabit } = useEditHabit(userData?.id!)
  const { params }: any = useRoute()

  useEffect(() => {
    if (params && params.habit) {
      const {name, description, importance, timeFrom, timeTo, id} = JSON.parse(params.habit)
      setName(name)
      setHabitId(id)
      setDescription(description)
      setImportance(importance)
      setTimeFrom(timeFrom)
      setTimeTo(timeTo)
    }
  }, [params])

  const handleSave = async () => {
    if (!name.trim() || !importance.trim()) {
      Alert.alert('Error', 'Los campos Nombre e Importancia son obligatorios.');
      return;
    }

    const createdAt = new Date();
    const updatedAt = new Date();

    const newHabit = {
      name,
      description,
      importance,
      timeFrom,
      timeTo,
      createdAt,
      updatedAt,
    };

    if (habitId) {
      await editHabit(habitId, newHabit)
    } else {
      await addHabit(newHabit)
    }

    clearForm()
    router.push('/(list)');
  };

  const clearForm = () => {
    setHabitId('')
    setName('');
    setDescription('');
    setImportance('');
    setTimeFrom('');
    setTimeTo('');
  };

  const handleCancel = () => {
    clearForm();
    navigation.goBack();
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

 // Función para formatear la hora en el formato "xx:xx"
 const formatTimeInput = (input, setter) => {
  const formattedInput = input.replace(/[^0-9]/g, '');

  if (formattedInput === '') {
    setter('');
    return;
  }

  if (formattedInput.length <= 4) {
    const hour = formattedInput.slice(0, 2);
    const minutes = formattedInput.slice(2, 4);
    setter(`${hour}:${minutes}`);
  }
};
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }} 
      scrollEnabled={true} 
      keyboardShouldPersistTaps="handled" 
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{habitId? 'Editar Habito' : 'Agregar Habito'}</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del hábito"
          defaultValue={name}
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
        <TouchableOpacity style={styles.importanceButton} onPress={openModal}>
          <Text style={styles.importanceButtonText}>
            {importance || 'Seleccione una opción'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Hora de Inicio</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 08:00"
          value={timeFrom}
          onChangeText={(input) => formatTimeInput(input, setTimeFrom)}
          keyboardType="numeric"
          maxLength={5}
        />

        <Text style={styles.label}>Hora de Fin</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 18:00"
          value={timeTo}
          onChangeText={(input) => formatTimeInput(input, setTimeTo)}
          keyboardType="numeric"
          maxLength={5} 
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ImportancePickerModal
        visible={isModalVisible}
        onClose={closeModal}
        onSelect={(value) => setImportance(value)}
        selectedValue={importance}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  innerContainer: {
    padding: 20,
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
  importanceButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginBottom: 15,
    height: 50,
  },
  importanceButtonText: {
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: ColorPalette.light,
  },
  cancelButtonText: {
    color: ColorPalette.dark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: ColorPalette.btnPrimary,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddHabitScreen;
