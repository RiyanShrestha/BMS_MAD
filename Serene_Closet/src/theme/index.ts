export const THEME = {
  colors: {
    primaryBurgundy: '#8B001F',
    softBeigeBackground: '#F8F1EF',
    cardBackground: '#FFF8F7',
    darkText: '#2B1D1D',
    secondaryText: '#7A6A6A',
    border: '#EADDDD',
    borderLight: 'rgba(234, 221, 221, 0.4)',
    whiteGlass: 'rgba(255, 255, 255, 0.65)',
    shadow: 'rgba(0, 0, 0, 0.08)',
    white: '#FFFFFF',
    transparent: 'transparent',
    overlay: 'rgba(0, 0, 0, 0.35)',
    overlayDark: 'rgba(0, 0, 0, 0.55)',
  },
  typography: {
    heading: {
      fontFamily: 'Georgia', // Elegant serif editorial fallback
      fontWeight: '700' as const,
      letterSpacing: 0.8,
      color: '#2B1D1D',
    },
    headingLight: {
      fontFamily: 'Georgia',
      fontWeight: '300' as const,
      letterSpacing: 0.8,
      color: '#2B1D1D',
    },
    body: {
      fontFamily: 'System', // Minimal clean sans-serif
      letterSpacing: 0.2,
      color: '#7A6A6A',
    },
    bodyBold: {
      fontFamily: 'System',
      fontWeight: '600' as const,
      letterSpacing: 0.2,
      color: '#2B1D1D',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    card: 20,
    button: 12,
    pill: 30,
    input: 12,
  },
  shadows: {
    premium: {
      shadowColor: '#2B1D1D',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 3,
    },
    premiumDeep: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 6,
    },
  }
};
