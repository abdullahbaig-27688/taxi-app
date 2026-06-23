import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
// --- Mock Route Data ---
const ROUTE_COORDINATES = [
    { latitude: 31.5125, longitude: 74.3530 },
    { latitude: 31.5100, longitude: 74.3500 },
    { latitude: 31.5050, longitude: 74.3480 },
];

export default function DriverMapScreen() {
    const [isOnline, setIsOnline] = useState(true);

    const {
        id,
        name,
        rating,
        time,
        plate,
        avatar,
    } = useLocalSearchParams();

    // ✅ Safe fallback values
    const driverName = (name as string) || "Unknown Driver";
    const driverAvatar = (avatar as string) || "https://i.pravatar.cc/150?img=11";
    const driverRating = (rating as string) || "4.8";
    const driverPlate = (plate as string) || "N/A";
    const driverTime = (time as string) || "2 min away";

    const initialRegion = {
        latitude: 31.5085,
        longitude: 74.3500,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    return (
        <View style={styles.container}>

            {/* --- Map --- */}
            <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={false}
            >
                <Polyline
                    coordinates={ROUTE_COORDINATES}
                    strokeColor="#A855F7"
                    strokeWidth={4}
                />

                <Marker coordinate={ROUTE_COORDINATES[0]}>
                    <View style={styles.driverMarker}>
                        <Image
                            source={{ uri: driverAvatar }}
                            style={styles.markerAvatar}
                        />
                    </View>
                </Marker>
            </MapView>

            {/* --- Header --- */}
            <SafeAreaView style={styles.topHeaderContainer}>
                <View style={styles.topHeader}>

                    {/* Driver Info */}
                    <View style={styles.driverInfo}>
                        <Image
                            source={{ uri: driverAvatar }}
                            style={styles.headerAvatar}
                        />
                        <View style={[styles.statusDot, { backgroundColor: isOnline ? '#00C566' : '#8E8E93' }]} />
                        <View style={styles.headerTextCol}>
                            <Text style={styles.headerName}>{driverName}</Text>
                            <Text style={styles.headerStatus}>
                                {isOnline ? 'Online' : 'Offline'}
                            </Text>
                        </View>
                    </View>

                    {/* Earnings */}
                    <View style={styles.earningsCol}>
                        <Text style={styles.earningsLabel}>EARNINGS TODAY</Text>
                        <Text style={styles.earningsAmount}>18,500 IQD</Text>
                    </View>

                    {/* Toggle */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setIsOnline(!isOnline)}
                        style={[
                            styles.toggleSwitch,
                            { backgroundColor: isOnline ? '#00C566' : '#E5E5EA' }
                        ]}
                    >
                        <View style={[
                            styles.toggleThumb,
                            isOnline ? styles.toggleThumbRight : styles.toggleThumbLeft
                        ]}>
                            <Ionicons name="power" size={14} color="#333" />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* --- Request Card --- */}
            <View style={styles.requestCardContainer}>
                <View style={styles.requestCard}>

                    {/* Rider */}
                    <View style={styles.riderRow}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                            style={styles.riderAvatar}
                        />
                        <View style={styles.riderTextCol}>
                            <Text style={styles.riderName}>{name || "Rider"}</Text>
                            <Text style={styles.riderLocation}>{driverTime}</Text>
                        </View>
                    </View>

                    {/* Details */}
                    <View style={styles.detailsBox}>
                        <Text style={styles.detailsBoxTitle}>RIDER DETAILS</Text>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detailsLabel}>Vehicle</Text>
                            <Text style={styles.detailsValue}>Toyota Corolla</Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detailsLabel}>Rating</Text>
                            <Text style={styles.detailsValue}>{driverRating}</Text>
                        </View>

                        <View style={styles.detailsRow}>
                            <Text style={styles.detailsLabel}>Plate</Text>
                            <Text style={styles.detailsValue}>{driverPlate}</Text>
                        </View>
                    </View>


                    <TouchableOpacity
                        style={styles.bookButton}
                        onPress={() =>
                            router.push({
                                pathname: "/tracking",
                                params: {
                                    driver: JSON.stringify({
                                        id,
                                        name: driverName,
                                        rating: driverRating,
                                        time: driverTime,
                                        plate: driverPlate,
                                        avatar: driverAvatar,
                                    }),
                                },
                            })
                        }
                    >
                        <Text style={styles.bookButtonText}>Book Ride</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View >
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
    driverMarker: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(168, 85, 247, 0.2)', // Purple glow
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },

    // --- Top Header ---
    topHeaderContainer: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 40 : 10,
        left: 20,
        right: 20,
        zIndex: 10,
    },
    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    statusDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    headerTextCol: {
        marginLeft: 8,
    },
    headerName: {
        fontSize: 10,
        color: '#8E8E93',
        fontWeight: '600',
    },
    headerStatus: {
        fontSize: 12,
        color: '#1C1C1E',
        fontWeight: '700',
    },
    earningsCol: {
        alignItems: 'center',
    },
    earningsLabel: {
        fontSize: 9,
        color: '#8E8E93',
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    earningsAmount: {
        fontSize: 14,
        color: '#00C566',
        fontWeight: '800',
    },
    toggleSwitch: {
        width: 48,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    toggleThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    toggleThumbRight: {
        alignSelf: 'flex-end',
    },
    toggleThumbLeft: {
        alignSelf: 'flex-start',
    },

    // --- Request Card ---
    requestCardContainer: {
        position: 'absolute',
        bottom: 140, // Sits above the bottom nav
        left: 20,
        right: 20,
        zIndex: 10,
    },
    requestCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    progressBarTrack: {
        height: 4,
        backgroundColor: '#F3F3F5',
        borderRadius: 2,
        marginBottom: 20,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#A855F7',
        borderRadius: 2,
    },
    riderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    riderAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
    },
    riderTextCol: {
        flex: 1,
    },
    riderName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 2,
    },
    locationSubRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    riderLocation: {
        fontSize: 12,
        color: '#8E8E93',
        marginLeft: 4,
    },
    timerCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#1C1C1E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    tripStatsRow: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 16,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 12,
        color: '#8E8E93',
        fontWeight: '500',
    },
    detailsBox: {
        backgroundColor: '#F8F8FA',
        borderRadius: 20,
        padding: 16,
        marginBottom: 20,
    },
    detailsBoxTitle: {
        fontSize: 10,
        color: '#AEAEB2',
        fontWeight: '700',
        letterSpacing: 0.5,
        marginBottom: 12,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailsLabel: {
        fontSize: 13,
        color: '#1C1C1E',
        fontWeight: '600',
    },
    detailsValue: {
        fontSize: 13,
        color: '#1C1C1E',
        fontWeight: '700',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    starIcon: {
        marginTop: -2,
    },

    // Card Buttons
    bookButton: {
        flexDirection: 'row',
        backgroundColor: '#A855F7',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    btnIcon: {
        marginRight: 8,
    },
    bookButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    textLinkButton: {
        alignItems: 'center',
        marginBottom: 16,
    },
    textLink: {
        color: '#6B6B76',
        fontSize: 13,
        fontWeight: '600',
    },
    outlineButton: {
        height: 50,
        borderRadius: 25,
        borderWidth: 1.5,
        borderColor: '#A855F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outlineButtonText: {
        color: '#1C1C1E',
        fontSize: 14,
        fontWeight: '700',
    },

    // --- Bottom Nav Container ---
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FAFAFC', // Slightly off-white matching design
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 34 : 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 15,
    },
    previousRidesHandle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    handleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    handleIcon: {
        marginRight: 8,
    },
    handleTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    handleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EBEBEF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    handleBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    tabText: {
        fontSize: 10,
        color: '#8E8E93',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#A855F7',
    },
    notificationDot: {
        position: 'absolute',
        top: 0,
        right: 2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF3B30',
        borderWidth: 1.5,
        borderColor: '#FAFAFC',
    },
});
