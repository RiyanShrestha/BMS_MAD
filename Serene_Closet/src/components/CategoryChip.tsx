import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { THEME } from '../theme';

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  isActive,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.chip,
        isActive && styles.chipActive,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          isActive && styles.textActive,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.sm + 2,
    borderRadius: THEME.borderRadius.pill,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginRight: THEME.spacing.sm,
    ...THEME.shadows.premium,
  },
  chipActive: {
    backgroundColor: THEME.colors.primaryBurgundy,
    borderColor: THEME.colors.primaryBurgundy,
  },
  text: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 13,
    color: THEME.colors.secondaryText,
    letterSpacing: 0.8,
  },
  textActive: {
    color: THEME.colors.cardBackground,
    fontFamily: THEME.typography.bodyBold.fontFamily,
  },
});
