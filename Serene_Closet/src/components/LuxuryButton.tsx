import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { THEME } from '../theme';

interface LuxuryButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'solid' | 'outline' | 'text';
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  title,
  onPress,
  variant = 'solid',
  loading = false,
  style,
  textStyle,
  disabled = false,
  icon,
}) => {
  const isSolid = variant === 'solid';
  const isOutline = variant === 'outline';
  const isText = variant === 'text';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        isSolid && styles.buttonSolid,
        isOutline && styles.buttonOutline,
        isText && styles.buttonText,
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isSolid ? THEME.colors.cardBackground : THEME.colors.primaryBurgundy}
          size="small"
        />
      ) : (
        <>
          {icon && <React.Fragment>{icon}</React.Fragment>}
          <Text
            style={[
              styles.text,
              isSolid && styles.textSolid,
              isOutline && styles.textOutline,
              isText && styles.textText,
              disabled && styles.textDisabled,
              icon ? { marginLeft: THEME.spacing.sm } : null,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: THEME.borderRadius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: THEME.spacing.lg,
    ...THEME.shadows.premium,
  },
  buttonSolid: {
    backgroundColor: THEME.colors.primaryBurgundy,
    borderWidth: 0,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: THEME.colors.primaryBurgundy,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    height: 'auto',
    paddingHorizontal: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(139, 0, 31, 0.15)',
    borderColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  textSolid: {
    color: THEME.colors.cardBackground,
  },
  textOutline: {
    color: THEME.colors.primaryBurgundy,
  },
  textText: {
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 0.8,
    textTransform: 'none',
  },
  textDisabled: {
    color: THEME.colors.secondaryText,
  },
});
