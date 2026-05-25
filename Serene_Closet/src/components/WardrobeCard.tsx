import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Calendar } from './Icons';
import { THEME } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface WardrobeCardProps {
  image: string;
  title: string;
  category: string;
  lastWorn?: string;
  wearCount?: number;
  onPress?: () => void;
}

export const WardrobeCard: React.FC<WardrobeCardProps> = ({
  image,
  title,
  category,
  lastWorn = 'Never worn',
  wearCount = 0,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        <View style={styles.wearBadge}>
          <Text style={styles.wearCount}>{wearCount} wears</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        
        <View style={styles.statsContainer}>
          <Calendar size={11} color={THEME.colors.secondaryText} style={styles.statIcon} />
          <Text style={styles.lastWornText} numberOfLines={1}>Worn: {lastWorn}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: THEME.spacing.md + 4,
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.card,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: THEME.spacing.sm,
    ...THEME.shadows.premium,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.25,
    borderRadius: THEME.borderRadius.card - 4,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wearBadge: {
    position: 'absolute',
    bottom: THEME.spacing.sm,
    right: THEME.spacing.sm,
    backgroundColor: 'rgba(43, 29, 29, 0.75)',
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.xs - 2,
    borderRadius: THEME.borderRadius.pill,
  },
  wearCount: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    color: THEME.colors.cardBackground,
    letterSpacing: 0.5,
  },
  info: {
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.xs,
  },
  category: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 9,
    letterSpacing: 1.2,
    color: THEME.colors.secondaryText,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 14,
    color: THEME.colors.darkText,
    marginBottom: THEME.spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statIcon: {
    marginRight: 4,
  },
  lastWornText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 11,
    color: THEME.colors.secondaryText,
  },
});
