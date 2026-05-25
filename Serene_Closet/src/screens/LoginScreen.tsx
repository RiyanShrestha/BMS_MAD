import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { KeyRound, Mail } from 'lucide-react-native';
import { THEME } from '../theme';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryInput } from '../components/LuxuryInput';
import { LuxuryButton } from '../components/LuxuryButton';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('sarswati@serene.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    // Navigate straight to the primary Main Tab Navigation container!
    navigation.replace('MainApp');
  };

  return (
    <ImageBackground
      source={{ uri: IMAGES.loginBg }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Header: Brand Logo */}
            <View style={styles.headerSection}>
              <Text style={styles.logoTextSub}>SERENE</Text>
              <Text style={styles.logoText}>CLOSETS</Text>
              <Text style={styles.tagline}>AI COGNITIVE STYLING</Text>
            </View>

            {/* Bottom Input Card */}
            <GlassCard style={styles.formCard} opacity={0.96}>
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
                  onPress={() => setRememberMe(!rememberMe)}
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
                <TouchableOpacity activeOpacity={0.85} style={styles.socialBtn}>
                  <Text style={styles.socialBtnText}>Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.85} style={styles.socialBtn}>
                  <Text style={styles.socialBtnText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.85} style={styles.socialBtn}>
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
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
    backgroundColor: 'rgba(43, 29, 29, 0.48)',
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
    fontSize: 24,
    color: THEME.colors.cardBackground,
    letterSpacing: 8,
    textTransform: 'uppercase',
  },
  logoText: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 38,
    color: THEME.colors.cardBackground,
    fontWeight: '700',
    letterSpacing: 4,
    marginTop: -4,
  },
  tagline: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 10,
    color: THEME.colors.border,
    letterSpacing: 2,
    marginTop: THEME.spacing.xs,
  },
  formCard: {
    marginHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.xl,
    paddingHorizontal: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: THEME.borderRadius.card + 6,
    ...THEME.shadows.premiumDeep,
  },
  cardTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 24,
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
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.cardBackground,
  },
  checkboxChecked: {
    borderColor: THEME.colors.primaryBurgundy,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 2,
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
    height: 1,
    backgroundColor: THEME.colors.border,
    opacity: 0.6,
  },
  dividerText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
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
    borderWidth: 1,
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    ...THEME.shadows.premium,
  },
  socialBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12,
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
    fontSize: 13,
    color: THEME.colors.secondaryText,
  },
  registerText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 13,
    color: THEME.colors.primaryBurgundy,
    textDecorationLine: 'underline',
  },
});
