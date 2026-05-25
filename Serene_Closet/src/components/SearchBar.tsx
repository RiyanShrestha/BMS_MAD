import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Search, SlidersHorizontal } from './Icons';
import { THEME } from '../theme';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search luxury collections...',
  value,
  onChangeText,
  onFilterPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchSection}>
        <Search size={18} color={THEME.colors.secondaryText} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={THEME.colors.secondaryText}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {onFilterPress && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onFilterPress}
          style={styles.filterButton}
        >
          <SlidersHorizontal size={18} color={THEME.colors.primaryBurgundy} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: THEME.spacing.md,
  },
  searchSection: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.pill,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingHorizontal: THEME.spacing.md,
    ...THEME.shadows.premium,
  },
  searchIcon: {
    marginRight: THEME.spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 14,
    color: THEME.colors.darkText,
    padding: 0,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: THEME.borderRadius.pill,
    backgroundColor: THEME.colors.cardBackground,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginLeft: THEME.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.shadows.premium,
  },
});
