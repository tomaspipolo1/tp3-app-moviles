import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useNavigation } from 'expo-router';

import Header from '@/components/Header';
import { AuthProvider, useAuth } from '@/context/auth';
import { useEffect } from 'react';

const StackLayout = () => {
  const { isLoading, token } = useAuth()
  const navigation = useNavigation<any>()

  useEffect(() => {
    if (isLoading) return

    if (token) {
      navigation.reset({index: 0, routes: [{name: '(tabs)'}]})
    } else {
      navigation.reset({index: 0, routes: [{name: 'index'}]})
    }
  }, [isLoading])

  if (isLoading) return <View></View>

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          presentation: 'modal',
          title: '',
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />

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

export default function RootLayoutNav() {
  const colorScheme = useColorScheme();


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <StackLayout></StackLayout>
      </AuthProvider>
    </ThemeProvider>
  );
}
