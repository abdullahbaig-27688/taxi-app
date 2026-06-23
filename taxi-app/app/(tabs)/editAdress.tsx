import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSavedAddresses } from '../../hooks/useSavedAddress';

const EditSavedAdress = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; title?: string; fullAddress?: string; label?: string; houseNumber?: string; phoneNumber?: string; lat?: string; lng?: string }>();
  const { saveAddress, updateAddress } = useSavedAddresses();

  const [selectedType, setSelectedType] = useState(params.label || 'House');
  const [placeName, setPlaceName] = useState(params.title || '');
  const [houseNumber, setHouseNumber] = useState(params.houseNumber || '');
  const [phoneNumber, setPhoneNumber] = useState(params.phoneNumber || '');
  const [description, setDescription] = useState(params.fullAddress || '');
  const [loading, setLoading] = useState(false);

  // Sync state when returning from Choose Location with new params
  React.useEffect(() => {
    if (params.title) setPlaceName(params.title);
    if (params.fullAddress) setDescription(params.fullAddress);
    if (params.label) setSelectedType(params.label);
  }, [params.title, params.fullAddress, params.label]);

  const handleSave = async () => {
    if (!placeName.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in the place name and description.');
      return;
    }

    try {
      setLoading(true);
      const addressData = {
        label: selectedType,
        title: placeName,
        fullAddress: description,
        houseNumber,
        phoneNumber,
        lat: params.lat ? parseFloat(params.lat) : null,
        lng: params.lng ? parseFloat(params.lng) : null,
      };

      if (params.id) {
        await updateAddress(params.id, addressData);
      } else {
        await saveAddress(addressData);
      }

      Alert.alert('Success', 'Address saved successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to save address.');
    } finally {
      setLoading(false);
    }
  };

  const placeTypes = ['House', 'Apartment', 'work', 'Dormitory'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{params.id ? 'Edit Saved Place' : 'Add Saved Place'}</Text>
          </View>

          {/* Place Type Selector */}
          <View style={styles.typeContainer}>
            {placeTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeChip,
                  selectedType === type && styles.typeChipSelected,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.typeText,
                    selectedType === type && styles.typeTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form Fields */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Place Name</Text>
            <TextInput
              style={styles.input}
              value={placeName}
              onChangeText={setPlaceName}
              placeholder="Place Name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>House Number</Text>
            <TextInput
              style={styles.input}
              value={houseNumber}
              onChangeText={setHouseNumber}
              placeholder="house number"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number*</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              multiline
              textAlignVertical="top"
              maxLength={200}
            />
            <Text style={styles.charCount}>{description.length}/200</Text>
          </View>

        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.chooseLocationBtn} onPress={() => router.push("/chooseLocation")}>
            <Text style={styles.chooseLocationText}>Choose Location</Text>
            <MaterialIcons name="my-location" size={18} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveBtnText}>{loading ? 'Saving...' : 'Save Location'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 25,
  },
  typeChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
  },
  typeChipSelected: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  typeText: {
    fontSize: 14,
    color: '#4B5563',
  },
  typeTextSelected: {
    color: '#FFF',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#D1D5DB',
    marginTop: 8,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FAFAFA',
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  chooseLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#9F7AEA', // Purple border to match design
    backgroundColor: '#FFF',
    marginBottom: 15,
    gap: 8,
  },
  chooseLocationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    backgroundColor: '#A855F7', // Solid purple (Use react-native-linear-gradient for exact match)
  },
  saveBtnDisabled: {
    backgroundColor: '#D1D5DB',
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default EditSavedAdress;