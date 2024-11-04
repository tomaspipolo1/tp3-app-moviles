import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { defaultStyles } from '../constants/Styles'
import { FIREBASE_AUTH } from '../config/firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';


const Page = () => {
  
  //const { type } = useLocalSearchParams<{type: string}>();
  const params = useLocalSearchParams<{ type: string }>();
  const [type, setType] = useState('login');
  useEffect(() => {
    if (params.type && params.type !== type) {
      setType(params.type);
    }
  }, [params.type]);

  const [loading, setLoading] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = FIREBASE_AUTH;
  
  //Validaciones

  const validateInputs = () => {
    if (!email) {
      setErrorMessage('Por favor, ingrese su correo electrónico.');
      return false;
    }
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, ingrese un correo electrónico válido.');
      return false;
    }
    if (!password) {
      setErrorMessage('Por favor, ingrese su contraseña.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  //Funciones

  const signIn = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace('/(tabs)');
    } catch (error: any) {
      console.log(error);
      let message = '';
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'No se encontro un usuario con ese correo electronico.';
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-credential': 
          message = 'Contraseña incorrecta.';
          break;
        case 'auth/invalid-email':
          message = 'El correo electronico no es valido.';
          break;
        default:
          message = 'Error al iniciar sesion: ' + error.message;
      }
      setErrorMessage(message);
    }
    setLoading(false);
  };

  const signUp = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace('/(tabs)');
    } catch (error: any) {
      console.log(error);
      let message = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'El correo electronico ya esta en uso.';
          break;
        case 'auth/invalid-email':
          message = 'El correo electronico no es valido.';
          break;
        case 'auth/weak-password':
          message = 'La contraseña es demasiado debil.';
          break;
        default:
          message = 'Error al crear la cuenta: ' + error.message;
      }
      setErrorMessage(message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={1}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {/* <Image style={styles.logo} source={require('../assets/images/logo-white.png')} /> */}

      <Text style={styles.title}>
        {type === 'login' ? '¡Bienvenido de nuevo!' : 'Crea tu cuenta'}
      </Text>

      {/* Mostrar mensaje de error si existe */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <View style={{ marginBottom: 20 }}>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          style={styles.inputField}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {type === 'login' ? (
        <TouchableOpacity onPress={signIn} style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Inicia Sesión</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={signUp} style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Crea tu cuenta</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnPrimary: {
    backgroundColor: '#007bff',
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default Page;