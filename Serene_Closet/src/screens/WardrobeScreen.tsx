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
  FlatList,
} from 'react-native';
import { Sparkles, Plus, Cloud, ArrowRight } from '../components/Icons';
import { THEME } from '../theme';
import { IMAGES, MY_WARDROBE } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { WardrobeCard } from '../components/WardrobeCard';

export const WardrobeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Closet</Text>
        <Text style={styles.subtitle}>DIGITAL ARCHIVE & COGNITIVE UTILITY</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Main: What Should I Wear Today Greeting & Generate card */}
        <View style={styles.heroSection}>
          <Text style={styles.heroGreeting}>What Should I Wear Today?</Text>
          
          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() => navigation.navigate('Stylist')}
            style={styles.generateCard}
          >
            <Image source={{ uri: IMAGES.abstractWardrobe }} style={styles.generateCardBg} />
            <View style={styles.generateCardOverlay} />
            
            <GlassCard style={styles.generateInnerCard} opacity={0.8}>
              <View style={styles.sparkleRow}>
                <Sparkles size={16} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
                <Text style={styles.sparkleText}>COGNITIVE SYNTHESIS</Text>
              </View>
              <Text style={styles.generateTitle}>Generate Look</Text>
              <Text style={styles.generateSub}>AI will compose a styling recommendation from your current wardrobe archive.</Text>
              <View style={styles.arrowIcon}>
                <ArrowRight size={14} color={THEME.colors.primaryBurgundy} />
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
              <Cloud size={24} color={THEME.colors.primaryBurgundy} strokeWidth={1.5} />
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
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Scan')}
            style={styles.captureCard}
          >
            <View style={styles.captureIconCircle}>
              <Plus size={20} color={THEME.colors.primaryBurgundy} />
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

      </ScrollView>
    </SafeAreaView>
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
    fontSize: 24,
    color: THEME.colors.darkText,
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
    fontSize: 22,
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
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  generateCardOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43, 29, 29, 0.22)',
  },
  generateInnerCard: {
    margin: THEME.spacing.md,
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.card - 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
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
    fontSize: 20,
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.65)',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsCategory: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 13,
    color: THEME.colors.darkText,
    letterSpacing: 0.5,
  },
  statsTemp: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 18,
    color: THEME.colors.primaryBurgundy,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.border,
    marginVertical: THEME.spacing.md,
    opacity: 0.5,
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
    fontSize: 9,
    color: THEME.colors.secondaryText,
    letterSpacing: 1.5,
  },
  utilityVal: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 11,
    color: THEME.colors.primaryBurgundy,
  },
  utilityTrack: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(139, 0, 31, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  utilityBar: {
    width: '72%',
    height: '100%',
    backgroundColor: THEME.colors.primaryBurgundy,
    borderRadius: 3,
  },
  quickCaptureSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.lg,
  },
  captureCard: {
    height: 68,
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.card,
    borderWidth: 1,
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
    backgroundColor: 'rgba(139, 0, 31, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  captureTextMeta: {
    flex: 1,
  },
  captureTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 15,
    color: THEME.colors.darkText,
  },
  captureSub: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 10,
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
    fontSize: 20,
    color: THEME.colors.darkText,
  },
  archiveCount: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 10,
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
