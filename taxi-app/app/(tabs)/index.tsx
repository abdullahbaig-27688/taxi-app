import { useRide } from '@/hooks/userRide';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/home/Header';
import NearbyDrivers from '../../components/home/NearbyDrivers';
import PromoBanner from '../../components/home/PromoBanner';
import SearchCard from '../../components/home/SearchCard';
import TopDrivers from '../../components/home/TopDrivers';
import VehicleCategories from '../../components/home/VehicleCategories';

import { useCurrentLocation } from '../../hooks/useCurrentLocation';
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

  const {
    location: currentLocation,
    loading: locationLoading,
    error: locationError,
  } = useCurrentLocation();

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupEditedByUser, setPickupEditedByUser] = useState(false);

  const loading = userLoading || rideLoading;

  // Auto-fill pickup once GPS resolves, unless the user already typed something
  useEffect(() => {
    if (currentLocation && !pickupEditedByUser) {
      setPickup(currentLocation.address);
    }
  }, [currentLocation, pickupEditedByUser]);

  // Wraps SearchCard's setPickup so we can tell "auto-filled" apart from "user typed"
  const handlePickupChange = (value: string) => {
    setPickupEditedByUser(true);
    setPickup(value);
  };

  const handleEstimateRide = async () => {

    if (!currentLocation) {
      console.log("No current location yet, can't estimate ride");
      return;
    }

    console.log("Pickup:", pickup);
    console.log("Dropoff:", dropoff);

    const result = await estimateRide({

      pickupLat: currentLocation.lat,
      pickupLng: currentLocation.lng,

      dropoffLat: 33.738,
      dropoffLng: 73.0845,

      vehicleCategory: "economy"

    });

    console.log("Estimate:", result);

  };

  const handleRequestRide = async () => {

    if (!currentLocation) {
      console.log("No current location yet, can't request ride");
      return;
    }

    const result = await requestRide({

      pickupLat: currentLocation.lat,
      pickupLng: currentLocation.lng,

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

          setPickup={handlePickupChange}

          setDropoff={setDropoff}

          pickupLoading={locationLoading}

          pickupError={locationError}

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