import React, { useEffect, useRef } from 'react';
import { SafeLayout } from '../components/SafeLayout';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { THEME } from '../theme';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { EditorialImage } from '../components/EditorialImage';

const { width } = Dimensions.get('window');

export const IntroScreen3 = ({ navigation }: any) => {
  const revealOpacity = useRef(new Animated.Value(0)).current;
  const revealTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(revealOpacity, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(revealTranslateY, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container} applyBottomInset={true}>
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
          <EditorialImage
            source={{ uri: IMAGES.intro3 }}
            style={styles.image}
            containerStyle={StyleSheet.absoluteFill}
            enableOverlay={true}
          />
        </View>
      </View>

      {/* Floating white/glass content card at the bottom */}
      <Animated.View style={[
        styles.contentSection,
        {
          opacity: revealOpacity,
          transform: [{ translateY: revealTranslateY }]
        }
      ]}>
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
      </Animated.View>
    </SafeLayout>
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
    marginTop: THEME.spacing.md,
    marginRight: THEME.spacing.lg,
    padding: THEME.spacing.sm,
    zIndex: 10,
  },
  skipTextTop: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    color: THEME.colors.primaryBurgundy,
    fontSize: 10.5,
    letterSpacing: 2.0,
    textTransform: 'uppercase',
  },
  archWrapper: {
    alignItems: 'center',
    marginTop: THEME.spacing.xs,
    flex: 1,
    justifyContent: 'center',
  },
  archContainer: {
    width: width * 0.70,
    height: width * 0.90,
    borderTopLeftRadius: width * 0.35, // Creates the perfect luxury editorial arch
    borderTopRightRadius: width * 0.35,
    overflow: 'hidden',
    backgroundColor: THEME.colors.cardBackground,
    borderWidth: 0.5,
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
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: THEME.borderRadius.card,
    ...THEME.shadows.premiumDeep,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: THEME.spacing.md,
  },
  progressBar: {
    width: 20,
    height: 2.5,
    backgroundColor: THEME.colors.border,
    marginHorizontal: 3,
    borderRadius: 1.5,
  },
  progressBarActive: {
    backgroundColor: THEME.colors.primaryBurgundy,
  },
  heading: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 22,
    color: THEME.colors.darkText,
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: THEME.spacing.sm,
  },
  paragraph: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.secondaryText,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: THEME.spacing.lg,
  },
  ctaButton: {
    width: '100%',
  },
});
