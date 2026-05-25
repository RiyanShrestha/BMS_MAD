import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Dimensions, Vibration } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Compass, Scan, Shirt, Sparkles } from './Icons';
import { THEME } from '../theme';

const { width } = Dimensions.get('window');
const BAR_WIDTH = width - 32;
const TAB_WIDTH = BAR_WIDTH / 5;

export const FloatingTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current; // Scan pulse scale
  const pulseOpacity = useRef(new Animated.Value(0.6)).current; // Scan pulse opacity

  // Tab scale values
  const scaleAnims = useRef(state.routes.map(() => new Animated.Value(1))).current;

  // Slide Indicator transition
  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      friction: 9,
      tension: 50,
    }).start();
  }, [state.index, slideAnim]);

  // Center button pulse loop
  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.35,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1.0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseOpacity, {
            toValue: 0,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.6,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    pulseLoop.start();
    return () => pulseLoop.stop();
  }, [pulseAnim, pulseOpacity]);

  const getIcon = (routeName: string, color: string, focused: boolean) => {
    const size = 18;
    const strokeWidth = focused ? 2.0 : 1.3;

    switch (routeName) {
      case 'HomeTab':
        return <Home size={size} color={color} strokeWidth={strokeWidth} />;
      case 'Explore':
        return <Compass size={size} color={color} strokeWidth={strokeWidth} />;
      case 'Scan':
        return (
          <View style={styles.scanWrapper}>
            {/* Pulsing glow ring around scan button */}
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  transform: [{ scale: pulseAnim }],
                  opacity: pulseOpacity,
                },
              ]}
            />
            <View style={[styles.scanCircle, focused && styles.scanCircleActive]}>
              <Scan
                size={22}
                color={focused ? THEME.colors.cardBackground : THEME.colors.white}
                strokeWidth={2}
              />
            </View>
          </View>
        );
      case 'Closet':
        return <Shirt size={size} color={color} strokeWidth={strokeWidth} />;
      case 'Stylist':
        return <Sparkles size={size} color={color} strokeWidth={strokeWidth} />;
      default:
        return null;
    }
  };

  const handlePress = (routeKey: string, routeName: string, index: number, isFocused: boolean) => {
    // Soft luxury haptic vibration feedback
    Vibration.vibrate(12);

    // Trigger scale-down animation
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.88,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1.0,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.container}>
      {/* Active Tab Background Slide Indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const activeColor = THEME.colors.primaryBurgundy;
        const inactiveColor = THEME.colors.secondaryText;
        const color = isFocused ? activeColor : inactiveColor;

        const animatedStyle = {
          transform: [{ scale: scaleAnims[index] || 1 }],
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => handlePress(route.key, route.name, index, isFocused)}
            style={styles.tabItem}
            activeOpacity={1} // Override default overlay so our custom scale feels premium
          >
            <Animated.View style={[styles.tabContent, animatedStyle]}>
              {getIcon(route.name, color, isFocused)}
              <Text style={[styles.label, { color: color }, isFocused && styles.labelActive]}>
                {label.toString().toUpperCase()}
              </Text>
              
              {/* Active Tab Ambient Dot Glow */}
              {isFocused && route.name !== 'Scan' && (
                <View style={styles.activeDot} />
              )}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    height: 68,
    backgroundColor: 'rgba(255, 251, 249, 0.82)', // Translucent ivory glass
    borderRadius: THEME.borderRadius.pill,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    paddingHorizontal: 0,
    ...THEME.shadows.premiumDeep,
    elevation: 8,
  },
  indicator: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: TAB_WIDTH - 12,
    height: 56,
    backgroundColor: 'rgba(139, 0, 31, 0.04)', // Warm pinkish highlight
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: 'rgba(139, 0, 31, 0.08)',
  },
  tabItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1.2,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  labelActive: {
    color: THEME.colors.primaryBurgundy,
  },
  activeDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: THEME.colors.primaryBurgundy,
    position: 'absolute',
    bottom: -8,
  },
  scanWrapper: {
    position: 'relative',
    height: 36,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    top: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.gold,
    zIndex: -1,
  },
  scanCircle: {
    position: 'absolute',
    top: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.primaryBurgundy,
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.shadows.premiumDeep,
    borderWidth: 1.5,
    borderColor: '#FFFBF9',
  },
  scanCircleActive: {
    backgroundColor: THEME.colors.darkText,
    borderColor: '#FFFBF9',
  },
});
