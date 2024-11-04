import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '../config/firebase-config';

export const useAddHabit = (userId: string) => {
  const [isAdding, setIsAdding] = useState(false);

  const addHabit = async (habit: { name: string; description: string; importance: string }) => {
    setIsAdding(true);
    try {
      const habitsCollection = collection(FIREBASE_DB, `users/${userId}/habits`);
      await addDoc(habitsCollection, {
        ...habit,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding habit:', error);
      setIsAdding(false);
    }
  };

  return { addHabit, isAdding };
};
