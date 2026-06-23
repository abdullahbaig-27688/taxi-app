import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SearchCard() {
  return (
    <View style={styles.container}>
      {/* From Input */}
      <View style={styles.inputPill}>
        <Ionicons name="person" size={18} color="#6236FF" style={styles.leadingIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.label}>From</Text>
          <Text style={styles.value} numberOfLines={1}>Abu Bakar St</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="locate-outline" size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* To Input */}
      <View style={styles.inputPill}>
        <Ionicons name="search-outline" size={18} color="#6236FF" style={styles.leadingIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.label}>To</Text>
          <Text style={styles.placeholder} numberOfLines={1}>Nadirabad</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="send" size={16} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 14,
    gap: 12,
  },
  inputPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  leadingIcon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#AEAEB2',
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    color: '#1C1C1E',
    fontWeight: '600',
    marginTop: 1,
  },
  placeholder: {
    fontSize: 15,
    color: '#1C1C1E',
    fontWeight: '600',
    marginTop: 1,
  },
});