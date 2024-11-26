import { doc, deleteDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../config/firebase-config';

export const useDeleteHabit = (userId: string) => {
  const deleteHabit = async (habitId: string) => {
    try {
      const habitDoc = doc(FIREBASE_DB, `users/${userId}/habits`, habitId);
      await deleteDoc(habitDoc);
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return { deleteHabit };
};
