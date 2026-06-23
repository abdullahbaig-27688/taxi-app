import { useRide } from '@/hooks/userRide';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/home/Header';
import NearbyDrivers from '../../components/home/NearbyDrivers';
import PromoBanner from '../../components/home/PromoBanner';
import SearchCard from '../../components/home/SearchCard';
import TopDrivers from '../../components/home/TopDrivers';
import VehicleCategories from '../../components/home/VehicleCategories';

import { useUserProfile } from '../../hooks/userProfile';


export default function HomeScreen() {


  const {
    user,
    loading: userLoading
  } = useUserProfile();



  const {
    estimateRide,
    requestRide,
    loading: rideLoading,
    error: rideError
  } = useRide();



  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");



  const loading = userLoading || rideLoading;



  const handleEstimateRide = async () => {


    console.log("Pickup:", pickup);
    console.log("Dropoff:", dropoff);



    const result = await estimateRide({

      // temporary coordinates
      pickupLat: 33.6844,
      pickupLng: 73.0479,

      dropoffLat: 33.738,
      dropoffLng: 73.0845,

      vehicleCategory: "economy"

    });


    console.log("Estimate:", result);

  };




  const handleRequestRide = async () => {


    const result = await requestRide({

      pickupLat: 33.6844,
      pickupLng: 73.0479,

      dropoffLat: 33.738,
      dropoffLng: 73.0845,

      vehicleCategory: "economy"

    });


    console.log("Ride Created:", result);

  };




  if (loading) {

    return (

      <SafeAreaView style={styles.container}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FDFBFF"
        />

        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#6C5CE7" />
        </View>

      </SafeAreaView>

    );

  }




  return (

    <SafeAreaView style={styles.container}>


      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FDFBFF"
      />



      <Header
        name={user?.fullname ?? 'Guest'}
      />



      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >



        <SearchCard

          pickup={pickup}

          dropoff={dropoff}

          setPickup={setPickup}

          setDropoff={setDropoff}

        />



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


  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  scrollContent: {
    paddingBottom: 24,
  },

});