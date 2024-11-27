import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth';
import { router } from 'expo-router';
import { ColorPalette } from '@/constants/Colors';

const ProfileScreen = () => {
  const { userData, logOut } = useAuth();

  const handleLogOut = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Cerrar sesión',
        onPress: async () => {
          await logOut();
        }
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <MaterialIcons name="account-circle" size={200} color="#4CAF50" style={styles.userIcon} />
        <Text style={styles.nameText}>
          {userData?.name} {userData?.lastName} as
        </Text>
        {userData?.age && (
          <Text style={styles.ageText}>Edad: {userData.age}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.viewHabitsButton]}
          onPress={() => router.push('/(app)/(tabs)/(list)')} 
        >
          <Text style={styles.buttonText}>Ver hábitos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogOut}
        >
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    paddingTop: '30%',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  userIcon: {
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ageText: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  viewHabitsButton: {
    backgroundColor: ColorPalette.btnPrimary,
  },
  logoutButton: {
    backgroundColor: ColorPalette.light,
  },
  logoutButtonText: {
    color: ColorPalette.dark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default ProfileScreen;
