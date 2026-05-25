import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Cpu, Check } from '../components/Icons';
import { THEME } from '../theme';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';

export const IntroScreen2 = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top half: Cinematic Fashion Image with AI floating overlay */}
      <View style={styles.imageSection}>
        <Image source={{ uri: IMAGES.intro2 }} style={styles.image} resizeMode="cover" />
        
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
      <View style={styles.contentSection}>
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
      </View>
    </SafeAreaView>
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  aiHeaderText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 1.5,
    color: THEME.colors.primaryBurgundy,
    marginLeft: 6,
  },
  aiTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 20,
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
    height: 4,
    backgroundColor: 'rgba(139, 0, 31, 0.1)',
    borderRadius: 2,
    marginRight: THEME.spacing.sm,
  },
  activeProgress: {
    width: '85%',
    height: '100%',
    backgroundColor: THEME.colors.primaryBurgundy,
    borderRadius: 2,
  },
  progressPercent: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 10,
    color: THEME.colors.primaryBurgundy,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 10,
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
    marginBottom: THEME.spacing.md + 4,
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
    marginBottom: THEME.spacing.sm,
  },
  skipTextContainer: {
    paddingVertical: THEME.spacing.xs,
  },
  skipTextBottom: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    color: THEME.colors.secondaryText,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
