import React from 'react';
import { StyleSheet, Text, View, ViewStyle, Vibration } from 'react-native';
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
  const handleAction = () => {
    Vibration.vibrate(10);
    if (onActionPress) onActionPress();
  };

  return (
    <GlassCard style={[styles.container, style]} opacity={0.78}>
      <View style={styles.header}>
        <View>
          <Text style={styles.location}>{location.toUpperCase()} • {temperature}</Text>
          <Text style={styles.condition}>{condition}</Text>
        </View>
        <CloudSun size={26} color={THEME.colors.primaryBurgundy} strokeWidth={1.5} />
      </View>
      
      <View style={styles.divider} />

      <Text style={styles.tipTitle}>AI DAILY RECOMMENDATION</Text>
      <Text style={styles.recommendationText}>{recommendation}</Text>

      {onActionPress && (
        <LuxuryButton
          title="View Suggested Look"
          onPress={handleAction}
          variant="outline"
          style={styles.button}
          textStyle={styles.buttonText}
          icon={<ArrowRight size={13} color={THEME.colors.primaryBurgundy} style={{ marginRight: 4 }} />}
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
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 10.5,
    color: THEME.colors.darkText,
    letterSpacing: 1.5,
  },
  condition: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 20,
    color: THEME.colors.primaryBurgundy,
    marginTop: THEME.spacing.xs,
  },
  divider: {
    height: 0.5,
    backgroundColor: THEME.colors.border,
    marginVertical: THEME.spacing.md,
    opacity: 0.6,
  },
  tipTitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8.5,
    color: THEME.colors.secondaryText,
    letterSpacing: 1.8,
    marginBottom: THEME.spacing.xs,
    textTransform: 'uppercase',
  },
  recommendationText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.darkText,
    lineHeight: 18,
  },
  button: {
    height: 38,
    marginTop: THEME.spacing.md,
    borderRadius: THEME.borderRadius.button,
    alignSelf: 'flex-start',
    paddingHorizontal: THEME.spacing.md,
  },
  buttonText: {
    fontSize: 10.5,
    letterSpacing: 1.2,
  },
});
