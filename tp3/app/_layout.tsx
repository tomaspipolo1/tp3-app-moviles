import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from '@/components/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Importo pantallas
import HabitListScreen from './(tabs)/HabitListScreen';
import AddHabitScreen from './(tabs)/AddHabitScreen';
import ProfileScreen from './(tabs)/ProfileScreen';
import LoginScreen from './login';
import WelcomeScreen from './index';

// Importo componentes
import Header from '@/components/Header';

// Importo Constantes
import { ColorPalette } from '@/constants/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabsScreen() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: ColorPalette.btnPrimary, 
      tabBarInactiveTintColor: ColorPalette.dark, 
    }}
    >
      <Tab.Screen
        name="Mis Hábitos"
        component={HabitListScreen}
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color }) => <Ionicons name="fitness" size={28} color={color} />,
        }} 
      />
      <Tab.Screen
        name="Agregar Hábito"
        component={AddHabitScreen}
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={28} color={color} />,
        }} 
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
        }}  
      />
    </Tab.Navigator>
  );
}

export default function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {/* Configuración de la pantalla de inicio de sesión */}
        <Stack.Screen name="index" options={{ headerShown: false }} component={WelcomeScreen} />

        <Stack.Screen
          name="login"
          component={LoginScreen}
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
          component={TabsScreen}
          options={{
            headerShown: true,
            header: () => <Header />,  
          }}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
