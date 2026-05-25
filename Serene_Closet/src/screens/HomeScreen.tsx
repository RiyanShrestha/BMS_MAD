import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Menu, Bell } from '../components/Icons';
import { THEME } from '../theme';
import { IMAGES, TRENDING_PRODUCTS } from '../utils/mockData';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { FashionCard } from '../components/FashionCard';
import { AIRecommendationCard } from '../components/AIRecommendationCard';

export const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Top Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity activeOpacity={0.8} style={styles.navIcon}>
          <Menu size={20} color={THEME.colors.darkText} strokeWidth={1.5} />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SERENE</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Closet')}
          style={styles.avatarContainer}
        >
          <Image source={{ uri: IMAGES.avatar }} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Editorial Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingSub}>WELCOME TO SERENE</Text>
          <Text style={styles.greetingMain}>Good morning, Sarswati.</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <SearchBar
            placeholder="Search collections, fabrics, styles..."
            onFilterPress={() => navigation.navigate('Explore')}
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
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.viewAllBtn}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
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
      </ScrollView>
    </SafeAreaView>
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
    borderBottomWidth: 1,
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
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.darkText,
    letterSpacing: 6,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 90, // Leave room for floating bottom tab navigation!
  },
  greetingContainer: {
    paddingHorizontal: THEME.spacing.md,
    paddingTop: THEME.spacing.lg,
    paddingBottom: THEME.spacing.sm,
  },
  greetingSub: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 2,
    color: THEME.colors.primaryBurgundy,
    marginBottom: 4,
  },
  greetingMain: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 26,
    color: THEME.colors.darkText,
  },
  searchWrapper: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.sm,
    marginBottom: THEME.spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.md,
    marginBottom: THEME.spacing.sm + 2,
  },
  sectionTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 20,
    color: THEME.colors.darkText,
  },
  sectionSubtitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    color: THEME.colors.secondaryText,
    marginTop: 2,
  },
  viewAllBtn: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 11,
    letterSpacing: 1,
    color: THEME.colors.primaryBurgundy,
    textTransform: 'uppercase',
  },
  horizontalScroll: {
    paddingLeft: THEME.spacing.md,
    paddingBottom: THEME.spacing.md,
  },
  heroCard: {
    marginTop: THEME.spacing.xs,
  },
});
