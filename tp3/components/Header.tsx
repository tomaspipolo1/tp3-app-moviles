import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router'; 
import { ColorPalette } from '@/constants/Colors';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

export default function Header({ showBackButton = false, title }: HeaderProps) {
  const router = useRouter();


  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(currentDate); 

  const displayDate = `HOY, ${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1).toUpperCase}`; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Image
          source={require('@/assets/images/banner2.png')}
          style={styles.image}
        />
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Hoy, {formattedDate}</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: ColorPalette.header,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
    height: 120, 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  dateContainer: {
    paddingLeft: 20,
    position: 'absolute',
    textAlign: 'left',
  },
  dateText: {
    fontSize: 18,
    fontFamily: 'outfit-medium', 
    fontWeight: 'bold',
    color: ColorPalette.dark,
  },
  image: {
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover',
  },
});

