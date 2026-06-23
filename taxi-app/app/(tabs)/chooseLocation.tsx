import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function SaveLocationScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    // Initial map region (Mocked coordinates, you can replace with actual user location)
    const initialRegion = {
        latitude: 31.5204, // Defaulting to Lahore coordinates for placeholder
        longitude: 74.3587,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
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
                <Marker coordinate={{ latitude: 31.5204, longitude: 74.3587 }}>
                    <View style={styles.customMarker}>
                        <Ionicons name="location" size={32} color="#A855F7" />
                    </View>
                </Marker>
            </MapView>

            {/* --- Top Overlay (Header & Search) --- */}
            <SafeAreaView style={styles.topOverlay} pointerEvents="box-none">
                <View style={styles.topContainer}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="arrow-back" size={20} color="#1C1C1E" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Choose location to save</Text>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search-outline" size={20} color="#1C1C1E" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Location"
                            placeholderTextColor="#AEAEB2"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>
            </SafeAreaView>

            {/* --- Floating Action Button (Current Location) --- */}
            <TouchableOpacity style={styles.fabLocation} activeOpacity={0.8}>
                <Ionicons name="locate" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            {/* --- Bottom Overlay (Location Info & Button) --- */}
            <View style={styles.bottomOverlay}>

                {/* Selected Location Card */}
                <View style={styles.locationCard}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name="location-outline" size={20} color="#1C1C1E" />
                    </View>
                    <View style={styles.locationTextContainer}>
                        <Text style={styles.locationTitle}>Chwar chra</Text>
                        <Text style={styles.locationSubtitle}>Barham road , XYZ 12/3</Text>
                    </View>
                </View>

                {/* Save Location Button */}
                <TouchableOpacity style={styles.saveButton} activeOpacity={0.8} onPress={() => router.back()}>
                    <Text style={styles.saveButtonText}>Save Location</Text>
                </TouchableOpacity>

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
    customMarker: {
        // Adds a subtle drop shadow to the map pin
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },

    // --- Top Overlay ---
    topOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    topContainer: {
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F3F3F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 16,
        height: 50,
        paddingHorizontal: 16,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        color: '#1C1C1E',
        fontWeight: '500',
    },

    // --- FAB ---
    fabLocation: {
        position: 'absolute',
        right: 24,
        bottom: 230, // Adjusted to float above the bottom card
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#A855F7', // Match your design theme
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },

    // --- Bottom Overlay ---
    bottomOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 30,
        paddingBottom: Platform.OS === 'ios' ? 40 : 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 10,
    },
    locationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 20,
    },
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F3F3F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    locationTextContainer: {
        flex: 1,
    },
    locationTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    locationSubtitle: {
        fontSize: 13,
        color: '#8E8E93',
        fontWeight: '400',
    },
    saveButton: {
        backgroundColor: '#A855F7',
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});