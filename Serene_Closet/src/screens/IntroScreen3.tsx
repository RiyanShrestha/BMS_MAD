import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { THEME } from '../theme';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';

const { width } = Dimensions.get('window');

export const IntroScreen3 = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top right skip */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Login')}
        style={styles.skipButtonTop}
      >
        <Text style={styles.skipTextTop}>Enter</Text>
      </TouchableOpacity>

      {/* Model Image inside Arch-style Border */}
      <View style={styles.archWrapper}>
        <View style={styles.archContainer}>
          <Image source={{ uri: IMAGES.intro3 }} style={styles.image} resizeMode="cover" />
        </View>
      </View>

      {/* Floating white/glass content card at the bottom */}
      <View style={styles.contentSection}>
        <GlassCard style={styles.floatingCard} opacity={0.92}>
          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
            <View style={styles.progressBar} />
            <View style={[styles.progressBar, styles.progressBarActive]} />
          </View>

          <Text style={styles.heading}>Shop by Your Style</Text>
          
          <Text style={styles.paragraph}>
            Explore and procure exclusive apparel matching your cognitive aesthetic signature. Elevate your catalog matching accuracy instantly.
          </Text>

          <LuxuryButton
            title="Begin Styling"
            onPress={() => navigation.navigate('Login')}
            style={styles.ctaButton}
          />
        </GlassCard>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.softBeigeBackground,
    justifyContent: 'space-between',
  },
  skipButtonTop: {
    alignSelf: 'flex-end',
    marginTop: THEME.spacing.lg,
    marginRight: THEME.spacing.lg,
    padding: THEME.spacing.sm,
    zIndex: 10,
  },
  skipTextTop: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    color: THEME.colors.primaryBurgundy,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  archWrapper: {
    alignItems: 'center',
    marginTop: THEME.spacing.sm,
    flex: 1,
    justifyContent: 'center',
  },
  archContainer: {
    width: width * 0.72,
    height: width * 0.95,
    borderTopLeftRadius: width * 0.36, // Creates the perfect luxury editorial arch
    borderTopRightRadius: width * 0.36,
    overflow: 'hidden',
    backgroundColor: THEME.colors.cardBackground,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    ...THEME.shadows.premiumDeep,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentSection: {
    paddingHorizontal: THEME.spacing.lg,
    paddingBottom: THEME.spacing.lg,
    marginTop: THEME.spacing.md,
  },
  floatingCard: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: THEME.spacing.lg + 4,
    paddingHorizontal: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: THEME.borderRadius.card,
    ...THEME.shadows.premiumDeep,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: THEME.spacing.md,
  },
  progressBar: {
    width: 24,
    height: 3,
    backgroundColor: THEME.colors.border,
    marginHorizontal: 3,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: THEME.colors.primaryBurgundy,
  },
  heading: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 24,
    color: THEME.colors.darkText,
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: THEME.spacing.sm,
  },
  paragraph: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 13,
    color: THEME.colors.secondaryText,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: THEME.spacing.lg,
  },
  ctaButton: {
    width: '100%',
  },
});
