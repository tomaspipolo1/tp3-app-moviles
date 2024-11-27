import { Text, TouchableOpacity, View } from 'react-native';
import { Redirect, router, Stack } from 'expo-router';
import { useAuth } from '@/context/auth';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';

export default function AppLayout() {
  const { isLoading, token } = useAuth()

  if (isLoading) return <View></View>

  if (!token) {
    return <Redirect href="/welcome" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          header: () => <Header />,  
        }}
      />
    </Stack>
  )
}