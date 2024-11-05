import { useState } from 'react';
import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../config/firebase-config';

interface ICreateUserData{
  id: string
  name: string
  lastName: string
  email: string
  age?: number
}

export const useAddUser = () => {
  const [loading, setLoading] = useState(false);

  const addUser = async (data: ICreateUserData) => {
    setLoading(true);
    try {
      const userDocRef = doc(FIREBASE_DB, "users", data.id);
      await setDoc(userDocRef, {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      
    } catch (error) {
      console.error('Error adding user:', error);
      
    } finally {
        setLoading(false)
    }
  };

  return { addUser, loading };
};
