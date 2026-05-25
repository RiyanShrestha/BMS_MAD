import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

interface AmbientBackgroundProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showGlow?: boolean;
  glowPosition?: 'top' | 'center';
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  children,
  style,
  showGlow = true,
  glowPosition = 'top',
}) => {
  const { colors, theme, isDarkMode } = useTheme();

  const startColor = theme.atmosphere.ambientGradient.start;
  const endColor = theme.atmosphere.ambientGradient.end;

  // Cinematic glow colors depending on dark/light mode
  const glowColors = isDarkMode
    ? ['rgba(167, 28, 53, 0.16)', 'rgba(167, 28, 53, 0.0)'] // deep wine red atmospheric backlighting
    : ['rgba(212, 175, 55, 0.08)', 'rgba(212, 175, 55, 0.0)']; // warm gold backlighting

  return (
    <View style={[styles.container, style]}>
      {/* Dynamic Base Gradient Atmosphere */}
      <LinearGradient
        colors={[startColor, endColor]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />
      
      {/* Cinematic Vignettes using smooth gradients */}
      <LinearGradient
        colors={[isDarkMode ? 'rgba(0,0,0,0.65)' : 'rgba(32, 21, 21, 0.06)', 'transparent']}
        style={styles.vignetteTop}
        pointerEvents="none"
      />
      <LinearGradient
        colors={['transparent', isDarkMode ? 'rgba(0,0,0,0.85)' : 'rgba(32, 21, 21, 0.09)']}
        style={styles.vignetteBottom}
        pointerEvents="none"
      />
      
      {/* Soft radial glow simulating backlighting */}
      {showGlow && (
        <View
          style={[
            styles.glowWrapper,
            glowPosition === 'center' && styles.glowCenter,
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={glowColors}
            style={styles.glowCircle}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
      )}
      
      {/* Film grain layer overlay */}
      <View 
        style={[
          styles.filmGrain, 
          { backgroundColor: theme.atmosphere.filmGrain }
        ]} 
        pointerEvents="none" 
      />
      
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  vignetteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
  },
  vignetteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 240,
  },
  glowWrapper: {
    position: 'absolute',
    top: 60,
    left: '50%',
    width: 420,
    height: 420,
    marginLeft: -210,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowCenter: {
    top: '25%',
  },
  glowCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 210,
  },
  filmGrain: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
});
