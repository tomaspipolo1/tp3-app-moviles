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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabsScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mis Hábitos" component={HabitListScreen} />
      <Tab.Screen name="Agregar Hábito" component={AddHabitScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {/* Configuracion de la pantalla de inicio de sesion */}
        <Stack.Screen name="index" options={{ headerShown: false }} component={WelcomeScreen} />

        {<Stack.Screen
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
        />}

        <Stack.Screen 
          name="(tabs)" 
          component={TabsScreen} 
          options={{ 
            headerShown: true,
            header: () => <Header/>,
           }} />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
