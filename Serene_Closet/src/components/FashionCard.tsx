import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { THEME } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.68;

interface FashionCardProps {
  image: string;
  title: string;
  category: string;
  onPress?: () => void;
}

export const FashionCard: React.FC<FashionCardProps> = ({
  image,
  title,
  category,
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
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.editorialSub}>LIMITED EDITION</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginRight: THEME.spacing.md,
    borderRadius: THEME.borderRadius.card,
    backgroundColor: THEME.colors.cardBackground,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: THEME.spacing.sm,
    ...THEME.shadows.premium,
    marginBottom: THEME.spacing.sm,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.2,
    borderRadius: THEME.borderRadius.card - 4,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: THEME.spacing.sm,
    left: THEME.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: THEME.spacing.sm + 2,
    paddingVertical: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.pill,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
  },
  categoryText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 1,
    color: THEME.colors.primaryBurgundy,
    textTransform: 'uppercase',
  },
  info: {
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.xs,
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 16,
    color: THEME.colors.darkText,
    marginBottom: 2,
  },
  editorialSub: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 9,
    color: THEME.colors.secondaryText,
    letterSpacing: 1.5,
  },
});
