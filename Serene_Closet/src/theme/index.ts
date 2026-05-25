import { Platform } from 'react-native';

export const THEME = {
  colors: {
    // Light Mode - Warm Ivory & Velvet Burgundy
    primaryBurgundy: '#8B001F',
    softBeigeBackground: '#FAF5F2',
    cardBackground: '#FFFBF9',
    darkText: '#201515',
    secondaryText: '#7E6E6A',
    border: '#EAE0DC',
    borderLight: 'rgba(234, 224, 220, 0.4)',
    whiteGlass: 'rgba(255, 255, 255, 0.7)',
    shadow: 'rgba(32, 21, 21, 0.05)',
    white: '#FFFFFF',
    transparent: 'transparent',
    overlay: 'rgba(32, 21, 21, 0.4)',
    overlayDark: 'rgba(32, 21, 21, 0.65)',
    gold: '#D4AF37',
    dustyRose: '#C8A2C8',

    // Dark Mode - Deep Charcoal & Wine Red
    dark: {
      background: '#140F0F',
      card: '#221919',
      primaryBurgundy: '#A71C35',
      darkText: '#FAF5F2',
      secondaryText: '#A59591',
      border: '#3D3131',
      borderLight: 'rgba(61, 49, 49, 0.3)',
      whiteGlass: 'rgba(34, 25, 25, 0.7)',
      shadow: 'rgba(0, 0, 0, 0.3)',
      gold: '#E5C158',
    }
  },
  typography: {
    heading: {
      fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
      fontWeight: '700' as const,
      letterSpacing: 0.8,
      color: '#201515',
    },
    headingLight: {
      fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
      fontWeight: '300' as const,
      letterSpacing: 1.2,
      color: '#201515',
    },
    body: {
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-light',
      letterSpacing: 0.3,
      color: '#7E6E6A',
    },
    bodyBold: {
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
      fontWeight: '600' as const,
      letterSpacing: 0.3,
      color: '#201515',
    },
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 18,
    lg: 28,
    xl: 36,
    xxl: 48,
  },
  borderRadius: {
    card: 16,
    button: 10,
    pill: 28,
    input: 10,
  },
  shadows: {
    premium: {
      shadowColor: '#201515',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.05,
      shadowRadius: 18,
      elevation: 2,
    },
    premiumDeep: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.08,
      shadowRadius: 28,
      elevation: 6,
    },
  },
  motion: {
    durations: {
      micro: 200,      // Soft buttons scale & color changes
      screen: 450,     // Easing transitions for screen stacks
      hero: 700,       // Staggered reveals of AI looks & insights
    },
    easing: {
      luxuryBezier: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // calm ease-in-out curve
    }
  }
};
