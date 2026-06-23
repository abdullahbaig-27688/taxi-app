import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SavedAddress, useSavedAddresses } from '../../hooks/useSavedAddress';

const AddressCard = ({ item, onDelete }: { item: SavedAddress; onDelete: (id: string) => void }) => {
    const router = useRouter();

    const handleDelete = () => {
        Alert.alert(
            'Delete Address',
            `Remove "${item.title}" from your saved places?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => onDelete(item.id) },
            ]
        );
    };

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardTopLabel}>{item.label}</Text>

            <View style={styles.cardRow}>
                <View style={styles.iconWrapper}>
                    <Ionicons name="location-outline" size={20} color="#1C1C1E" />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.addressTitle}>{item.title}</Text>
                    <Text style={styles.addressSubtitle}>{item.fullAddress}</Text>
                    {(item.houseNumber || item.phoneNumber) && (
                        <Text style={styles.detailsText}>
                            {item.houseNumber ? `House: ${item.houseNumber}` : ''}
                            {item.houseNumber && item.phoneNumber ? ' | ' : ''}
                            {item.phoneNumber ? `Tel: ${item.phoneNumber}` : ''}
                        </Text>
                    )}
                </View>

                <View style={styles.actionsColumn}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => {
                            router.push({
                                pathname: '/editAdress',
                                params: {
                                    id: item.id,
                                    title: item.title,
                                    fullAddress: item.fullAddress,
                                    label: item.label,
                                    houseNumber: item.houseNumber,
                                    phoneNumber: item.phoneNumber,
                                },
                            });
                        }}
                    >
                        <Ionicons name="create-outline" size={18} color="#A855F7" />
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuButton} activeOpacity={0.6} onPress={handleDelete}>
                        <Ionicons name="ellipsis-horizontal" size={20} color="#1C1C1E" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default function SavedPlacesScreen() {
    const router = useRouter();
    const { addresses, loading, error, deleteAddress, refetch } = useSavedAddresses();

    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );

    const handleDelete = async (id: string) => {
        try {
            await deleteAddress(id);
        } catch (err) {
            Alert.alert('Error', err instanceof Error ? err.message : 'Failed to delete address.');
        }
    };

    const renderHeader = () => (
        <View style={styles.headerSection}>
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

            <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.7}
                onPress={() => router.push('/editAdress')}
            >
                <Ionicons name="add" size={18} color="#1C1C1E" style={styles.addIcon} />
                <Text style={styles.addButtonText}>Add New Address</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, styles.centered]}>
                <ActivityIndicator color="#A855F7" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[styles.container, styles.centered]}>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AddressCard item={item} onDelete={handleDelete} />}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No saved places yet. Add your first address above.</Text>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDFBFF' },
    centered: { justifyContent: 'center', alignItems: 'center' },
    errorText: { color: '#FF3B30', fontSize: 14, fontWeight: '600', textAlign: 'center', paddingHorizontal: 24 },
    emptyText: { color: '#8E8E93', fontSize: 14, textAlign: 'center', marginTop: 20 },
    flatListContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
    headerSection: { marginBottom: 24 },
    navRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
    backButton: {
        width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3F3F5',
        justifyContent: 'center', alignItems: 'center', marginRight: 16,
    },
    screenTitle: { fontSize: 18, fontWeight: '600', color: '#1C1C1E' },
    addButton: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EFEFEF',
        borderRadius: 18, height: 56,
    },
    addIcon: { marginRight: 8 },
    addButtonText: { fontSize: 15, fontWeight: '600', color: '#1C1C1E' },
    cardContainer: {
        backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EFEFEF',
        borderRadius: 20, padding: 20, marginBottom: 16,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02, shadowRadius: 8, elevation: 1,
    },
    cardTopLabel: { fontSize: 14, fontWeight: '700', color: '#1C1C1E', marginBottom: 16 },
    cardRow: { flexDirection: 'row', alignItems: 'center' },
    iconWrapper: {
        width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3F3F5',
        justifyContent: 'center', alignItems: 'center', marginRight: 16,
    },
    textContainer: { flex: 1 },
    addressTitle: { fontSize: 15, fontWeight: '600', color: '#1C1C1E', marginBottom: 4 },
    addressSubtitle: { fontSize: 13, color: '#8E8E93', fontWeight: '400' },
    detailsText: { fontSize: 12, color: '#A855F7', fontWeight: '500', marginTop: 4 },
    menuButton: { padding: 4 },
    actionsColumn: { alignItems: 'flex-end', justifyContent: 'center', gap: 8 },
    editButton: {
        flexDirection: 'row', alignItems: 'center', gap: 4,
        paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: '#F7F2FF',
    },
    editText: { fontSize: 12, fontWeight: '600', color: '#A855F7' },
});