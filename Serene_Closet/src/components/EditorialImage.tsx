import React, { useState, useRef } from 'react';
import { StyleSheet, View, Image, ImageProps, Animated, StyleProp, ViewStyle } from 'react-native';
import { THEME } from '../theme';

interface EditorialImageProps extends ImageProps {
  containerStyle?: StyleProp<ViewStyle>;
  overlayColor?: string;
  enableOverlay?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  style,
  containerStyle,
  overlayColor = 'rgba(212, 175, 55, 0.04)', // Warm champagne/gold luxury tone filter
  enableOverlay = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const handleLoad = () => {
    setIsLoaded(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: THEME.motion.durations.screen,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Background skeleton/placeholder state */}
      {!isLoaded && <View style={styles.placeholder} />}

      <Animated.View style={{ flex: 1, opacity }}>
        <Image
          style={[styles.image, style]}
          onLoad={handleLoad}
          {...props}
        />
        {/* Cinematic Luxury Overlays */}
        {enableOverlay && isLoaded && (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor }, styles.roundedOverlay]} pointerEvents="none" />
        )}
        {/* Soft vignette/contrast controller */}
        {enableOverlay && isLoaded && (
          <View style={[StyleSheet.absoluteFill, styles.vignette]} pointerEvents="none" />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#EFEAE6', // Premium ivory loading skeleton
  },
  roundedOverlay: {
    mixBlendMode: 'multiply' as any, // Warm-filter tint blending if supported, fallback to soft transparency overlay
  },
  vignette: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    // A subtle low opacity border vignette
    borderColor: 'rgba(32, 21, 21, 0.02)',
  },
});
