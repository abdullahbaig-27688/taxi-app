import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
const IRAQ_DRIVERS = [
    { id: '1', name: 'Ahmed Khan', rating: '4.9', time: '2 min away', plate: 'بغداد - ٥٨٣٩٢', avatar: 'https://i.imgur.com/W7S0v0p.png', image: require('../../assets/images/nearme1.png') },
    { id: '2', name: 'Mustafa Ali', rating: '5.0', time: '3 min away', plate: 'أربيل - ٢٠٤٨١', avatar: 'https://i.imgur.com/twHofw2.png', image: require('../../assets/images/nearme2.png') },
    { id: '3', name: 'Ali Hussein', rating: '4.7', time: '5 min away', plate: 'البصرة - ٩٩٢٣٤', avatar: 'https://i.imgur.com/K386E8v.png', image: require('../../assets/images/nearme1.png') },
    { id: '4', name: 'Omar Jamil', rating: '4.9', time: '6 min away', plate: 'بغداد - ١٠٧٥٤', avatar: 'https://i.imgur.com/v06F2L3.png', image: require('../../assets/images/nearme2.png') },
];

export default function NearbyDrivers() {

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nearby</Text>

            <View style={styles.gridContainer}>
                {IRAQ_DRIVERS.map((driver) => {
                    return (
                        <Pressable key={driver.id} style={styles.card} onPress={() => {
                            router.push({
                                pathname: '/book',
                                params: {
                                    id: driver.id,
                                    name: driver.name,
                                    rating: driver.rating,
                                    time: driver.time,
                                    plate: driver.plate,
                                    avatar: driver.avatar,
                                }
                            });

                        }}>


                            <View style={styles.leftTopContainer}>
                                <Image source={{ uri: driver.avatar }} style={styles.avatarImg} resizeMode="contain" />
                                <Text style={styles.driverName} numberOfLines={1}>{driver.name}</Text>
                            </View>


                            <View style={styles.mainContentWrapper}>


                                <View style={styles.middleContainer}>
                                    <Image
                                        source={driver.image}
                                        style={styles.carImg}
                                        resizeMode="contain"
                                    />
                                    <View style={styles.plateBox}>
                                        <Text style={styles.plateText}>{driver.plate}</Text>
                                    </View>
                                </View>


                                <View style={styles.footerRow}>

                                    <View style={styles.ratingBadge}>
                                        <Ionicons name="star" size={11} color="#F9C22E" />
                                        <Text style={styles.ratingText}>{driver.rating}</Text>
                                    </View>


                                    <Text style={styles.timeText}>⏱️ {driver.time}</Text>
                                </View>
                            </View>

                        </Pressable>
                    );
                })}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: 22,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 14,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 14,
    },
    card: {
        width: '47.8%',
        backgroundColor: '#F6F6F9',
        borderRadius: 24,
        padding: 14,
        minHeight: 200,
        position: 'relative',
    },
    leftTopContainer: {
        position: 'absolute',
        left: 12,
        top: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        maxWidth: '85%',
        zIndex: 5,
    },
    avatarImg: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#E4F4F5',
    },
    driverName: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    mainContentWrapper: {
        flex: 1,
        marginTop: 28,
        justifyContent: 'space-between',
    },
    middleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 2,
    },
    carImg: {
        width: '100%',
        height: 125,
    },
    plateBox: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginTop: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 2,
        elevation: 1,
    },
    plateText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#3A3A3C',
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 4,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EBE6FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        gap: 4,
    },
    ratingText: {
        color: '#6236FF',
        fontSize: 11,
        fontWeight: '700',
    },
    timeText: {
        fontSize: 11,
        color: '#555555',
        fontWeight: '700',
    },
});