import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sparkles } from '../components/Icons';
import { THEME } from '../theme';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialImage } from '../components/EditorialImage';

type IntroScreen1Props = {
  navigation: any;
};

export const IntroScreen1 = ({ navigation }: IntroScreen1Props): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  
  // Staggered text fade-up animation values
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(24)).current;
  const skipOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(skipOpacity, {
        toValue: 1,
        duration: THEME.motion.durations.screen,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateY, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Editorial campaign background image */}
      <EditorialImage
        source={{ uri: IMAGES.intro1 }}
        style={styles.backgroundImage}
        containerStyle={StyleSheet.absoluteFill}
        enableOverlay={true}
      />
      <View style={styles.overlay} />

      <SafeLayout
        statusBarMode="light-content"
        style={styles.container}
        applyBottomInset={true}
        applyTopInset={false} // Disable default so we can handle absolute skip button notch safely
        backgroundColor="transparent"
      >
        {/* Progress Indicators */}
        <View style={[styles.progressContainer, { marginTop: insets.top + THEME.spacing.md }]}>
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
        </View>

        {/* Skip button at top right, fully notch-aware */}
        <Animated.View style={{ opacity: skipOpacity }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Login')}
            style={[styles.skipButtonTop, { top: insets.top + THEME.spacing.sm - 4 }]}
          >
            <Text style={styles.skipTextTop}>Skip</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Centered Luxury Card */}
        <Animated.View style={[
          styles.cardContainer,
          {
            opacity: cardOpacity,
            transform: [{ translateY: cardTranslateY }]
          }
        ]}>
          <GlassCard style={styles.card} opacity={0.92}>
            <View style={styles.iconCircle}>
              <Sparkles size={22} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
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
        </Animated.View>
      </SafeLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(32, 21, 21, 0.44)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: THEME.spacing.xl,
  },
  progressBar: {
    flex: 1,
    height: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
    borderRadius: 1.5,
  },
  progressBarActive: {
    backgroundColor: THEME.colors.white,
  },
  skipButtonTop: {
    position: 'absolute',
    right: THEME.spacing.lg,
    padding: THEME.spacing.sm,
    zIndex: 99,
  },
  skipTextTop: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    color: THEME.colors.white,
    fontSize: 10.5,
    letterSpacing: 2.0,
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
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: THEME.borderRadius.card + 4,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(139, 0, 31, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
    borderWidth: 0.5,
    borderColor: 'rgba(139, 0, 31, 0.12)',
  },
  heading: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 22,
    color: THEME.colors.darkText,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 30,
    marginBottom: THEME.spacing.sm,
  },
  paragraph: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.secondaryText,
    textAlign: 'center',
    lineHeight: 18,
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
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
