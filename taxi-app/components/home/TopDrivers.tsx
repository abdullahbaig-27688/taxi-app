import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TopDrivers() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Top rated</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View key={item} style={styles.avatarWrapper}>
            <View style={styles.avatarPlaceholder}>
              <View style={styles.badge}>
                <Text style={{ fontSize: 8 }}>👑</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2432',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  container: {
    paddingHorizontal: 16,
    gap: 14,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarPlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#EAE9FF',
    borderWidth: 2,
    borderColor: '#6C5CE7',
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFF',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});