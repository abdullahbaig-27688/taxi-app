import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
// Split imports to avoid Metro bundler warnings in Expo
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

// --- Types ---
interface Ride {
    id: string;
    driverName: string;
    price: string;
    pickup: string;
    dropoff: string;
    avatarUrl: string;
}

// --- Mock Data ---
const MOCK_RIDES: Ride[] = [
    {
        id: '1',
        driverName: 'Asim munner',
        price: '4,000IQD',
        pickup: 'Baxtyary',
        dropoff: 'Ashty Street',
        avatarUrl: 'https://i.pravatar.cc/150?img=11',
    },
    {
        id: '2',
        driverName: 'Abdullah',
        price: '3,000IQD',
        pickup: 'Baxtyary',
        dropoff: 'Ashty Street',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
    },
    {
        id: '3',
        driverName: 'Abdullah',
        price: '2,000IQD',
        pickup: 'Baxtyary',
        dropoff: 'Ashty Street',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
    },
    {
        id: '4',
        driverName: 'Abdullah',
        price: '1,000IQD',
        pickup: 'Baxtyary',
        dropoff: 'Ashty Street',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
    },
];

// Mock Route Coordinates for the Polyline
const ROUTE_COORDINATES = [
    { latitude: 35.5550, longitude: 45.4350 }, // Example coordinates
    { latitude: 35.5520, longitude: 45.4380 },
    { latitude: 35.5490, longitude: 45.4350 },
    { latitude: 35.5450, longitude: 45.4400 },
];

// --- Sub-Components ---

// 1. Individual Ride Card
const RideCard = ({ ride }: { ride: Ride }) => (
    <View style={styles.cardContainer}>
        {/* Driver Avatar */}
        <Image source={{ uri: ride.avatarUrl }} style={styles.avatar} />

        {/* Card Details */}
        <View style={styles.cardContent}>
            {/* Top Row: Name & Price */}
            <View style={styles.topRow}>
                <Text style={styles.driverName}>{ride.driverName}</Text>
                <Text style={styles.price}>{ride.price}</Text>
            </View>

            {/* Bottom Row: Locations */}
            <View style={styles.locationRow}>
                <View style={[styles.dot, styles.pickupDot]} />
                <Text style={styles.locationText}>Pickup: {ride.pickup}</Text>

                <View style={styles.connectorLine} />

                <View style={[styles.dot, styles.dropoffDot]} />
                <Text style={styles.locationText}>Drop-off: {ride.dropoff}</Text>
            </View>
        </View>
    </View>
);

// --- Main Screen Component ---
export default function RidesScreen() {
    const initialRegion = {
        latitude: 35.5500,
        longitude: 45.4370,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    const renderHeader = () => (
        <View style={styles.sheetHeader}>
            <View style={styles.headerLeft}>
                <Ionicons name="cube-outline" size={20} color="#1C1C1E" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Previous Rides</Text>
            </View>
            <View style={styles.countBadge}>
                <Ionicons name="chevron-down" size={16} color="#1C1C1E" />
                <Text style={styles.countText}>{MOCK_RIDES.length}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* --- Map Background --- */}
            <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={false}
            >
                {/* Route Polyline */}
                <Polyline
                    coordinates={ROUTE_COORDINATES}
                    strokeColor="#A855F7" // Purple route line
                    strokeWidth={4}
                    lineCap="round"
                    lineJoin="round"
                />

                {/* Custom Avatar Marker */}
                <Marker coordinate={ROUTE_COORDINATES[0]}>
                    <View style={styles.markerContainer}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
                            style={styles.markerAvatar}
                        />
                    </View>
                </Marker>
            </MapView>

            {/* --- Bottom Overlay (Previous Rides List) --- */}
            <View style={styles.bottomSheet}>
                <FlatList
                    data={MOCK_RIDES}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <RideCard ride={item} />}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFBFF',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    // Custom Marker
    markerContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#A855F7', // Glowing purple shadow
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8,
    },
    markerAvatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
    },

    // Bottom Sheet
    bottomSheet: {
        position: 'absolute',
        bottom: 0, // This sits right above your bottom tabs if configured in Expo Router
        left: 0,
        right: 0,
        height: '65%', // Takes up the bottom 65% of the screen
        backgroundColor: '#FAFAFA', // Slightly off-white matching the design
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 10,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Extra padding at the bottom for scroll clearance
    },

    // Sheet Header
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    countBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EBEBEF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 4,
    },
    countText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1C1E',
    },

    // Ride Card
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        // Soft shadow for cards
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 14,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    driverName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    price: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1C1E',
    },

    // Location Row
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    pickupDot: {
        backgroundColor: '#6B6B76', // Dark gray
    },
    dropoffDot: {
        backgroundColor: '#00C566', // Bright green
    },
    connectorLine: {
        width: 20,
        height: 1,
        backgroundColor: '#EFEFEF',
        marginHorizontal: 6,
    },
    locationText: {
        fontSize: 11,
        color: '#8E8E93',
        fontWeight: '500',
        marginLeft: 4,
    },
});