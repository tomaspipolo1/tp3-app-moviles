import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SkeletonItem from '@/components/SkeletonItem';
import { router, useFocusEffect } from 'expo-router';
import { Habit, useFetchHabits } from '@/hooks/useFetchHabits';
import { useAuth } from '@/context/auth';
import { MaterialIcons } from '@expo/vector-icons';
import { useDeleteHabit } from '@/hooks/useDeleteHabit';

const HabitListScreen = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [selectedFilter, setSelectedFilter] = useState('Todos'); 
  const { userData } = useAuth()
  const { fetchHabits } = useFetchHabits(userData?.id!)
  const { deleteHabit } = useDeleteHabit(userData?.id!)
  const [habits, setHabits] = useState<Habit[]>([])
  const navigation = useNavigation<any>()
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true)
          const _habits = await fetchHabits()
          setHabits(_habits)
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }, [])
  )

  const handleDelete = async (id: string) => {
    try {
      const _habits = habits.filter(e => e.id !== id)
      setHabits(_habits)
      await deleteHabit(id)
    } catch (error) {
      Alert.alert('No se pudo eliminar el habito.')
    }
  }

  const renderFilters = () => {
    const filters = ['Todos', 'Alto', 'Medio', 'Bajo'];
    
    return (
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.selectedFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };


  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>¡No tienes hábitos cargados!</Text>
      <Text style={styles.emptyStateSubText}>Carga tu primer hábito!</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/(add)/')} 
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );


  const renderHabits = () => {
    if (isLoading) {
      return (
        <View style={styles.skeletonContainer}>
          {[...Array(9)].map((_, index) => (
            <SkeletonItem
              key={index}
              width="95%"
              height={50}
              borderRadius={10}
              style={styles.skeletonItem}
            />
          ))}
        </View>
      );
    }

    if (habits.length === 0) {
      return renderEmptyState(); // Renderizar estado vacío si no hay hábitos
    }

    return (
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <View>
              <Text style={styles.habitText}>{item.name}</Text>
              <Text style={styles.habitText}>{item.description}</Text>
              <Text style={styles.habitText}>{`${item.timeFrom}-${item.timeTo}`}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Text>{item.importance}</Text>
              <TouchableOpacity style={{ padding: 5}} onPress={() => router.push({pathname: '/(add)', params: {habit: JSON.stringify(item)}})}>
                <MaterialIcons name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ padding: 5}}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtrar por</Text>
      {renderFilters()}
      {renderHabits()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  selectedFilterButton: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  selectedFilterText: {
    color: '#fff',
  },
  skeletonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  skeletonItem: {
    marginVertical: 8,
  },
  habitItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  habitText: {
    fontSize: 16,
    color: '#333',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyStateSubText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HabitListScreen;
