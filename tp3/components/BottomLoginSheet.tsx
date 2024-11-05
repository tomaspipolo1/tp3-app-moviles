import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles } from '@/constants/Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {ColorPalette} from '@/constants/Colors'
import { Link } from 'expo-router'
import { BorderlessButton } from 'react-native-gesture-handler'

const BottomLoginSheet = () => {

  const { bottom }  = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {/* <TouchableOpacity style={[defaultStyles.btn, styles.btnLight]}>
        <Ionicons name="logo-apple" size={14} style={styles.btnIcon} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]}>
        <Ionicons name="logo-google" size={16} style={styles.btnIcon} color={'#fff'}/>
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </TouchableOpacity> */}
      <Link href={{
        pathname: '/login',
        params: {
          type: 'login',
        }
      }} asChild style={[defaultStyles.btn, styles.btnLogin]}>
        <TouchableOpacity>
          <Text style={styles.btnLoginText}>Inicia Sesión</Text>
        </TouchableOpacity>
      </Link>
      <Link href={{
        pathname: '/login',
        params: {
          type: 'register',
        }
      }} asChild style={[defaultStyles.btn, styles.btnRegister]}>
        <TouchableOpacity>
          {/*<Ionicons name="mail" size={20} style={styles.btnIcon} color={ColorPalette.dark}/>*/}
          <Text style={styles.btnRegisterText}>Registrate aquí</Text>
        </TouchableOpacity>
      </Link>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    padding: 26,
    marginLeft: 30,
    marginRight: 30,
    gap: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,

  },
  btnRegister: {
    backgroundColor: ColorPalette.light,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnIcon: {
    paddingRight: 7,
    color: ColorPalette.ligthBlue,
  },
  btnRegisterText: {
    fontSize: 19,
    color: ColorPalette.dark,
  },
  btnLogin: {
    backgroundColor: ColorPalette.btnPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 20,
  },
  btnLoginText: {
    color: '#fff',
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: ColorPalette.dark,
  },
})

export default BottomLoginSheet