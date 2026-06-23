import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const IRAQ_TAXIS = [
  {
    id: 'all',
    label: 'All Taxis',
    icon: 'grid-outline',
    image: null
  },
  {
    id: 'economy',
    label: 'Economy',
    icon: 'car-outline',
    image: require('../../assets/images/economi.png')
  },
  {
    id: 'premium',
    label: 'Premium',
    icon: 'car-sport-outline',
    image: require('../../assets/images/premium.png')
  },
  {
    id: 'bike',
    label: 'Bike',
    icon: 'car-outline',
    image: require('../../assets/images/bike.png')
  },
  {
    id: 'auto',
    label: 'Auto',
    icon: 'shield-checkmark-outline',
    image: require('../../assets/images/auto.png')
  },
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
              {category.image ? (
                <Image
                  source={category.image}
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
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 12,
    color: '#1C1C1E',
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
});