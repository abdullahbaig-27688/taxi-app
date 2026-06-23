import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// --- Types ---
interface Review {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  comment: string;
}

// --- Mock Data ---
const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Muhammad Ilyas',
    avatarUrl: 'https://i.pravatar.cc/150?img=11', // Placeholder avatar
    rating: 4.5,
    comment: 'Very professional driver. Vehicle was clean and comfortable. Reached on time. Excellent service and polite behavior.',
  },
  {
    id: '2',
    name: 'Muhammad Ilyas',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    rating: 4.5,
    comment: 'Very professional driver. Vehicle was clean and comfortable. Reached on time. Excellent service and polite behavior.',
  },
  {
    id: '3',
    name: 'Muhammad Ilyas',
    avatarUrl: 'https://i.pravatar.cc/150?img=13',
    rating: 4.5,
    comment: 'Very professional driver. Vehicle was clean and comfortable. Reached on time. Excellent service and polite behavior.',
  },
  {
    id: '4',
    name: 'Muhammad Ilyas',
    avatarUrl: 'https://i.pravatar.cc/150?img=14',
    rating: 4.5,
    comment: 'Very professional driver. Vehicle was clean and comfortable. Reached on time. Excellent service and polite behavior.',
  },
];

// --- Sub-Components ---

// 1. Rating Progress Bar Component
const RatingBar = ({ stars, percentage }: { stars: number; percentage: number }) => (
  <View style={styles.ratingBarContainer}>
    <Text style={styles.ratingBarText}>{stars}</Text>
    <Ionicons name="star" size={12} color="#FFC107" style={styles.ratingBarStarIcon} />
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
    </View>
  </View>
);

// 2. Individual Review Card Component
const ReviewCard = ({ review }: { review: Review }) => (
  <View style={styles.cardContainer}>
    <Image source={{ uri: review.avatarUrl }} style={styles.avatar} />
    <View style={styles.cardContent}>
      <View style={styles.cardHeader}>
        <Text style={styles.reviewerName}>{review.name}</Text>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#FFC107" />
          <Text style={styles.ratingBadgeText}>{review.rating}</Text>
        </View>
      </View>
      <Text style={styles.commentText}>{review.comment}</Text>
    </View>
  </View>
);

// --- Main Screen Component ---
export default function ReviewsScreen() {
  const router = useRouter();

  const renderHeader = () => (
    <View style={styles.listHeaderSection}>
      {/* Top Navigation Row */}
      <View style={styles.navRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Reviews</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add" size={24} color="#1C1C1E" />
        </TouchableOpacity>
      </View>

      {/* Overall Score Section */}
      <View style={styles.scoreSection}>
        {/* Left Side: Progress Bars */}
        <View style={styles.barsContainer}>
          <RatingBar stars={5} percentage={80} />
          <RatingBar stars={4} percentage={60} />
          <RatingBar stars={3} percentage={40} />
          <RatingBar stars={2} percentage={20} />
          <RatingBar stars={1} percentage={10} />
        </View>

        {/* Right Side: Total Score */}
        <View style={styles.overallScoreContainer}>
          <Text style={styles.hugeScoreText}>4.9</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4].map((i) => (
              <Ionicons key={i} name="star" size={16} color="#FFC107" style={styles.starIcon} />
            ))}
            <Ionicons name="star-half" size={16} color="#FFC107" style={styles.starIcon} />
          </View>
          <Text style={styles.totalReviewsText}>32 Reviews</Text>
        </View>
      </View>

      {/* List Title */}
      <Text style={styles.listTitle}>Reviews (250)</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MOCK_REVIEWS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewCard review={item} />}
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
    backgroundColor: '#FDFBFF',
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  listHeaderSection: {
    marginBottom: 16,
  },
  
  // Navigation Header
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F3F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
  },

  // Score Summary Section
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  barsContainer: {
    flex: 1,
    marginRight: 20,
    gap: 8,
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    width: 12,
  },
  ratingBarStarIcon: {
    marginHorizontal: 6,
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F3F5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6236FF', // Using your primary purple theme
    borderRadius: 3,
  },
  overallScoreContainer: {
    alignItems: 'flex-end',
  },
  hugeScoreText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: -4,
    marginBottom: 4,
  },
  starIcon: {
    marginHorizontal: 2,
  },
  totalReviewsText: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },

  // List Items
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    // Subtle shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  commentText: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 20,
  },
});