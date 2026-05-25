import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  Vibration,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, ImageIcon, History, Sparkles, Shirt } from '../components/Icons';
import { THEME } from '../theme';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialImage } from '../components/EditorialImage';

const { width, height } = Dimensions.get('window');

type ScanScreenProps = {
  navigation: any;
};

export const ScanScreen = ({ navigation }: ScanScreenProps): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  
  // Custom futuristic tracking nodes animations
  const node1Opacity = useRef(new Animated.Value(0)).current;
  const node2Opacity = useRef(new Animated.Value(0)).current;
  const node3Opacity = useRef(new Animated.Value(0)).current;
  const bracketPulse = useRef(new Animated.Value(1)).current;

  // Scanning simulation states
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState(false);
  const [liveConfidence, setLiveConfidence] = useState(0);

  // Scanner beam loop
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 240,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scanLineAnim]);

  // Tracking reticles & bracket pulse loop when scanning
  useEffect(() => {
    if (isScanning) {
      // Loop tracking node opacity transitions
      const nodeAnimation = Animated.loop(
        Animated.stagger(400, [
          Animated.sequence([
            Animated.timing(node1Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(node1Opacity, { toValue: 0.2, duration: 400, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(node2Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(node2Opacity, { toValue: 0.2, duration: 400, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(node3Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(node3Opacity, { toValue: 0.2, duration: 400, useNativeDriver: true }),
          ]),
        ])
      );

      const bracketAnim = Animated.loop(
        Animated.sequence([
          Animated.timing(bracketPulse, { toValue: 1.1, duration: 600, useNativeDriver: true }),
          Animated.timing(bracketPulse, { toValue: 1.0, duration: 600, useNativeDriver: true }),
        ])
      );

      nodeAnimation.start();
      bracketAnim.start();

      return () => {
        nodeAnimation.stop();
        bracketAnim.stop();
      };
    } else {
      node1Opacity.setValue(0);
      node2Opacity.setValue(0);
      node3Opacity.setValue(0);
      bracketPulse.setValue(1);
    }
  }, [isScanning]);

  const handleCapture = () => {
    if (isScanning || scanResult) return;
    setIsScanning(true);
    setScanStep(0);
    setLiveConfidence(42);
    Vibration.vibrate([0, 20, 100, 30]);

    // Live confidence counting up
    const interval = setInterval(() => {
      setLiveConfidence((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          return 98.6;
        }
        return prev + Math.floor(Math.random() * 8 + 3);
      });
    }, 400);

    // Dynamic step progress simulation
    setTimeout(() => {
      setScanStep(1);
      Vibration.vibrate(10);
    }, 1100);
    setTimeout(() => {
      setScanStep(2);
      Vibration.vibrate(10);
    }, 2200);
    setTimeout(() => {
      setScanStep(3);
      Vibration.vibrate(10);
    }, 3300);
    setTimeout(() => {
      clearInterval(interval);
      setIsScanning(false);
      setScanResult(true);
      Vibration.vibrate([0, 15, 30, 45]);
    }, 4400);
  };

  const getScanStepText = () => {
    switch (scanStep) {
      case 0:
        return 'Calibrating focal thread sensors...';
      case 1:
        return 'Analyzing organic fiber weave orientation...';
      case 2:
        return 'Weave pattern matching: Mulberry Silk Crepe Blend...';
      case 3:
        return 'Synthesizing local eco sustainability scores...';
      default:
        return 'Analyzing...';
    }
  };

  const resetScan = () => {
    setIsScanning(false);
    setScanResult(false);
    setScanStep(0);
    setLiveConfidence(0);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Background with Editorial treatment */}
      <EditorialImage
        source={{ uri: IMAGES.fabricBg }}
        style={styles.backgroundImage}
        containerStyle={StyleSheet.absoluteFill}
        enableOverlay={true}
      />
      <View style={styles.overlay} />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <SafeLayout statusBarMode="light-content" style={styles.container} applyBottomInset={true}>
        {/* Top Header bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('HomeTab')}
            style={styles.closeBtn}
          >
            <X size={20} color={THEME.colors.cardBackground} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>ATELIER SCANNER</Text>
            <Text style={styles.subtitle}>AI TEXTILE & PATTERN DETECTOR</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Dynamic Center Viewfinder */}
        {!scanResult ? (
          <View style={styles.centerSection}>
            {/* Viewfinder Target */}
            <View style={styles.scannerBox}>
              <Animated.View
                style={[
                  styles.bracket,
                  styles.bracketTL,
                  { transform: [{ scale: bracketPulse }] },
                  isScanning && styles.bracketScanning,
                ]}
              />
              <Animated.View
                style={[
                  styles.bracket,
                  styles.bracketTR,
                  { transform: [{ scale: bracketPulse }] },
                  isScanning && styles.bracketScanning,
                ]}
              />
              <Animated.View
                style={[
                  styles.bracket,
                  styles.bracketBL,
                  { transform: [{ scale: bracketPulse }] },
                  isScanning && styles.bracketScanning,
                ]}
              />
              <Animated.View
                style={[
                  styles.bracket,
                  styles.bracketBR,
                  { transform: [{ scale: bracketPulse }] },
                  isScanning && styles.bracketScanning,
                ]}
              />

              <Animated.View
                style={[
                  styles.beam,
                  {
                    transform: [{ translateY: scanLineAnim }],
                  },
                ]}
              />

              {/* Advanced Live Bounding Box Nodes */}
              {isScanning && (
                <>
                  <Animated.View style={[styles.scanNode, { top: 60, left: 40, opacity: node1Opacity }]}>
                    <View style={styles.nodePoint} />
                    <View style={styles.nodeCard}>
                      <Text style={styles.nodeLabel}>WEFT ANGLE: 92.4°</Text>
                    </View>
                  </Animated.View>

                  <Animated.View style={[styles.scanNode, { top: 160, left: 130, opacity: node2Opacity }]}>
                    <View style={styles.nodePoint} />
                    <View style={styles.nodeCard}>
                      <Text style={styles.nodeLabel}>THREAD COUNT: HIGH</Text>
                    </View>
                  </Animated.View>

                  <Animated.View style={[styles.scanNode, { top: 100, left: 160, opacity: node3Opacity }]}>
                    <View style={styles.nodePoint} />
                    <View style={styles.nodeCard}>
                      <Text style={styles.nodeLabel}>DENSITY: OPTIMAL</Text>
                    </View>
                  </Animated.View>
                </>
              )}

              {/* Progress counter overlay */}
              {isScanning && (
                <View style={styles.counterOverlay}>
                  <Text style={styles.counterVal}>{liveConfidence}%</Text>
                  <Text style={styles.counterLabel}>RESOLVING TEXTURE</Text>
                </View>
              )}

              {isScanning && (
                <View style={styles.scanningLogsContainer}>
                  <GlassCard style={styles.logGlass} opacity={0.88}>
                    <View style={styles.loaderRow}>
                      <View style={styles.loaderPulse} />
                      <Text style={styles.logText}>{getScanStepText()}</Text>
                    </View>
                  </GlassCard>
                </View>
              )}
            </View>
          </View>
        ) : (
          /* Premium Scan Fabric Report Card */
          <View style={styles.resultContainer}>
            <GlassCard style={styles.resultCard} opacity={0.96}>
              <View style={styles.resultHeader}>
                <View style={styles.sparkleRow}>
                  <Sparkles size={14} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
                  <Text style={styles.resultTag}>ATELIER RECOGNITION COMPLETE</Text>
                </View>
                <Text style={styles.confidenceText}>98.6% CONFIDENCE</Text>
              </View>

              <Text style={styles.fabricName}>Mulberry Silk Crepe Blend</Text>
              <Text style={styles.fabricDesc}>
                High-end fluid twill weave with double-twisted yarn orientation. Extremely breathable, biodegradable fiber characteristics.
              </Text>

              <View style={styles.divider} />

              <View style={styles.specs}>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>WEAVE SPEC</Text>
                  <Text style={styles.specVal}>High-Density Crepe</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>SUSTAINABILITY INDEX</Text>
                  <Text style={styles.specVal}>Grade A • Carbon Neutral</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>CARE GUIDELINES</Text>
                  <Text style={styles.specVal}>Dry Clean Only • Low Heat Iron</Text>
                </View>
              </View>

              <View style={styles.resultActions}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Vibration.vibrate(15);
                    navigation.navigate('Closet');
                  }}
                  style={styles.archiveBtn}
                >
                  <Shirt size={14} color={THEME.colors.primaryBurgundy} style={{ marginRight: 6 }} />
                  <Text style={styles.archiveBtnText}>Archive in Closet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => {
                    Vibration.vibrate(15);
                    navigation.navigate('Stylist');
                  }}
                  style={styles.stylistBtn}
                >
                  <Sparkles size={14} color={THEME.colors.cardBackground} style={{ marginRight: 6 }} />
                  <Text style={styles.stylistBtnText}>Consult AI Stylist</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={resetScan}
                style={styles.resetBtn}
              >
                <Text style={styles.resetBtnText}>Scan Another Piece</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        )}

        {/* Bottom Captured Actions Deck */}
        {!scanResult && (
          <View style={styles.bottomControls}>
            <TouchableOpacity activeOpacity={0.8} style={styles.controlIconBtn}>
              <ImageIcon size={22} color={THEME.colors.cardBackground} />
              <Text style={styles.controlIconLabel}>Library</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleCapture}
              style={[styles.captureBtnContainer, isScanning && styles.captureDisabled]}
              disabled={isScanning}
            >
              <View style={styles.captureBtnOuter}>
                <View style={[styles.captureBtnInner, isScanning && styles.captureActive]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.controlIconBtn}>
              <History size={22} color={THEME.colors.cardBackground} />
              <Text style={styles.controlIconLabel}>History</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(20, 15, 15, 0.52)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 16,
    color: THEME.colors.cardBackground,
    fontWeight: '700',
    letterSpacing: 4,
  },
  subtitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 7.5,
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
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  bracketScanning: {
    borderColor: THEME.colors.gold,
  },
  bracketTL: {
    top: -2,
    left: -2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  bracketTR: {
    top: -2,
    right: -2,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bracketBL: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bracketBR: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  beam: {
    width: '100%',
    height: 1.5,
    backgroundColor: THEME.colors.gold,
    shadowColor: THEME.colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 6,
  },
  scanNode: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodePoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.gold,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  nodeCard: {
    backgroundColor: 'rgba(20, 15, 15, 0.72)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  nodeLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    color: '#FFF',
    fontSize: 6.5,
    letterSpacing: 0.5,
  },
  counterOverlay: {
    position: 'absolute',
    top: '38%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 15, 15, 0.65)',
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.md,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  counterVal: {
    fontFamily: THEME.typography.heading.fontFamily,
    color: THEME.colors.gold,
    fontSize: 24,
    fontWeight: '700',
  },
  counterLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    color: THEME.colors.border,
    fontSize: 7,
    letterSpacing: 1.2,
    marginTop: 2,
  },
  scanningLogsContainer: {
    position: 'absolute',
    bottom: -64,
    left: -16,
    right: -16,
    alignItems: 'center',
  },
  logGlass: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    width: width * 0.72,
    borderRadius: THEME.borderRadius.card - 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loaderPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.primaryBurgundy,
    marginRight: THEME.spacing.sm,
  },
  logText: {
    flex: 1,
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 10,
    color: THEME.colors.darkText,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: THEME.spacing.lg,
  },
  resultCard: {
    padding: THEME.spacing.xl,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: THEME.borderRadius.card,
    ...THEME.shadows.premiumDeep,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  sparkleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultTag: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    color: THEME.colors.primaryBurgundy,
    marginLeft: 4,
  },
  confidenceText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 0.5,
    color: THEME.colors.secondaryText,
  },
  fabricName: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 22,
    color: THEME.colors.darkText,
    marginBottom: THEME.spacing.xs,
  },
  fabricDesc: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    color: THEME.colors.secondaryText,
    lineHeight: 18,
  },
  divider: {
    height: 0.5,
    backgroundColor: THEME.colors.border,
    marginVertical: THEME.spacing.md,
    opacity: 0.6,
  },
  specs: {
    marginBottom: THEME.spacing.lg,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.xs,
  },
  specLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 1,
    color: THEME.colors.secondaryText,
  },
  specVal: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 11,
    color: THEME.colors.darkText,
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  archiveBtn: {
    flex: 1.1,
    height: 42,
    borderRadius: 21,
    borderWidth: 0.5,
    borderColor: THEME.colors.primaryBurgundy,
    backgroundColor: THEME.colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: THEME.spacing.xs,
  },
  archiveBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 11,
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 0.5,
  },
  stylistBtn: {
    flex: 1.1,
    height: 42,
    borderRadius: 21,
    backgroundColor: THEME.colors.primaryBurgundy,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: THEME.spacing.xs,
  },
  stylistBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 11,
    color: THEME.colors.cardBackground,
    letterSpacing: 0.5,
  },
  resetBtn: {
    alignSelf: 'center',
    marginTop: THEME.spacing.md,
    paddingVertical: THEME.spacing.xs,
  },
  resetBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 11.5,
    color: THEME.colors.secondaryText,
    textDecorationLine: 'underline',
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
  captureDisabled: {
    opacity: 0.5,
  },
  captureBtnOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
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
  captureActive: {
    backgroundColor: THEME.colors.gold,
  },
});
