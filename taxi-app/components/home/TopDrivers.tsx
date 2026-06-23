import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const TOP_DRIVERS = [
  { id: '1', image: require('../../assets/images/ryder1.png') }, 
  { id: '2', image: require('../../assets/images/ryder2.png') },
  { id: '3', image: require('../../assets/images/ryder3.png') },
  { id: '4', image: require('../../assets/images/ryder4.png') },
  { id: '5', image: require('../../assets/images/ryder5.png') },
  { id: '6', image: require('../../assets/images/ryder6.png') },
];

export default function TopDrivers() {
  
  // 2. FlatList ke liye renderItem function
  const renderDriver = ({ item }: { item: any }) => (
    <View style={styles.avatarWrapper}>
      <View style={styles.avatarPlaceholder}>
        {/* Driver ki image */}
        <Image 
          source={item.image} 
          style={styles.driverImage} 
        />
       
      </View>
    </View>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Top rated</Text>
      
      {/* 3. ScrollView ki jagah FlatList */}
      <FlatList 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        data={TOP_DRIVERS}
        keyExtractor={(item) => item.id}
        renderItem={renderDriver}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2432',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  container: {
    paddingHorizontal: 16,
    gap: 14, // Newer React Native versions support gap here
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarPlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#EAE9FF',
    borderWidth: 2,
    borderColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Naya style image ko round aur theek se fit karne ke liye
  driverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 27, // Placeholder ke mutabiq
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFF',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    // iOS shadow for the badge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});