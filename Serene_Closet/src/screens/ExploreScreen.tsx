import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME } from '../theme';
import { EXPLORE_PRODUCTS } from '../utils/mockData';
import { SearchBar } from '../components/SearchBar';
import { CategoryChip } from '../components/CategoryChip';
import { AnimatedProductCard } from '../components/AnimatedProductCard';
import { SafeLayout } from '../components/SafeLayout';

const CATEGORIES = ['All', 'Women', 'Men', 'Luxury'];

export const ExploreScreen = ({ navigation }: any): React.JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  const filteredProducts = EXPLORE_PRODUCTS.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      prod.category.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'Luxury' && parseInt(prod.price.replace('$', '').replace(',', ''), 10) > 600);
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container}>

      {/* Header section */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>EXCLUSIVE COLLECTIONS & ATELIERS</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <SearchBar
          placeholder="Search collections..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Categories Chips (Horizontal) */}
      <View style={styles.chipContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipScroll}
          scrollEventThrottle={16}
        >
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              isActive={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Product Grid (FlatList with 2 columns) */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found in this category.</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <AnimatedProductCard
            id={item.id}
            image={item.image}
            title={item.title}
            category={item.category}
            price={item.price}
            index={index}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        )}
      />
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.softBeigeBackground,
  },
  header: {
    paddingHorizontal: THEME.spacing.md,
    paddingTop: THEME.spacing.md,
    paddingBottom: THEME.spacing.xs,
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 24,
    color: THEME.colors.darkText,
  },
  subtitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    color: THEME.colors.secondaryText,
    marginTop: 2,
  },
  searchWrapper: {
    paddingHorizontal: THEME.spacing.md,
    marginVertical: THEME.spacing.sm,
  },
  chipContainer: {
    height: 48,
    marginBottom: THEME.spacing.sm,
  },
  chipScroll: {
    paddingLeft: THEME.spacing.md,
    paddingRight: THEME.spacing.sm,
  },
  gridContainer: {
    paddingHorizontal: THEME.spacing.md,
    paddingBottom: 100,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    paddingVertical: THEME.spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 13,
    color: THEME.colors.secondaryText,
  },
});
