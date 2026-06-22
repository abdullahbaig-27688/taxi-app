import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function RateRideScreen() {
  const router = useRouter();
  const [rating, setRating] = useState<number>(1);
  const [description, setDescription] = useState<string>('');

  const handleRatingSubmit = () => {
    // Add your API call or state update logic here
    console.log('Submitted Rating:', { rating, description });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            
            {/* Header Section */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={20} color="#1C1C1E" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Rate Your Ride</Text>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
              
              {/* Star Rating Section */}
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((starIndex) => {
                  const isSelected = starIndex <= rating;
                  return (
                    <TouchableOpacity
                      key={starIndex}
                      activeOpacity={0.7}
                      onPress={() => setRating(starIndex)}
                      style={[
                        styles.starBox,
                        isSelected ? styles.starBoxSelected : styles.starBoxUnselected,
                      ]}
                    >
                      <Ionicons
                        name="star"
                        size={24}
                        color={isSelected ? '#FFFFFF' : '#FFC107'}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Description Input Section */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Description</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Tell us about your ride experience .."
                    placeholderTextColor="#AEAEB2"
                    multiline
                    maxLength={200}
                    value={description}
                    onChangeText={setDescription}
                    textAlignVertical="top" // Ensures text starts at the top on Android
                  />
                </View>
                <Text style={styles.charCounter}>
                  {description.length}/200
                </Text>
              </View>
            </View>

            {/* Bottom Button */}
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.8}
              onPress={handleRatingSubmit}
            >
              <Text style={styles.submitButtonText}>Submit Rating</Text>
            </TouchableOpacity>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBFF',
  },
  keyboardView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
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
    fontWeight: '700',
    color: '#1C1C1E',
  },

  // Content Area
  content: {
    flex: 1,
  },
  
  // Stars
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
  },
  starBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starBoxSelected: {
    backgroundColor: '#FFC107',
    shadowColor: '#FFC107',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  starBoxUnselected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },

  // Input Section
  inputSection: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    height: 140,
    padding: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  charCounter: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#AEAEB2',
    fontWeight: '500',
    marginTop: 8,
  },

  // Submit Button
  submitButton: {
    backgroundColor: '#A855F7', // Soft purple matching the design
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
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});