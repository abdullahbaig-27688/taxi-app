import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Types ---
interface SavedAddress {
    id: string;
    label: string; // e.g., "Address"
    title: string; // e.g., "work" or "Home"
    fullAddress: string;
}

// --- Mock Data ---
const MOCK_ADDRESSES: SavedAddress[] = [
    {
        id: '1',
        label: 'Address',
        title: 'work',
        fullAddress: 'Barham road , XYZ 12/3',
    },
    {
        id: '2',
        label: 'Address',
        title: 'Home',
        fullAddress: 'Barham road , XYZ 12/3',
    },
];

// --- Sub-Components ---

// 1. Individual Address Card
const AddressCard = ({ item }: { item: SavedAddress }) => (
    <View style={styles.cardContainer}>
        {/* Card Top Label */}
        <Text style={styles.cardTopLabel}>{item.label}</Text>

        {/* Card Main Content */}
        <View style={styles.cardRow}>
            <View style={styles.iconWrapper}>
                <Ionicons name="location-outline" size={20} color="#1C1C1E" />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.addressTitle}>{item.title}</Text>
                <Text style={styles.addressSubtitle}>{item.fullAddress}</Text>
            </View>

            <TouchableOpacity style={styles.menuButton} activeOpacity={0.6}>
                <Ionicons name="ellipsis-horizontal" size={20} color="#1C1C1E" />
            </TouchableOpacity>
        </View>
    </View>
);

// --- Main Screen Component ---
export default function SavedPlacesScreen() {
    const router = useRouter();

    // Header and "Add Address" button rendered at the top of the list
    const renderHeader = () => (
        <View style={styles.headerSection}>
            {/* Top Navigation Row */}
            <View style={styles.navRow}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={20} color="#1C1C1E" />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Saved Places</Text>
            </View>

            {/* Add New Address Button */}
            <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
                <Ionicons name="add" size={18} color="#1C1C1E" style={styles.addIcon} />
                <Text style={styles.addButtonText}>Add New Address</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={MOCK_ADDRESSES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AddressCard item={item} />}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderHeader}
            />
        </SafeAreaView>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFBFF', // Matches your app's base theme
    },
    flatListContent: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
    },
    headerSection: {
        marginBottom: 24,
    },

    // Navigation Header
    navRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
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
    screenTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
    },

    // Add Address Button
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 18,
        height: 56,
    },
    addIcon: {
        marginRight: 8,
    },
    addButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1C1C1E',
    },

    // Address Card
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        // Subtle shadow for depth
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
        elevation: 1,
    },
    cardTopLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 16,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
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
    textContainer: {
        flex: 1,
    },
    addressTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    addressSubtitle: {
        fontSize: 13,
        color: '#8E8E93',
        fontWeight: '400',
    },
    menuButton: {
        padding: 4, // Makes it easier to tap without expanding the icon bounds visually
    },
});