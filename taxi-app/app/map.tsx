import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 33.6844,
                    longitude: 73.0479,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
});