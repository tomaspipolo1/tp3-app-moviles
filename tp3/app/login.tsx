import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FIREBASE_AUTH } from '../config/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';

const LoginScreen = () => {
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

  const validateInputs = () => {
    if (!email) {
      setErrorMessage('Por favor, ingrese su correo electrónico.');
      return false;
    }
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
          message = 'No se encontró un usuario con ese correo electrónico.';
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          message = 'Contraseña incorrecta.';
          break;
        case 'auth/invalid-email':
          message = 'El correo electrónico no es válido.';
          break;
        default:
          message = 'Error al iniciar sesión: ' + error.message;
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
          message = 'El correo electrónico ya está en uso.';
          break;
        case 'auth/invalid-email':
          message = 'El correo electrónico no es válido.';
          break;
        case 'auth/weak-password':
          message = 'La contraseña es demasiado débil.';
          break;
        default:
          message = 'Error al crear la cuenta: ' + error.message;
      }
      setErrorMessage(message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <Text style={styles.title}>
        {type === 'login' ? '¡Bienvenido de nuevo!' : 'Crea tu cuenta'}
      </Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <View style={{ marginBottom: 20 }}>
        <TextInput placeholder="Email" style={styles.inputField} value={email} onChangeText={setEmail} />
        <TextInput placeholder="Password" style={styles.inputField} value={password} onChangeText={setPassword} secureTextEntry />
      </View>
      {type === 'login' ? (
        <TouchableOpacity onPress={signIn} style={styles.btnPrimary}>
          <Text style={styles.btnPrimaryText}>Inicia Sesión</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={signUp} style={styles.btnPrimary}>
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
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
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
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
