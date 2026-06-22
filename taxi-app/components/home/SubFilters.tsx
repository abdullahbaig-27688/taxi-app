import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const SUB_FILTERS = [
  { id: 'nearby', label: 'Nearby', icon: 'location' },
  { id: 'top_rated', label: 'Top rated', icon: 'trophy' },
  { id: 'cheapest', label: 'Cheapest', icon: 'wallet' },
  { id: 'fast_arrival', label: 'Fast arrival', icon: 'speedometer' },
  { id: 'premium', label: 'Premium', icon: 'diamond' },
];

export default function SubFilters() {
  const [activeFilter, setActiveFilter] = useState('nearby');

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {SUB_FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <TouchableOpacity 
            key={filter.id} 
            style={styles.filterBtn}
            onPress={() => setActiveFilter(filter.id)}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={filter.icon as any} 
              size={26} 
              color={isActive ? '#6236FF' : '#A29EB6'} 
            />
            <Text style={[styles.filterLabel, isActive && styles.activeLabel]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    marginTop: 18,
    gap: 20,
  },
  filterBtn: {
    alignItems: 'center',
    gap: 6,
  },
  filterLabel: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#1C1C1E',
    fontWeight: '700',
  },
});