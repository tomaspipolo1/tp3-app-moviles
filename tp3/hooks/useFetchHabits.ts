import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../config/firebase-config';

// Hook para obtener los habitos de un usuario

export interface Habit {
    id: string
    name: string
    description: string
    importance: string
    timeFrom: string
    timeTo: string
    createdAt?: Date
    updatedAt?: Date
  }

  export const useFetchHabits = (userId: string) => {  
    const fetchHabits = async () => {
      try {
        const habitsCollection = collection(FIREBASE_DB, `users/${userId}/habits`);
        const querySnapshot = await getDocs(habitsCollection);
        const habitsData: Habit[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Habit)); 
        
        return habitsData
      } catch (error) {
        console.error('Error fetching habits:', error);
        throw error
      }
    };
  
    return {fetchHabits };
  };