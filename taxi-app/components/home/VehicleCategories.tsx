import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const IRAQ_TAXIS = [
  { id: 'all', label: 'All Taxis', icon: 'grid-outline', imageUrl: null },
  { id: 'economy', label: 'Economy', icon: 'car-outline', imageUrl: 'https://i.imgur.com/7N1K2mG.png' }, // Saipa / Elantra
  { id: 'premium', label: 'Premium', icon: 'car-sport-outline', imageUrl: 'https://i.imgur.com/uX88XvB.png' }, // Camry / Avalon
  { id: 'suv_family', label: 'Family', icon: 'car-outline', imageUrl: 'https://i.imgur.com/YV06oXb.png' }, // Tucson / Sportage
  { id: 'vip', label: 'VIP Business', icon: 'shield-checkmark-outline', imageUrl: 'https://i.imgur.com/T0bA76V.png' }, // Tahoe / Land Cruiser
];

export default function VehicleCategories() {
  const [selectedId, setSelectedId] = useState('all');

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {IRAQ_TAXIS.map((category) => {
        const isSelected = selectedId === category.id;
        
        return (
          <TouchableOpacity 
            key={category.id} 
            style={styles.itemContainer}
            onPress={() => setSelectedId(category.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.box, isSelected ? styles.boxSelected : styles.boxUnselected]}>
              {category.imageUrl ? (
                <Image 
                  source={{ uri: category.imageUrl }} 
                  style={styles.vehicleImage} 
                  resizeMode="contain" 
                />
              ) : (
                <Ionicons 
                  name={category.icon as any} 
                  size={26} 
                  color={isSelected ? '#6236FF' : '#1C1C1E'} 
                />
              )}
            </View>
            <Text style={styles.label} numberOfLines={1}>{category.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 14,
  },
  itemContainer: {
    alignItems: 'center',
    width: 76,
  },
  box: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  boxSelected: {
    backgroundColor: '#EBE6FF', 
  },
  boxUnselected: {
    backgroundColor: '#F6F6F9', 
  },
  vehicleImage: {
    width: '85%',
    height: '85%',
  },
  label: {
    fontSize: 12,
    color: '#1C1C1E',
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
});