import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PromoBanner() {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.textBlock}>
        <Text style={styles.headingText}>Ride further, pay less</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.bulletItem}>⭐ 5 rated drivers</Text>
          <Text style={styles.bulletItem}>⏱️ quick pickup</Text>
        </View>
        
        <Text style={styles.bulletItem}>🚘 1000+ drivers</Text>

        <TouchableOpacity style={styles.bookButton} activeOpacity={0.8}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      <Image 
        source={{ uri: 'https://i.imgur.com/T0bA76V.png' }} 
        style={styles.bannerCarImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#8A56FF', 
    flexDirection: 'row',
    position: 'relative',
    minHeight: 160,
    overflow: 'hidden',
  },
  textBlock: {
    flex: 1.3,
    justifyContent: 'center',
    zIndex: 5,
  },
  headingText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 26,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  bulletItem: {
    fontSize: 12,
    color: '#E9E3FF',
    fontWeight: '600',
    marginTop: 2,
  },
  bookButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 22,
    marginTop: 14,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  bannerCarImage: {
    position: 'absolute',
    right: -15,
    bottom: -5,
    width: 175,
    height: 120,
    zIndex: 2,
  },
});