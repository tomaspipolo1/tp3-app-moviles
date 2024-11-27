import { useAuth } from '@/context/auth'
import { Stack } from 'expo-router'
import React from 'react'

export default function ProfileLayout() {
  const {logOut} = useAuth()

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
    </Stack>
  )
}
