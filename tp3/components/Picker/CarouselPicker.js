
import React, { useState, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CarouselPicker = ({ data, onSelect, selectedValue, label }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(selectedValue || label);
  const flatListRef = useRef(null);

  const handleOpenModal = () => {
    setModalVisible(true);
    if (selectedValue) {
      const index = data.findIndex(item => item.value === selectedValue);
      if (index !== -1) {
        flatListRef.current.scrollToIndex({ animated: true, index });
      }
    }
  };

  const handleSelect = () => {
    onSelect(currentSelection);
    setModalVisible(false);
  };

  const handleScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSelection(data[index].value);
  };

  return (
    <View>
      <TouchableOpacity style={styles.carouselPickerButton} onPress={handleOpenModal}>
        <Text style={styles.carouselPickerButtonText}>{currentSelection}</Text>
      </TouchableOpacity>
      
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              ref={flatListRef}
              onMomentumScrollEnd={handleScrollEnd}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <View style={[styles.carouselItem, { width }]}>
                  <Text style={styles.carouselItemText}>{item.label}</Text>
                </View>
              )}
            />
            <TouchableOpacity style={styles.modalOkButton} onPress={handleSelect}>
              <Text style={styles.modalOkButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselPickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
  },
  carouselPickerButtonText: {
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 8,
    paddingVertical: 20,
    alignItems: 'center',
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItemText: {
    fontSize: 20,
    color: '#333',
  },
  modalOkButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#5cb85c',
    borderRadius: 8,
  },
  modalOkButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CarouselPicker;
