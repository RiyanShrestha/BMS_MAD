import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Home as HomeIcon, Compass, Scan, Shirt, Sparkles } from '../components/Icons';
import { THEME } from '../theme';

// Import Screens
import { IntroScreen1 } from '../screens/IntroScreen1';
import { IntroScreen2 } from '../screens/IntroScreen2';
import { IntroScreen3 } from '../screens/IntroScreen3';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { StylistScreen } from '../screens/StylistScreen';
import { WardrobeScreen } from '../screens/WardrobeScreen';

// Navigation Stacks & Tabs
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigation Configuration
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: THEME.colors.primaryBurgundy,
        tabBarInactiveTintColor: THEME.colors.secondaryText,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size, focused }) => {
          const strokeWidth = focused ? 2 : 1.2;
          const iconSize = 20;

          switch (route.name) {
            case 'HomeTab':
              return <HomeIcon size={iconSize} color={color} strokeWidth={strokeWidth} />;
            case 'Explore':
              return <Compass size={iconSize} color={color} strokeWidth={strokeWidth} />;
            case 'Scan':
              return (
                <View style={styles.centerScanContainer}>
                  <View style={styles.centerScanButton}>
                    <Scan size={22} color={THEME.colors.cardBackground} strokeWidth={2} />
                  </View>
                </View>
              );
            case 'Closet':
              return <Shirt size={iconSize} color={color} strokeWidth={strokeWidth} />;
            case 'Stylist':
              return <Sparkles size={iconSize} color={color} strokeWidth={strokeWidth} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel: 'Scan',
          tabBarLabelStyle: [styles.tabLabel, styles.tabLabelCenter],
        }}
      />
      <Tab.Screen
        name="Closet"
        component={WardrobeScreen}
        options={{ tabBarLabel: 'Closet' }}
      />
      <Tab.Screen
        name="Stylist"
        component={StylistScreen}
        options={{ tabBarLabel: 'Stylist' }}
      />
    </Tab.Navigator>
  );
};

// Root Stack Navigator
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro1"
        screenOptions={{
          headerShown: false,
          animation: 'fade', // Sophisticated transitions
        }}
      >
        <Stack.Screen name="Intro1" component={IntroScreen1} />
        <Stack.Screen name="Intro2" component={IntroScreen2} />
        <Stack.Screen name="Intro3" component={IntroScreen3} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 22,
    left: 16,
    right: 16,
    height: 64,
    backgroundColor: 'rgba(255, 248, 247, 0.94)', // Soft glass texture
    borderRadius: THEME.borderRadius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    ...THEME.shadows.premiumDeep,
    paddingTop: 8,
    paddingBottom: 8,
    elevation: 8,
  },
  tabLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 10,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  tabLabelCenter: {
    marginTop: 18, // Adjust offset for centered capture bubble
  },
  centerScanContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerScanButton: {
    position: 'absolute',
    top: -28, // Floats elegantly above the bar line
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.primaryBurgundy,
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.shadows.premiumDeep,
    borderWidth: 2,
    borderColor: THEME.colors.cardBackground,
  },
});
