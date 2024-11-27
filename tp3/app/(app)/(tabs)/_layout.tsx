import React from 'react';
import { Tabs } from 'expo-router';
import {ColorPalette} from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: ColorPalette.btnPrimary, 
        tabBarInactiveTintColor: ColorPalette.dark, 
      }}>
      <Tabs.Screen
        name="(list)"
        options={{ 
          headerShown: false,
          title: 'Mis Hábitos',
          tabBarIcon: ({ color }) => <Ionicons name="fitness" size={28} color={color} />,
        }} 
      />
      <Tabs.Screen
        name="(add)"
        options={{ 
          headerShown: false, 
          title: 'Agregar Hábito',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={28} color={color} />,
        }} 
      />
      <Tabs.Screen
        name="(profile)"
        options={{ 
          headerShown: false,
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
        }}  
      />
    </Tabs>
    
  );
}
