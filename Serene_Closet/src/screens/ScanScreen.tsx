import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { X, ImageIcon, History, Info } from '../components/Icons';
import { THEME } from '../theme';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';

const { width } = Dimensions.get('window');

export const ScanScreen = ({ navigation }: any) => {
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Elegant pulsing vertical scan animation!
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 240,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scanLineAnim]);

  return (
    <ImageBackground
      source={{ uri: IMAGES.fabricBg }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        {/* Top bar navigation controls */}
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Home')}
            style={styles.closeBtn}
          >
            <X size={20} color={THEME.colors.cardBackground} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Fabric Scan</Text>
            <Text style={styles.subtitle}>AI MATERIAL ANALYSIS</Text>
          </View>
          <View style={{ width: 40 }} /> {/* Layout balance spacer */}
        </View>

        {/* Center Target Scan Brackets */}
        <View style={styles.centerSection}>
          <View style={styles.scannerBox}>
            {/* Corner Bracket Lines */}
            <View style={[styles.bracket, styles.bracketTL]} />
            <View style={[styles.bracket, styles.bracketTR]} />
            <View style={[styles.bracket, styles.bracketBL]} />
            <View style={[styles.bracket, styles.bracketBR]} />

            {/* Glowing animated scan beam */}
            <Animated.View
              style={[
                styles.beam,
                {
                  transform: [{ translateY: scanLineAnim }],
                },
              ]}
            />
          </View>
        </View>

        {/* Helper glassmorphism card */}
        <View style={styles.helperWrapper}>
          <GlassCard style={styles.helperCard} opacity={0.85}>
            <Info size={14} color={THEME.colors.primaryBurgundy} style={styles.helperIcon} />
            <Text style={styles.helperText}>
              Position fabric clearly inside the viewfinder. AI will auto-detect weave, blend, and quality parameters.
            </Text>
          </GlassCard>
        </View>

        {/* Bottom Captured Actions Deck */}
        <View style={styles.bottomControls}>
          {/* Library Upload button */}
          <TouchableOpacity activeOpacity={0.8} style={styles.controlIconBtn}>
            <ImageIcon size={22} color={THEME.colors.cardBackground} />
            <Text style={styles.controlIconLabel}>Library</Text>
          </TouchableOpacity>

          {/* Central main Burgundy capture trigger */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Stylist')}
            style={styles.captureBtnContainer}
          >
            <View style={styles.captureBtnOuter}>
              <View style={styles.captureBtnInner} />
            </View>
          </TouchableOpacity>

          {/* History button */}
          <TouchableOpacity activeOpacity={0.8} style={styles.controlIconBtn}>
            <History size={22} color={THEME.colors.cardBackground} />
            <Text style={styles.controlIconLabel}>Scans</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(27, 18, 18, 0.45)', // Sleek dark overlay for scanning context
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.sm,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 18,
    color: THEME.colors.cardBackground,
    fontWeight: '700',
    letterSpacing: 4,
  },
  subtitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    color: THEME.colors.border,
    marginTop: 2,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBox: {
    width: 250,
    height: 250,
    position: 'relative',
    justifyContent: 'flex-start',
  },
  bracket: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: THEME.colors.cardBackground,
  },
  bracketTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  bracketTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bracketBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bracketBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  beam: {
    width: '100%',
    height: 2,
    backgroundColor: THEME.colors.primaryBurgundy,
    shadowColor: THEME.colors.primaryBurgundy,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  helperWrapper: {
    paddingHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.md,
  },
  helperCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  helperIcon: {
    marginRight: THEME.spacing.sm,
  },
  helperText: {
    flex: 1,
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    color: THEME.colors.darkText,
    lineHeight: 16,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.xl,
    marginBottom: THEME.spacing.xl,
  },
  controlIconBtn: {
    alignItems: 'center',
  },
  controlIconLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    color: THEME.colors.cardBackground,
    letterSpacing: 1,
    marginTop: THEME.spacing.xs,
    textTransform: 'uppercase',
  },
  captureBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtnOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: THEME.colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  captureBtnInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: THEME.colors.primaryBurgundy,
  },
});
