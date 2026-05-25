import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { CloudSun, ArrowRight } from './Icons';
import { THEME } from '../theme';
import { GlassCard } from './GlassCard';
import { LuxuryButton } from './LuxuryButton';

interface WeatherCardProps {
  location?: string;
  temperature?: string;
  condition?: string;
  recommendation?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  location = 'Bangalore',
  temperature = '24°C',
  condition = 'Breezy & Mild',
  recommendation = 'Perfect for a warm layered look. I suggest pairing the Pure Cashmere ribbed knit with tailored trousers.',
  onActionPress,
  style,
}) => {
  return (
    <GlassCard style={[styles.container, style]} opacity={0.75}>
      <View style={styles.header}>
        <View>
          <Text style={styles.location}>{location} • {temperature}</Text>
          <Text style={styles.condition}>{condition}</Text>
        </View>
        <CloudSun size={28} color={THEME.colors.primaryBurgundy} strokeWidth={1.5} />
      </View>
      
      <View style={styles.divider} />

      <Text style={styles.tipTitle}>AI DAILY RECOMMENDATION</Text>
      <Text style={styles.recommendationText}>{recommendation}</Text>

      {onActionPress && (
        <LuxuryButton
          title="View Suggested Look"
          onPress={onActionPress}
          variant="outline"
          style={styles.button}
          textStyle={styles.buttonText}
          icon={<ArrowRight size={14} color={THEME.colors.primaryBurgundy} style={{ marginRight: 4 }} />}
        />
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: THEME.spacing.md,
    marginBottom: THEME.spacing.lg,
    padding: THEME.spacing.md + 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 14,
    color: THEME.colors.darkText,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  condition: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 22,
    color: THEME.colors.primaryBurgundy,
    marginTop: THEME.spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.border,
    marginVertical: THEME.spacing.md,
    opacity: 0.6,
  },
  tipTitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 10,
    color: THEME.colors.secondaryText,
    letterSpacing: 1.5,
    marginBottom: THEME.spacing.xs,
  },
  recommendationText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 13,
    color: THEME.colors.darkText,
    lineHeight: 18,
  },
  button: {
    height: 38,
    marginTop: THEME.spacing.md,
    borderRadius: THEME.borderRadius.button - 4,
    alignSelf: 'flex-start',
    paddingHorizontal: THEME.spacing.md,
  },
  buttonText: {
    fontSize: 11,
    letterSpacing: 1,
  },
});
