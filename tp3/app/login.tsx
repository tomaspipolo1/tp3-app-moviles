import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { defaultStyles } from '../constants/Styles'
import { FIREBASE_AUTH } from '../config/firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import { useAddUser } from '@/hooks/useAddUser'
import { useAuth } from '@/context/auth'

const Page = () => {
  const { type } = useLocalSearchParams<{type: string}>();
  const [loading, setLoading] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = FIREBASE_AUTH;
  const { signIn, signUp } = useAuth()


  const validateInputs = () => {
    if (!name && type === 'register') {
      setErrorMessage('Por favor, ingrese su nombre.');
      return false;
    }
    if (!lastName && type === 'register') {
      setErrorMessage('Por favor, ingrese su apellido.');
      return false;
    }

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
    if (type === 'register' && password !== repeatPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const _signIn = async () => {
    if (!validateInputs()) return;
    setLoading(true)
    try {
      await signIn({email, password})
      // router.replace('/(tabs)/(list)')
    } catch (error: any) {
      console.log(error)
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
    setLoading(false)
  }

  const _signUp = async () => {
    if (!validateInputs()) return;
    setLoading(true)
    try {
      await signUp({email, password, name, lastName, age})
      router.replace('/(tabs)');
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
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={1}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size='large' color='#fff'/>
        </View>
      )}
      {/* <Image style={styles.logo} source={require('../assets/images/logo-white.png')} /> */}

      <Text style={styles.title}>
        {type === 'login' ? 'Bienvenido de nuevo!' : 'Creá tu cuenta'}
      </Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <View style={{ marginBottom: 20 }}>
        {type === 'register' && (
          <>
            <TextInput placeholder="Nombre" style={styles.inputField} value={name} onChangeText={setName} />
            <TextInput placeholder="Apellido" style={styles.inputField} value={lastName} onChangeText={setLastName} />
            <TextInput placeholder="Edad (opcional)" style={styles.inputField} value={age} onChangeText={setAge} keyboardType="numeric" />
          </>
        )}
        <TextInput placeholder="Email" style={styles.inputField} value={email} onChangeText={setEmail} />
        <TextInput placeholder="Password" style={styles.inputField} value={password} onChangeText={setPassword} secureTextEntry />
        {type === 'register' && (
          <TextInput placeholder="Repetir Contraseña" style={styles.inputField} value={repeatPassword} onChangeText={setRepeatPassword} secureTextEntry />
        )}
      </View>

      {type === 'login' ? (
        <TouchableOpacity onPress={_signIn} style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Inicia Sesión</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={_signUp} style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Creá tu cuenta</Text>
        </TouchableOpacity>
      )}

    </KeyboardAvoidingView>
  )
}

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
    backgroundColor: "#007bff",
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
})

export default Page;