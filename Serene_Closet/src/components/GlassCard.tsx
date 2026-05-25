import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle, StyleProp } from 'react-native';
import { THEME } from '../theme';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderWidth?: number;
  opacity?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  borderWidth = 1,
  opacity = 0.68,
  ...props
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: `rgba(255, 248, 247, ${opacity})`,
          borderWidth: borderWidth,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: THEME.borderRadius.card,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    padding: THEME.spacing.md,
    ...THEME.shadows.premium,
    overflow: 'hidden',
  },
});
