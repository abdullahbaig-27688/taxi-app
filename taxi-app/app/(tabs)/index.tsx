import React from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/home/Header';
import NearbyDrivers from '../../components/home/NearbyDrivers';
import PromoBanner from '../../components/home/PromoBanner';
import SearchCard from '../../components/home/SearchCard';
import TopDrivers from '../../components/home/TopDrivers';
import VehicleCategories from '../../components/home/VehicleCategories';

export default function HomeScreen() {
  return (
    
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDFBFF" />
      <Header name="Ahmed Ibrahim" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchCard />
        <VehicleCategories />
        <PromoBanner />
        <TopDrivers />
        <NearbyDrivers />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBFF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
});