import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Menu } from '../components/Icons';
import { THEME } from '../theme';
import { IMAGES, TRENDING_PRODUCTS } from '../utils/mockData';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { FashionCard } from '../components/FashionCard';
import { AIRecommendationCard } from '../components/AIRecommendationCard';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialImage } from '../components/EditorialImage';

type HomeScreenProps = {
  navigation: any;
};

export const HomeScreen = ({ navigation }: HomeScreenProps): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  
  // Fade-up reveals on mount
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: THEME.motion.durations.screen,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: THEME.motion.durations.screen,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleAvatarPress = () => {
    Vibration.vibrate(8);
    navigation.navigate('Profile');
  };

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Vibration.vibrate(5)}
          style={styles.navIcon}
        >
          <Menu size={20} color={THEME.colors.darkText} strokeWidth={1.5} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SERENE</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAvatarPress}
          style={styles.avatarWrapper}
        >
          <EditorialImage
            source={{ uri: IMAGES.avatar }}
            style={styles.avatar}
            containerStyle={styles.avatarContainer}
            enableOverlay={true}
          />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Editorial Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingSub}>WELCOME TO SERENE</Text>
          <Text style={styles.greetingMain}>Good morning, Sarswati.</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <SearchBar
            placeholder="Search collections, fabrics, styles..."
            onFilterPress={() => {
              Vibration.vibrate(8);
              navigation.navigate('Explore');
            }}
          />
        </View>

        {/* Weather Card Contextual Suggestion */}
        <WeatherCard
          location="Bangalore"
          temperature="24°C"
          condition="Breezy & Mild"
          recommendation="Perfect for a layered look. Pair the Double-Breasted Wool Trench over a silk draped top with tailored wool trousers."
          onActionPress={() => navigation.navigate('Stylist')}
        />

        {/* Trending Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <Text style={styles.sectionSubtitle}>CURATED AUTUMN EDITORIALS</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Vibration.vibrate(8);
              navigation.navigate('Explore');
            }}
          >
            <Text style={styles.viewAllBtn}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
          scrollEventThrottle={16}
        >
          {TRENDING_PRODUCTS.map((prod) => (
            <FashionCard
              key={prod.id}
              image={prod.image}
              title={prod.title}
              category={prod.category}
              onPress={() => navigation.navigate('Explore')}
            />
          ))}
        </ScrollView>

        {/* AI Stylist Picks Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>AI Stylist Picks</Text>
            <Text style={styles.sectionSubtitle}>GENERATED FOR YOUR ARCHIVE</Text>
          </View>
        </View>

        <AIRecommendationCard
          title="Minimalist Chic Look"
          subtitle="96% match for your style signature today"
          image="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800"
          onPress={() => navigation.navigate('Stylist')}
          style={styles.heroCard}
        />
      </Animated.ScrollView>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.softBeigeBackground,
  },
  navbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.md,
    backgroundColor: THEME.colors.softBeigeBackground,
    borderBottomWidth: 0.5,
    borderColor: THEME.colors.borderLight,
  },
  navIcon: {
    padding: THEME.spacing.xs,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.darkText,
    letterSpacing: 6,
  },
  avatarWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    overflow: 'hidden',
  },
  avatarContainer: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  greetingContainer: {
    paddingHorizontal: THEME.spacing.md,
    paddingTop: THEME.spacing.lg,
    paddingBottom: THEME.spacing.sm,
  },
  greetingSub: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8.5,
    letterSpacing: 2,
    color: THEME.colors.primaryBurgundy,
    marginBottom: 4,
  },
  greetingMain: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 24,
    color: THEME.colors.darkText,
  },
  searchWrapper: {
    paddingHorizontal: THEME.spacing.md,
    marginVertical: THEME.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
  },
  sectionTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 18,
    color: THEME.colors.darkText,
  },
  sectionSubtitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 7.5,
    letterSpacing: 1.5,
    color: THEME.colors.secondaryText,
    marginTop: 2,
  },
  viewAllBtn: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 10.5,
    letterSpacing: 1.2,
    color: THEME.colors.primaryBurgundy,
    textTransform: 'uppercase',
  },
  horizontalScroll: {
    paddingLeft: THEME.spacing.md,
    paddingRight: THEME.spacing.md,
    paddingBottom: THEME.spacing.md,
  },
  heroCard: {
    marginHorizontal: THEME.spacing.md,
  },
});
