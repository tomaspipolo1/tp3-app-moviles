// ImportanceModalPicker.js o .tsx

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ImportancePickerModal = ({ visible, onClose, onSelect, selectedValue }) => {
  const options = ['Alto', 'Medio', 'Bajo'];

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Selecciona la importancia</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                selectedValue === option && styles.selectedOption,
              ]}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedValue === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#5cb85c',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#d9534f',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ImportancePickerModal;
