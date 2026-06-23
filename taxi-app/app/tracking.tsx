import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// Split imports to avoid Metro bundler warnings in Expo
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

// --- Mock Route Data ---
const ROUTE_COORDINATES = [
    { latitude: 31.5160, longitude: 74.3540 }, // Driver Current Location
    { latitude: 31.5120, longitude: 74.3510 },
    { latitude: 31.5080, longitude: 74.3480 }, // Pickup Location
];

export default function TrackingScreen() {
    const initialRegion = {
        latitude: 31.5120,
        longitude: 74.3510,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    return (
        <View style={styles.container}>
            {/* --- Map Background --- */}
            <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={false}
            >
                {/* Route Line */}
                <Polyline
                    coordinates={ROUTE_COORDINATES}
                    strokeColor="#A855F7" // Primary Purple
                    strokeWidth={4}
                    lineCap="round"
                    lineJoin="round"
                />

                {/* Driver Marker */}
                <Marker coordinate={ROUTE_COORDINATES[0]} anchor={{ x: 0.5, y: 0.5 }}>
                    <View style={styles.driverMarkerContainer}>
                        <View style={styles.driverMarkerGlow}>
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/150?img=11' }} // Driver Avatar
                                style={styles.markerAvatar}
                            />
                        </View>
                        <View style={styles.markerTail} />
                    </View>
                </Marker>
            </MapView>

            {/* --- Right Side Map Controls --- */}
            <View style={styles.mapControlsRight}>
                <TouchableOpacity style={styles.controlButton} activeOpacity={0.8}>
                    <Ionicons name="locate" size={20} color="#A855F7" />
                </TouchableOpacity>

                <View style={styles.zoomControls}>
                    <TouchableOpacity style={styles.zoomButton} activeOpacity={0.8}>
                        <Ionicons name="add" size={20} color="#1C1C1E" />
                    </TouchableOpacity>
                    <View style={styles.zoomDivider} />
                    <TouchableOpacity style={styles.zoomButton} activeOpacity={0.8}>
                        <Ionicons name="remove" size={20} color="#1C1C1E" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- Main Info Card --- */}
            <View style={styles.mainCardContainer}>
                <View style={styles.mainCard}>

                    {/* Header: Title & Call Button */}
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.cardTitle}>Your Driver is on the way</Text>
                            <Text style={styles.etaText}>
                                Arriving in <Text style={styles.etaTime}>5 min</Text>
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.callButton} activeOpacity={0.7}>
                            <Ionicons name="call" size={18} color="#A855F7" />
                        </TouchableOpacity>
                    </View>

                    {/* Driver & Car Detail Box */}
                    <View style={styles.driverCarBox}>
                        {/* Driver Info */}
                        <View style={styles.driverSide}>
                            <View style={styles.avatarWrapper}>
                                <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={styles.driverAvatar} />
                                <View style={styles.ratingBadge}>
                                    <Ionicons name="star" size={8} color="#FFFFFF" />
                                    <Text style={styles.ratingText}>4.8</Text>
                                </View>
                            </View>
                            <View style={styles.driverTextCol}>
                                <Text style={styles.driverName}>Muhammad Ilyas</Text>
                                <Text style={styles.driverStatus}>Top Rated</Text>
                            </View>
                        </View>

                        {/* Car Info */}
                        <View style={styles.carSide}>
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3202/3202003.png' }} // Placeholder for actual car image
                                style={styles.carImage}
                                resizeMode="contain"
                            />
                            <View style={styles.carTextCol}>
                                <Text style={styles.carModel}>Toyota Corolla</Text>
                                <Text style={styles.carPlate}>XYZ 2020</Text>
                            </View>
                        </View>
                    </View>

                    {/* Location Timeline Box */}
                    <View style={styles.locationBox}>
                        <View style={styles.timelineGraphic}>
                            <View style={styles.timelineDot} />
                            <View style={styles.timelineLine} />
                            <View style={styles.timelineDot} />
                        </View>
                        <View style={styles.locationDetails}>
                            <View style={styles.locationRow}>
                                <Text style={styles.locationLabel}>Pickup</Text>
                                <Text style={styles.locationAddress}>689 st, barham road</Text>
                            </View>
                            <View style={[styles.locationRow, { marginTop: 12 }]}>
                                <Text style={styles.locationLabel}>Drop-off</Text>
                                <Text style={styles.locationAddress}>689 st, barham road</Text>
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                        <Ionicons name="shield-checkmark-outline" size={20} color="#FFFFFF" style={styles.btnIcon} />
                        <Text style={styles.primaryButtonText}>Share Trip Status</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} activeOpacity={0.7}>
                        <Text style={styles.cancelButtonText}>Cancel Ride</Text>
                    </TouchableOpacity>

                </View>
            </View>

            {/* --- Bottom Navigation --- */}
            <View style={styles.bottomNavContainer}>
                {/* Previous Rides Pull-up Handle */}
                <View style={styles.previousRidesHandle}>
                    <View style={styles.handleLeft}>
                        <Ionicons name="cube-outline" size={18} color="#1C1C1E" style={styles.handleIcon} />
                        <Text style={styles.handleTitle}>Previous Rides</Text>
                    </View>
                    <View style={styles.handleBadge}>
                        <Ionicons name="chevron-up" size={14} color="#1C1C1E" />
                        <Text style={styles.handleBadgeText}>4</Text>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabBar}>
                    <TouchableOpacity style={styles.tabItem}>
                        <Ionicons name="car-outline" size={24} color="#8E8E93" />
                        <Text style={styles.tabText}>Rides</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <Ionicons name="location-outline" size={24} color="#A855F7" />
                        <Text style={[styles.tabText, styles.activeTabText]}>On Map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <View>
                            <Ionicons name="notifications-outline" size={24} color="#8E8E93" />
                            <View style={styles.notificationDot} />
                        </View>
                        <Text style={styles.tabText}>Inbox</Text>
                    </TouchableOpacity>
                </View>
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

    // Map Marker
    driverMarkerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    driverMarkerGlow: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(168, 85, 247, 0.2)', // Soft purple glow
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
    markerTail: {
        width: 4,
        height: 12,
        backgroundColor: '#A855F7',
        marginTop: -4,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },

    // Map Controls (Right Side)
    mapControlsRight: {
        position: 'absolute',
        right: 20,
        bottom: 460, // Sits right above the main card
        alignItems: 'center',
        gap: 12,
    },
    controlButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    zoomControls: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    zoomButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomDivider: {
        height: 1,
        backgroundColor: '#EFEFEF',
        width: '100%',
    },

    // Main Card
    mainCardContainer: {
        position: 'absolute',
        bottom: 130, // Above the bottom nav
        left: 20,
        right: 20,
        zIndex: 10,
    },
    mainCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    etaText: {
        fontSize: 13,
        color: '#8E8E93',
        fontWeight: '500',
    },
    etaTime: {
        color: '#A855F7',
        fontWeight: '700',
    },
    callButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: '#A855F7',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    // Driver & Car Box
    driverCarBox: {
        flexDirection: 'row',
        backgroundColor: '#F7F2FF', // Very light purple
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    driverSide: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarWrapper: {
        position: 'relative',
        marginRight: 10,
    },
    driverAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    ratingBadge: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        backgroundColor: '#A855F7',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#F7F2FF',
    },
    ratingText: {
        color: '#FFFFFF',
        fontSize: 8,
        fontWeight: '700',
        marginLeft: 2,
    },
    driverTextCol: {
        justifyContent: 'center',
    },
    driverName: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    driverStatus: {
        fontSize: 11,
        color: '#8E8E93',
        fontWeight: '500',
    },
    carSide: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    carImage: {
        width: 50,
        height: 30,
        marginRight: 8,
    },
    carTextCol: {
        alignItems: 'flex-end',
    },
    carModel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    carPlate: {
        fontSize: 11,
        fontWeight: '700',
        color: '#A855F7',
    },

    // Location Timeline Box
    locationBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    timelineGraphic: {
        alignItems: 'center',
        marginRight: 12,
        marginTop: 4,
    },
    timelineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#A855F7',
        backgroundColor: '#FFFFFF',
    },
    timelineLine: {
        width: 1.5,
        height: 24,
        backgroundColor: '#E5E5EA',
        marginVertical: 2,
    },
    locationDetails: {
        flex: 1,
    },
    locationRow: {
        justifyContent: 'center',
    },
    locationLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#A855F7',
        marginBottom: 2,
    },
    locationAddress: {
        fontSize: 11,
        color: '#8E8E93',
        fontWeight: '400',
    },

    // Buttons
    primaryButton: {
        flexDirection: 'row',
        backgroundColor: '#A855F7',
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    btnIcon: {
        marginRight: 8,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    cancelButton: {
        alignItems: 'center',
        paddingVertical: 4,
    },
    cancelButtonText: {
        color: '#6B6B76',
        fontSize: 14,
        fontWeight: '600',
    },

    // Bottom Navigation
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FAFAFC',
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