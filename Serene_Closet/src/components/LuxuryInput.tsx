import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { THEME } from '../theme';

interface LuxuryInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  error?: string;
}

export const LuxuryInput: React.FC<LuxuryInputProps> = ({
  label,
  containerStyle,
  inputStyle,
  error,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor={THEME.colors.secondaryText}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: THEME.spacing.md,
    width: '100%',
  },
  label: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12,
    color: THEME.colors.darkText,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: THEME.spacing.xs,
    marginLeft: THEME.spacing.xs,
  },
  inputContainer: {
    height: 52,
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.input,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingHorizontal: THEME.spacing.md,
    justifyContent: 'center',
    ...THEME.shadows.premium,
  },
  inputFocused: {
    borderColor: THEME.colors.primaryBurgundy,
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  input: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 14,
    color: THEME.colors.darkText,
    padding: 0, // Reset default padding
  },
  errorText: {
    fontSize: 11,
    color: '#D32F2F',
    marginTop: THEME.spacing.xs,
    marginLeft: THEME.spacing.xs,
    fontFamily: THEME.typography.body.fontFamily,
  },
});
