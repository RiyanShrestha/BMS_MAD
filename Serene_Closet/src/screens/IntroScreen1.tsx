import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { Sparkles } from '../components/Icons';
import { THEME } from '../theme';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';

export const IntroScreen1 = ({ navigation }: any) => {
  return (
    <ImageBackground
      source={{ uri: IMAGES.intro1 }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
        </View>

        {/* Skip button at top right */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}
          style={styles.skipButtonTop}
        >
          <Text style={styles.skipTextTop}>Skip</Text>
        </TouchableOpacity>

        {/* Centered Luxury Card */}
        <View style={styles.cardContainer}>
          <GlassCard style={styles.card} opacity={0.96}>
            <View style={styles.iconCircle}>
              <Sparkles size={24} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
            </View>

            <Text style={styles.heading}>Build Your Smart Wardrobe</Text>
            
            <Text style={styles.paragraph}>
              Step into the future of luxury styling. Curate, analyze, and optimize your personal collections with AI fabric material intelligence.
            </Text>

            <LuxuryButton
              title="Next Journey"
              onPress={() => navigation.navigate('Intro2')}
              style={styles.ctaButton}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Login')}
              style={styles.skipTextContainer}
            >
              <Text style={styles.skipTextBottom}>Skip for now</Text>
            </TouchableOpacity>
          </GlassCard>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43, 29, 29, 0.4)', // Warm overlay matching text tone
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: THEME.spacing.lg,
    paddingHorizontal: THEME.spacing.xl,
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    marginHorizontal: 4,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: THEME.colors.cardBackground,
  },
  skipButtonTop: {
    position: 'absolute',
    top: THEME.spacing.lg + 16,
    right: THEME.spacing.lg,
    padding: THEME.spacing.sm,
  },
  skipTextTop: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    color: THEME.colors.cardBackground,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.lg,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: THEME.spacing.xl,
    paddingHorizontal: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: THEME.borderRadius.card + 6,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(139, 0, 31, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(139, 0, 31, 0.15)',
  },
  heading: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 26,
    color: THEME.colors.darkText,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 34,
    marginBottom: THEME.spacing.sm,
  },
  paragraph: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 13,
    color: THEME.colors.secondaryText,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: THEME.spacing.xl,
  },
  ctaButton: {
    width: '100%',
    marginBottom: THEME.spacing.md,
  },
  skipTextContainer: {
    paddingVertical: THEME.spacing.xs,
  },
  skipTextBottom: {
    fontFamily: THEME.typography.body.fontFamily,
    color: THEME.colors.secondaryText,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});
