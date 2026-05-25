import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Sparkles, ArrowRight } from './Icons';
import { THEME } from '../theme';
import { GlassCard } from './GlassCard';

interface AIRecommendationCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  title = 'Minimalist Chic',
  subtitle = 'Curated Daily Look',
  image = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800',
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        <View style={styles.gradientOverlay} />
        
        <GlassCard style={styles.floatingCard} opacity={0.8}>
          <View style={styles.badgeContainer}>
            <Sparkles size={12} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
            <Text style={styles.badgeText}>AI STYLIST PICK</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.actionContainer}>
            <Text style={styles.actionText}>Discover details</Text>
            <ArrowRight size={12} color={THEME.colors.primaryBurgundy} />
          </View>
        </GlassCard>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: THEME.spacing.md,
    borderRadius: THEME.borderRadius.card,
    overflow: 'hidden',
    backgroundColor: THEME.colors.cardBackground,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    ...THEME.shadows.premiumDeep,
    marginBottom: THEME.spacing.lg,
  },
  imageContainer: {
    width: '100%',
    height: 380,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  image: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43, 29, 29, 0.25)', // Elegant subtle warm overlay
  },
  floatingCard: {
    margin: THEME.spacing.md,
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.card - 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    ...THEME.shadows.premiumDeep,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  badgeText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 1.5,
    color: THEME.colors.primaryBurgundy,
    marginLeft: 6,
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 22,
    color: THEME.colors.darkText,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.sm,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 11,
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginRight: 6,
  },
});
