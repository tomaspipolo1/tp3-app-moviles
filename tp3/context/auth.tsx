import React, { useEffect, useState } from "react";
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store'
import { decodeToken } from "@/utils/decode";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/config/firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useAddUser } from "@/hooks/useAddUser";
interface ICredentials {
  email: string
  password: string
}

interface IUser {
  id: string
  name: string
  lastName: string
  email: string
  age?: number
  createdAt: number
  updatedAt: number
}

interface ISignup {
  email: string
  password: string
  name: string
  lastName: string
  age?: string
}

export function useAuth() {
  return React.useContext(AuthContext)
}

export const AuthContext = React.createContext<{
  signIn: (credentails: ICredentials) => void
  signUp: (credentails: ISignup) => void
  logOut: () => void
  isLoading: boolean
  token: string
  userData: IUser | null
}>({
  signIn: () => null,
  signUp: () => null,
  isLoading: true,
  token: '',
  logOut: () => null,
  userData: null
})

export const AuthProvider = (props: React.PropsWithChildren) => {
  const [token, setToken] = useState<string>('')
  const [userData, setUserData] = useState<IUser | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const { addUser } = useAddUser()

  const loadCredentials = async (loading: boolean = false) => {
    try {
      if (loading) setLoading(true)
      const storedToken = await getItemAsync('token')
      if (storedToken && !userData) {
        const { sub } = JSON.parse(decodeToken(storedToken.split('.')[1]))
        const userCollection = doc(FIREBASE_DB, `users/${sub}`);
        const querySnapshot = await getDoc(userCollection)
        const user = querySnapshot.data()
        if (user) {
          setUserData(user as IUser)
          setToken(storedToken)
        }
      }

    } catch (error) {
      throw error
    } finally {
      if (loading) setLoading(false)
    }
  }

  useEffect(() => {
    loadCredentials(true)
  }, [])

  const signIn = async (data: ICredentials) => {
    try {
      const { _tokenResponse } = await signInWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password)
      await setItemAsync('token', _tokenResponse.idToken)
      await loadCredentials()
    } catch (error) {
      throw error 
    }
  }

  const signUp = async (data: ISignup) => {
    try {
      const { user, _tokenResponse } = await createUserWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password);
      await addUser({ id: user.uid, name: data.name, lastName: data.lastName, email: data.email })
      await setItemAsync('token', _tokenResponse.idToken)
      await loadCredentials()
    } catch (error) {
      throw error
    }
  }

  const logOut = async () => {
    setToken('')
    setUserData(null)
    deleteItemAsync('token')
  }
  

  return (
    <AuthContext.Provider value={{ signIn, signUp, isLoading, token, logOut, userData }}>
      {props.children}
    </AuthContext.Provider>
  )
}