import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialHeader } from '../components/EditorialHeader';
import { GlassCard } from '../components/GlassCard';
import { THEME } from '../theme';
import { Sparkles, Info } from '../components/Icons';

export const SettingsScreen = ({ navigation }: any) => {
  const [darkMode, setDarkMode] = useState(false);
  const [biometrics, setBiometrics] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container}>
      <EditorialHeader
        title="Settings"
        subtitle="Private Atelier Configurations"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Concierge Support Card */}
        <View style={styles.supportSection}>
          <GlassCard style={styles.supportCard} opacity={0.94}>
            <View style={styles.supportHeader}>
              <Sparkles size={16} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
              <Text style={styles.supportHeaderTitle}>VIP LUXURY CONCIERGE</Text>
            </View>
            <Text style={styles.supportText}>
              "A dedicated styling consultant is standing by to assist you with physical fittings, couture reservations, or bespoke digital closet organization."
            </Text>
            <TouchableOpacity activeOpacity={0.88} style={styles.supportBtn}>
              <Text style={styles.supportBtnText}>CALL CONCIERGE ATELIER</Text>
            </TouchableOpacity>
          </GlassCard>
        </View>

        {/* Configurations List */}
        <View style={styles.configSection}>
          <Text style={styles.sectionLabel}>AESTHETIC CONFIGURATIONS</Text>
          
          <View style={styles.configItem}>
            <View>
              <Text style={styles.configTitle}>Dark Mode Styling</Text>
              <Text style={styles.configSub}>Invert layout to cinematic deep black styling</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: THEME.colors.border, true: THEME.colors.primaryBurgundy }}
              thumbColor={THEME.colors.cardBackground}
            />
          </View>

          <View style={styles.configItem}>
            <View>
              <Text style={styles.configTitle}>Biometric Safe Entry</Text>
              <Text style={styles.configSub}>Secure your fashion archive with Fingerprint/FaceID</Text>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: THEME.colors.border, true: THEME.colors.primaryBurgundy }}
              thumbColor={THEME.colors.cardBackground}
            />
          </View>

          <View style={styles.configItem}>
            <View>
              <Text style={styles.configTitle}>Push Recommendations</Text>
              <Text style={styles.configSub}>Receive micro weather notifications and fits</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: THEME.colors.border, true: THEME.colors.primaryBurgundy }}
              thumbColor={THEME.colors.cardBackground}
            />
          </View>
        </View>

        {/* Legal Info */}
        <View style={styles.legalSection}>
          <View style={styles.legalRow}>
            <Info size={12} color={THEME.colors.secondaryText} />
            <Text style={styles.legalText}>SERENE Closets App Version 0.0.1 • Crafted in Bengaluru</Text>
          </View>
        </View>
      </ScrollView>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.softBeigeBackground,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  supportSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.md,
  },
  supportCard: {
    padding: THEME.spacing.md + 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  supportHeaderTitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 2,
    color: THEME.colors.primaryBurgundy,
    marginLeft: 6,
  },
  supportText: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 14,
    color: THEME.colors.darkText,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  supportBtn: {
    backgroundColor: THEME.colors.primaryBurgundy,
    height: 40,
    borderRadius: 20,
    marginTop: THEME.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.shadows.premium,
  },
  supportBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    color: THEME.colors.cardBackground,
    letterSpacing: 1.5,
  },
  configSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.xl,
  },
  sectionLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 2,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.md,
  },
  configItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.card - 4,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
    ...THEME.shadows.premium,
  },
  configTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 15,
    color: THEME.colors.darkText,
  },
  configSub: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 11,
    color: THEME.colors.secondaryText,
    marginTop: 2,
  },
  legalSection: {
    alignItems: 'center',
    marginTop: THEME.spacing.xl,
    paddingBottom: 20,
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legalText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    color: THEME.colors.secondaryText,
    marginLeft: 6,
    letterSpacing: 0.5,
  },
});
