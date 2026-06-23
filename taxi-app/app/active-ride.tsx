import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// Split imports to avoid Metro bundler warnings
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

// --- Mock Route Data ---
// These coordinates simulate the curved path seen in the design
const ROUTE_COORDINATES = [
    { latitude: 31.5204, longitude: 74.3587 }, // Driver current location
    { latitude: 31.5150, longitude: 74.3520 },
    { latitude: 31.5100, longitude: 74.3550 },
    { latitude: 31.5050, longitude: 74.3480 }, // Pickup/Destination point
];

export default function ActiveRideScreen() {
    const router = useRouter();

    const initialRegion = {
        latitude: 31.5125,
        longitude: 74.3530,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
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
                {/* The Route Path */}
                <Polyline
                    coordinates={ROUTE_COORDINATES}
                    strokeColor="#A855F7" // Purple route line
                    strokeWidth={4}
                    lineCap="round"
                    lineJoin="round"
                    lineDashPattern={[1, 0]} // Solid line for the main path
                />

                {/* Driver/Rider Avatar Marker */}
                <Marker coordinate={ROUTE_COORDINATES[0]} anchor={{ x: 0.5, y: 0.5 }}>
                    <View style={styles.avatarMarkerContainer}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?img=11' }} // Placeholder avatar
                            style={styles.markerAvatar}
                        />
                        {/* The little tail pointing down */}
                        <View style={styles.markerTail} />
                    </View>
                </Marker>

                {/* Destination/Pickup Pin */}
                <Marker coordinate={ROUTE_COORDINATES[ROUTE_COORDINATES.length - 1]}>
                    <View style={styles.destinationPin}>
                        <View style={styles.innerPin} />
                    </View>
                </Marker>
            </MapView>

            {/* --- Top Left Back Button --- */}
            <SafeAreaView style={styles.topControls} pointerEvents="box-none">
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    activeOpacity={0.8}
                >
                    <Ionicons name="arrow-back" size={20} color="#1C1C1E" />
                </TouchableOpacity>
            </SafeAreaView>

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

            {/* --- Bottom Sheet --- */}
            <View style={styles.bottomSheet}>
                {/* Drag Handle Indicator */}
                <View style={styles.dragHandle} />

                {/* Rider Info Row */}
                <View style={styles.riderInfoRow}>
                    <View style={styles.riderTextContainer}>
                        <Text style={styles.riderName}>Muhammad Ilyas</Text>
                        <Text style={styles.riderLocation}>Barham Road</Text>
                    </View>
                    <TouchableOpacity style={styles.callButton} activeOpacity={0.7}>
                        <Ionicons name="call-outline" size={20} color="#1C1C1E" />
                    </TouchableOpacity>
                </View>

                {/* Main Action Button */}
                <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                    <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" style={styles.btnIcon} />
                    <Text style={styles.primaryButtonText}>Picked Up</Text>
                </TouchableOpacity>

                {/* Cancel Ride Text Button */}
                <TouchableOpacity style={styles.cancelButton} activeOpacity={0.7}>
                    <Text style={styles.cancelButtonText}>Cancel Ride</Text>
                </TouchableOpacity>

                {/* Bottom Action Menu */}
                <View style={styles.actionMenuRow}>
                    <TouchableOpacity style={[styles.actionMenuItem, styles.activeActionMenuItem]}>
                        <Ionicons name="compass-outline" size={22} color="#1C1C1E" />
                        <Text style={[styles.actionMenuText, styles.activeActionMenuText]}>Navigate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionMenuItem}>
                        <Ionicons name="chatbox-ellipses-outline" size={22} color="#8E8E93" />
                        <Text style={styles.actionMenuText}>Rider Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionMenuItem}>
                        <Ionicons name="headset-outline" size={22} color="#8E8E93" />
                        <Text style={styles.actionMenuText}>Support</Text>
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

    // --- Map Markers ---
    avatarMarkerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        elevation: 8,
    },
    markerAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    markerTail: {
        width: 4,
        height: 12,
        backgroundColor: '#A855F7',
        marginTop: -2,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
    destinationPin: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(168, 85, 247, 0.2)', // Light purple glow
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#A855F7',
    },
    innerPin: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#A855F7',
    },

    // --- Floating Controls ---
    topControls: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 40 : 20,
        left: 20,
    },
    backButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    mapControlsRight: {
        position: 'absolute',
        right: 20,
        top: '40%', // Vertically centered on the right
        alignItems: 'center',
        gap: 12,
    },
    controlButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
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
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    zoomButton: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomDivider: {
        height: 1,
        backgroundColor: '#EFEFEF',
        width: '100%',
    },

    // --- Bottom Sheet ---
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 15,
    },
    dragHandle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E5E5EA',
        alignSelf: 'center',
        marginBottom: 20,
    },
    riderInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    riderTextContainer: {
        flex: 1,
    },
    riderName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    riderLocation: {
        fontSize: 13,
        color: '#8E8E93',
        fontWeight: '500',
    },
    callButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F3F3F5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Primary Button
    primaryButton: {
        flexDirection: 'row',
        backgroundColor: '#A855F7',
        height: 56,
        borderRadius: 28, // Fully rounded pill shape
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        marginBottom: 16,
    },
    btnIcon: {
        marginRight: 8,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },

    // Cancel Button
    cancelButton: {
        alignItems: 'center',
        paddingVertical: 8,
        marginBottom: 24,
    },
    cancelButtonText: {
        fontSize: 14,
        color: '#6B6B76', // Dark gray
        fontWeight: '600',
    },

    // Bottom Action Menu
    actionMenuRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 24,
        padding: 6,
    },
    actionMenuItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 20,
        gap: 4,
    },
    activeActionMenuItem: {
        backgroundColor: '#F3F3F5', // Gray highlight for active tab
    },
    actionMenuText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#8E8E93',
    },
    activeActionMenuText: {
        color: '#1C1C1E',
    },
});