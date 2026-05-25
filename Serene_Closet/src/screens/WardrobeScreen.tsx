import React, { useEffect, useRef } from 'react';
import { SafeLayout } from '../components/SafeLayout';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Vibration,
} from 'react-native';
import { Sparkles, Plus, Cloud, ArrowRight } from '../components/Icons';
import { THEME } from '../theme';
import { IMAGES, MY_WARDROBE } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { WardrobeCard } from '../components/WardrobeCard';
import { EditorialImage } from '../components/EditorialImage';

export const WardrobeScreen = ({ navigation }: any) => {
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

  const handleGenerate = () => {
    Vibration.vibrate(10);
    navigation.navigate('Stylist');
  };

  const handleDigitize = () => {
    Vibration.vibrate(10);
    navigation.navigate('Scan');
  };

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Closet</Text>
        <Text style={styles.subtitle}>DIGITAL ARCHIVE & COGNITIVE UTILITY</Text>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        
        {/* Main: What Should I Wear Today Greeting & Generate card */}
        <View style={styles.heroSection}>
          <Text style={styles.heroGreeting}>What Should I Wear Today?</Text>
          
          <TouchableOpacity
            activeOpacity={0.94}
            onPress={handleGenerate}
            style={styles.generateCard}
          >
            <EditorialImage
              source={{ uri: IMAGES.abstractWardrobe }}
              style={styles.generateCardBg}
              containerStyle={StyleSheet.absoluteFill}
              enableOverlay={true}
            />
            <View style={styles.generateCardOverlay} />
            
            <GlassCard style={styles.generateInnerCard} opacity={0.84}>
              <View style={styles.sparkleRow}>
                <Sparkles size={14} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
                <Text style={styles.sparkleText}>COGNITIVE SYNTHESIS</Text>
              </View>
              <Text style={styles.generateTitle}>Generate Look</Text>
              <Text style={styles.generateSub}>AI will compose a styling recommendation from your current wardrobe archive.</Text>
              <View style={styles.arrowIcon}>
                <ArrowRight size={12} color={THEME.colors.primaryBurgundy} />
              </View>
            </GlassCard>
          </TouchableOpacity>
        </View>

        {/* Seasonal Stats Optimization Card */}
        <View style={styles.statsSection}>
          <GlassCard style={styles.statsCard} opacity={0.88}>
            <View style={styles.statsHeader}>
              <View>
                <Text style={styles.statsCategory}>Autumn/Winter '24 Capsule</Text>
                <Text style={styles.statsTemp}>Bangalore • 24°C</Text>
              </View>
              <Cloud size={22} color={THEME.colors.primaryBurgundy} strokeWidth={1.5} />
            </View>
            <View style={styles.divider} />
            <View style={styles.utilityContainer}>
              <View style={styles.utilityTextRow}>
                <Text style={styles.utilityLabel}>WARDROBE UTILITY</Text>
                <Text style={styles.utilityVal}>72% Optimized</Text>
              </View>
              <View style={styles.utilityTrack}>
                <View style={styles.utilityBar} />
              </View>
            </View>
          </GlassCard>
        </View>

        {/* Add item Quick capture deck */}
        <View style={styles.quickCaptureSection}>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleDigitize}
            style={styles.captureCard}
          >
            <View style={styles.captureIconCircle}>
              <Plus size={18} color={THEME.colors.primaryBurgundy} />
            </View>
            <View style={styles.captureTextMeta}>
              <Text style={styles.captureTitle}>Digitize New Item</Text>
              <Text style={styles.captureSub}>Upload photography or scan textile characteristics directly</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Digital Wardrobe Archives Grid */}
        <View style={styles.archiveHeader}>
          <Text style={styles.archiveTitle}>Wardrobe Archive</Text>
          <Text style={styles.archiveCount}>{MY_WARDROBE.length} PIECES</Text>
        </View>

        <View style={styles.gridContainer}>
          {MY_WARDROBE.map((item) => (
            <WardrobeCard
              key={item.id}
              image={item.image}
              title={item.title}
              category={item.category}
              lastWorn={item.lastWorn}
              wearCount={item.wearCount}
            />
          ))}
        </View>

      </Animated.ScrollView>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.softBeigeBackground,
  },
  scrollContent: {
    paddingBottom: 110, // Buffer for floating navigation tab
  },
  header: {
    paddingHorizontal: THEME.spacing.md,
    paddingTop: THEME.spacing.md,
    paddingBottom: THEME.spacing.xs,
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 22,
    color: THEME.colors.darkText,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    color: THEME.colors.secondaryText,
    marginTop: 2,
  },
  heroSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.lg,
  },
  heroGreeting: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 20,
    color: THEME.colors.darkText,
    marginBottom: THEME.spacing.md,
  },
  generateCard: {
    width: '100%',
    height: 220,
    borderRadius: THEME.borderRadius.card,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
    ...THEME.shadows.premiumDeep,
  },
  generateCardBg: {
    width: '100%',
    height: '100%',
  },
  generateCardOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(32, 21, 21, 0.22)',
  },
  generateInnerCard: {
    margin: THEME.spacing.md,
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.card - 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  sparkleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sparkleText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 1.5,
    marginLeft: 6,
  },
  generateTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 18,
    color: THEME.colors.darkText,
    marginBottom: 2,
  },
  generateSub: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 11,
    color: THEME.colors.secondaryText,
    lineHeight: 15,
  },
  arrowIcon: {
    position: 'absolute',
    bottom: THEME.spacing.md,
    right: THEME.spacing.md,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
  },
  statsSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.lg,
  },
  statsCard: {
    padding: THEME.spacing.md + 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsCategory: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12,
    color: THEME.colors.darkText,
    letterSpacing: 0.5,
  },
  statsTemp: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 16,
    color: THEME.colors.primaryBurgundy,
    marginTop: 2,
  },
  divider: {
    height: 0.5,
    backgroundColor: THEME.colors.border,
    marginVertical: THEME.spacing.md,
    opacity: 0.6,
  },
  utilityContainer: {
    width: '100%',
  },
  utilityTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  utilityLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8.5,
    color: THEME.colors.secondaryText,
    letterSpacing: 1.5,
  },
  utilityVal: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 10.5,
    color: THEME.colors.primaryBurgundy,
  },
  utilityTrack: {
    width: '100%',
    height: 5,
    backgroundColor: 'rgba(139, 0, 31, 0.06)',
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  utilityBar: {
    width: '72%',
    height: '100%',
    backgroundColor: THEME.colors.primaryBurgundy,
    borderRadius: 2.5,
  },
  quickCaptureSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.lg,
  },
  captureCard: {
    height: 68,
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.card,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.md,
    ...THEME.shadows.premium,
  },
  captureIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(139, 0, 31, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
    borderWidth: 0.5,
    borderColor: 'rgba(139, 0, 31, 0.12)',
  },
  captureTextMeta: {
    flex: 1,
  },
  captureTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 14.5,
    color: THEME.colors.darkText,
  },
  captureSub: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 9.5,
    color: THEME.colors.secondaryText,
    marginTop: 1,
  },
  archiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.xl,
    marginBottom: THEME.spacing.md,
  },
  archiveTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 18,
    color: THEME.colors.darkText,
  },
  archiveCount: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 1,
    color: THEME.colors.primaryBurgundy,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.md,
  },
});
