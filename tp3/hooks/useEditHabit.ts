import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '../config/firebase-config';

export const useEditHabit = (userId: string) => {
  const editHabit = async (habitId: string, updatedHabit: { name?: string; description?: string; importance?: string }) => {
    try {
      const habitDoc = doc(FIREBASE_DB, `users/${userId}/habits`, habitId);
      await updateDoc(habitDoc, {
        ...updatedHabit,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error editing habit:', error);
    }
  };

  return { editHabit };
};
