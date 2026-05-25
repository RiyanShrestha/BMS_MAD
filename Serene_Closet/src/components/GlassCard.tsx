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
  borderWidth = 0.5,
  opacity = 0.72,
  ...props
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: `rgba(255, 251, 249, ${opacity})`,
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
    borderColor: 'rgba(255, 255, 255, 0.75)',
    padding: THEME.spacing.md,
    ...THEME.shadows.premiumDeep,
    overflow: 'hidden',
  },
});
