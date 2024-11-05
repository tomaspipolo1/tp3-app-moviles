import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router'; 
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
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

  const displayDate = `Hoy, ${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1).toUpperCase}`; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Hoy, {formattedDate}</Text>
        </View>

        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications" size={28} color={ColorPalette.dark} />
        </TouchableOpacity>
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
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  backIcon: {
    marginRight: 10,
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 18,
    fontFamily: 'outfit-medium', 
    fontWeight: 'bold',
    color: ColorPalette.dark,
  },
  notificationIcon: {
    padding: 5,
  },
});
