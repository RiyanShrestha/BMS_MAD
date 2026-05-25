import React from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeContext';

interface LuxuryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'solid' | 'outline' | 'text';
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
  const { colors, isDarkMode } = useTheme();
  const scale = useSharedValue(1);

  const isSolid = variant === 'solid';
  const isOutline = variant === 'outline';
  const isText = variant === 'text';

  const pressStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.96, { damping: 12, stiffness: 240 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 240 });
  };

  const buttonSolidStyle = {
    backgroundColor: colors.primaryBurgundy,
    borderWidth: 0,
  };

  const buttonOutlineStyle = {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primaryBurgundy,
  };

  const buttonDisabledStyle = {
    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(139, 0, 31, 0.08)',
    borderColor: 'transparent',
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        styles.button,
        isSolid && buttonSolidStyle,
        isOutline && buttonOutlineStyle,
        isText && styles.buttonText,
        disabled && buttonDisabledStyle,
        pressStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isSolid ? (isDarkMode ? '#140F0F' : colors.cardBackground) : colors.primaryBurgundy}
          size="small"
        />
      ) : (
        <>
          {icon && <React.Fragment>{icon}</React.Fragment>}
          <Text
            style={[
              styles.text,
              isSolid && { color: isDarkMode ? '#140F0F' : colors.cardBackground },
              isOutline && { color: colors.primaryBurgundy },
              isText && { color: colors.primaryBurgundy, textTransform: 'none', letterSpacing: 0.8 },
              disabled && { color: colors.secondaryText },
              icon ? { marginLeft: 8 } : null,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  buttonText: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    height: 'auto',
    paddingHorizontal: 0,
  },
  text: {
    fontFamily: 'Georgia',
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});
