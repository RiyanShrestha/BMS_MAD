import React, { useEffect, useRef } from 'react';
import { SafeLayout } from '../components/SafeLayout';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { Cpu, Check } from '../components/Icons';
import { THEME } from '../theme';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { EditorialImage } from '../components/EditorialImage';

export const IntroScreen2 = ({ navigation }: any) => {
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container} applyBottomInset={true}>
      {/* Top half: Cinematic Fashion Image with AI floating overlay */}
      <View style={styles.imageSection}>
        <EditorialImage
          source={{ uri: IMAGES.intro2 }}
          style={styles.image}
          containerStyle={StyleSheet.absoluteFill}
          enableOverlay={true}
        />
        
        {/* Style Analyzed Floating Glass Card */}
        <GlassCard style={styles.aiOverlayCard} opacity={0.88}>
          <View style={styles.aiHeader}>
            <Cpu size={14} color={THEME.colors.primaryBurgundy} />
            <Text style={styles.aiHeaderText}>STYLE ANALYZED</Text>
          </View>
          <Text style={styles.aiTitle}>Minimalist Chic</Text>
          
          <View style={styles.progressRow}>
            <View style={styles.fullProgress}>
              <View style={styles.activeProgress} />
            </View>
            <Text style={styles.progressPercent}>85%</Text>
          </View>
          <View style={styles.statusRow}>
            <Check size={11} color={THEME.colors.primaryBurgundy} />
            <Text style={styles.statusText}>Generating customized look...</Text>
          </View>
        </GlassCard>
      </View>

      {/* Bottom half: Editorial Details */}
      <Animated.View style={[
        styles.contentSection,
        {
          opacity: contentOpacity,
          transform: [{ translateY: contentTranslateY }]
        }
      ]}>
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={styles.progressBar} />
        </View>

        <Text style={styles.heading}>AI Outfit Suggestions</Text>
        
        <Text style={styles.paragraph}>
          Let our cognitive network create tailored outfits from your digitized clothes and local atmospheric conditions. Step out in style daily.
        </Text>

        <LuxuryButton
          title="Continue"
          onPress={() => navigation.navigate('Intro3')}
          style={styles.ctaButton}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}
          style={styles.skipTextContainer}
        >
          <Text style={styles.skipTextBottom}>Skip</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.softBeigeBackground,
  },
  imageSection: {
    flex: 5.5,
    marginHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.md,
    borderRadius: THEME.borderRadius.card,
    overflow: 'hidden',
    position: 'relative',
    ...THEME.shadows.premiumDeep,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  aiOverlayCard: {
    position: 'absolute',
    bottom: THEME.spacing.md,
    left: THEME.spacing.md,
    right: THEME.spacing.md,
    padding: THEME.spacing.md,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  aiHeaderText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8.5,
    letterSpacing: 1.5,
    color: THEME.colors.primaryBurgundy,
    marginLeft: 6,
  },
  aiTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 18,
    color: THEME.colors.darkText,
    marginBottom: THEME.spacing.sm,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  fullProgress: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(139, 0, 31, 0.1)',
    borderRadius: 1.5,
    marginRight: THEME.spacing.sm,
  },
  activeProgress: {
    width: '85%',
    height: '100%',
    backgroundColor: THEME.colors.primaryBurgundy,
    borderRadius: 1.5,
  },
  progressPercent: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9.5,
    color: THEME.colors.primaryBurgundy,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 9.5,
    color: THEME.colors.secondaryText,
    marginLeft: 4,
  },
  contentSection: {
    flex: 4.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.xl,
    paddingVertical: THEME.spacing.lg,
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
    marginBottom: THEME.spacing.sm,
  },
  skipTextContainer: {
    paddingVertical: THEME.spacing.xs,
  },
  skipTextBottom: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    color: THEME.colors.secondaryText,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
