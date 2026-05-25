import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, Vibration } from 'react-native';
import { Sparkles, ArrowRight } from './Icons';
import { THEME } from '../theme';
import { GlassCard } from './GlassCard';
import { EditorialImage } from './EditorialImage';

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
  const handlePress = () => {
    Vibration.vibrate(10);
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.96}
      onPress={handlePress}
      style={[styles.container, style]}
    >
      <View style={styles.imageContainer}>
        <EditorialImage
          source={{ uri: image }}
          style={styles.image}
          containerStyle={StyleSheet.absoluteFill}
          enableOverlay={true}
        />
        <View style={styles.gradientOverlay} />
        
        <GlassCard style={styles.floatingCard} opacity={0.88}>
          <View style={styles.badgeContainer}>
            <Sparkles size={11} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
            <Text style={styles.badgeText}>AI STYLIST PICK</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.actionContainer}>
            <Text style={styles.actionText}>Discover details</Text>
            <ArrowRight size={11} color={THEME.colors.primaryBurgundy} />
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
    borderWidth: 0.5,
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
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(32, 21, 21, 0.22)', // Subtle warm luxury campaign overlay
  },
  floatingCard: {
    margin: THEME.spacing.md,
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.card - 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    ...THEME.shadows.premiumDeep,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  badgeText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8.5,
    letterSpacing: 1.5,
    color: THEME.colors.primaryBurgundy,
    marginLeft: 6,
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 20,
    color: THEME.colors.darkText,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 11.5,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.sm,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 10,
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginRight: 6,
  },
});
