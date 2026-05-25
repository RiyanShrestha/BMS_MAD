import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Animated,
  Vibration,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME } from '../theme';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryInput } from '../components/LuxuryInput';
import { LuxuryButton } from '../components/LuxuryButton';
import { EditorialImage } from '../components/EditorialImage';

export const LoginScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('sarswati@serene.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  // Motion reveals
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(28)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = () => {
    Vibration.vibrate([0, 10, 30]);
    navigation.replace('MainApp');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Editorial campaign bg */}
      <EditorialImage
        source={{ uri: IMAGES.loginBg }}
        style={styles.backgroundImage}
        containerStyle={StyleSheet.absoluteFill}
        enableOverlay={true}
      />
      <View style={styles.overlay} />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Header: Brand Logo */}
            <Animated.View style={[styles.headerSection, { opacity: headerOpacity }]}>
              <Text style={styles.logoTextSub}>SERENE</Text>
              <Text style={styles.logoText}>CLOSETS</Text>
              <Text style={styles.tagline}>AI COGNITIVE STYLING</Text>
            </Animated.View>

            {/* Bottom Input Card */}
            <Animated.View style={[
              styles.formWrapper,
              {
                opacity: formOpacity,
                transform: [{ translateY: formTranslateY }]
              }
            ]}>
              <GlassCard style={styles.formCard} opacity={0.94}>
                <Text style={styles.cardTitle}>Welcome Back</Text>
                <Text style={styles.cardSubtitle}>Continue your personalized fashion journey.</Text>

                {/* Inputs */}
                <LuxuryInput
                  label="Email Address"
                  placeholder="sarswati@serene.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <LuxuryInput
                  label="Password"
                  placeholder="••••••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />

                {/* Options: Remember Me & Forgot Password */}
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      Vibration.vibrate(6);
                      setRememberMe(!rememberMe);
                    }}
                    style={styles.checkboxContainer}
                  >
                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                      {rememberMe && <View style={styles.checkboxInner} />}
                    </View>
                    <Text style={styles.checkboxLabel}>Remember Me</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Action Button */}
                <LuxuryButton
                  title="Sign In"
                  onPress={handleLogin}
                  style={styles.signInBtn}
                />

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR CONNECT WITH</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Social Login Buttons */}
                <View style={styles.socialContainer}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => Vibration.vibrate(8)}
                    style={styles.socialBtn}
                  >
                    <Text style={styles.socialBtnText}>Apple</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => Vibration.vibrate(8)}
                    style={styles.socialBtn}
                  >
                    <Text style={styles.socialBtnText}>Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => Vibration.vibrate(8)}
                    style={styles.socialBtn}
                  >
                    <Text style={styles.socialBtnText}>Facebook</Text>
                  </TouchableOpacity>
                </View>

                {/* Create Account link */}
                <View style={styles.registerContainer}>
                  <Text style={styles.noAccountText}>New to SERENE? </Text>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Text style={styles.registerText}>Create Account</Text>
                  </TouchableOpacity>
                </View>
              </GlassCard>
            </Animated.View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
    backgroundColor: 'rgba(32, 21, 21, 0.46)',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: THEME.spacing.lg,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: THEME.spacing.xxl,
    marginBottom: THEME.spacing.xl,
  },
  logoTextSub: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 20,
    color: THEME.colors.cardBackground,
    letterSpacing: 8,
    textTransform: 'uppercase',
  },
  logoText: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 34,
    color: THEME.colors.cardBackground,
    fontWeight: '700',
    letterSpacing: 4,
    marginTop: -4,
  },
  tagline: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 9.5,
    color: THEME.colors.border,
    letterSpacing: 2.2,
    marginTop: THEME.spacing.xs,
  },
  formWrapper: {
    marginHorizontal: THEME.spacing.lg,
  },
  formCard: {
    paddingVertical: THEME.spacing.xl,
    paddingHorizontal: THEME.spacing.lg,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: THEME.borderRadius.card + 4,
    ...THEME.shadows.premiumDeep,
  },
  cardTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 22,
    color: THEME.colors.darkText,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.lg,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.lg,
    paddingHorizontal: THEME.spacing.xs,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.cardBackground,
  },
  checkboxChecked: {
    borderColor: THEME.colors.primaryBurgundy,
  },
  checkboxInner: {
    width: 8,
    height: 8,
    borderRadius: 1.5,
    backgroundColor: THEME.colors.primaryBurgundy,
  },
  checkboxLabel: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    color: THEME.colors.darkText,
    marginLeft: THEME.spacing.sm,
  },
  forgotText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    color: THEME.colors.primaryBurgundy,
    textDecorationLine: 'underline',
  },
  signInBtn: {
    width: '100%',
    marginBottom: THEME.spacing.lg,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: THEME.colors.border,
    opacity: 0.6,
  },
  dividerText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 7.5,
    letterSpacing: 1.5,
    color: THEME.colors.secondaryText,
    marginHorizontal: THEME.spacing.sm,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.lg,
  },
  socialBtn: {
    flex: 1,
    height: 42,
    borderRadius: THEME.borderRadius.button,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    ...THEME.shadows.premium,
  },
  socialBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 11.5,
    color: THEME.colors.darkText,
    letterSpacing: 0.5,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: THEME.spacing.xs,
  },
  noAccountText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.secondaryText,
  },
  registerText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.primaryBurgundy,
    textDecorationLine: 'underline',
  },
});
