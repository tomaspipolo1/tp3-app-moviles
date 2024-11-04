import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomLoginSheet from '../components/BottomLoginSheet'; // Importa el componente de login

const WelcomeScreen = () => {
  const { bottom } = useSafeAreaInsets();

  const handleStartPress = () => {
    // Aquí podrías manejar la lógica para desplegar `BottomLoginSheet`
  };

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <Text style={styles.welcomeText}>¡Bienvenido a tu nueva rutina!</Text>
      <Image
          source={require('@/assets/images/bg-index2.png')}
          style={styles.image}
        />
      <Text style= {styles.subTitle}>¡Construye la mejor versión de ti, comienza a cumplir tus metas!</Text>
      <BottomLoginSheet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: 400,
    height: 300,
    margin: 0,
    resizeMode: 'cover',
  },
  startButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reactLogo: {
    width: 200, // Ajusta el tamaño según prefieras
    height: 200, // Ajusta el tamaño según prefieras
    resizeMode: 'cover', // Esto mantiene la proporción de la imagen
    marginBottom: 30, // Espacio entre la imagen y el botón
  },
});

export default WelcomeScreen;
