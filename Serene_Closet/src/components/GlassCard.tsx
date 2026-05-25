import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderWidth?: number;
  opacity?: number;
  showInnerLight?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  borderWidth = 0.5,
  opacity = 0.72,
  showInnerLight = true,
  ...props
}) => {
  const { colors, isDarkMode, theme } = useTheme();

  // Adapt colors for light or dark cinematic styles
  const baseBg = isDarkMode ? `rgba(26, 18, 18, ${opacity})` : `rgba(255, 251, 249, ${opacity})`;
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.75)';
  const innerLightColor = isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.45)';

  const activeShadows = isDarkMode
    ? {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.35,
        shadowRadius: 28,
        elevation: 8,
      }
    : theme.shadows.premiumDeep;

  return (
    <View
      style={[
        styles.card,
        activeShadows,
        {
          backgroundColor: baseBg,
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
        style,
      ]}
      {...props}
    >
      {/* Inner top light reflection — luxury frosted glass effect */}
      {showInnerLight && (
        <View style={[styles.innerLightReflection, { backgroundColor: innerLightColor }]} pointerEvents="none" />
      )}
      {/* Subtle warm inner tint layer */}
      <View 
        style={[
          styles.warmInnerTint, 
          { backgroundColor: isDarkMode ? 'rgba(167, 28, 53, 0.012)' : 'rgba(212, 175, 55, 0.015)' }
        ]} 
        pointerEvents="none" 
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  innerLightReflection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  warmInnerTint: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },
});
