import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Vibration,
} from 'react-native';
import { SafeLayout } from '../components/SafeLayout';
import { Send, Sparkles, RefreshCw, Bookmark } from '../components/Icons';
import { THEME } from '../theme';
import { AI_RECOMMENDED_LOOK, CHAT_HISTORY } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { EditorialImage } from '../components/EditorialImage';

const CONTEXTS = ['Boardroom', 'High-Tea', 'Soiree', 'Dinner'];

export const StylistScreen = () => {
  const [messages, setMessages] = useState(CHAT_HISTORY);
  const [inputValue, setInputValue] = useState('');
  const [selectedContext, setSelectedContext] = useState('Boardroom');
  const [currentLook, setCurrentLook] = useState(AI_RECOMMENDED_LOOK);
  const [isTyping, setIsTyping] = useState(false);

  // Typing Dots Animation
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  // Fade-in animation for recommendations
  const revealAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (isTyping) {
      const animateDot = (dot: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(dot, {
              toValue: 1.0,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        );
      };

      const anim1 = animateDot(dot1, 0);
      const anim2 = animateDot(dot2, 150);
      const anim3 = animateDot(dot3, 300);

      anim1.start();
      anim2.start();
      anim3.start();

      return () => {
        anim1.stop();
        anim2.stop();
        anim3.stop();
      };
    }
  }, [isTyping, dot1, dot2, dot3]);

  // Stagger look reveal on occasions change
  useEffect(() => {
    revealAnim.setValue(0.5);
    Animated.timing(revealAnim, {
      toValue: 1,
      duration: THEME.motion.durations.screen,
      useNativeDriver: true,
    }).start();
  }, [selectedContext]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    Vibration.vibrate(10);
    const newMsg = {
      id: `m-${messages.length + 1}`,
      sender: 'user',
      text: inputValue,
    };

    setMessages([...messages, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI Concierge typing pacing simulation
    setTimeout(() => {
      setIsTyping(false);
      Vibration.vibrate(15);
      const responses = [
        "Splendid choice. I would suggest matching that with our Pleated Wool Trousers and the Cashmere Knit for a softer architectural line.",
        "An elegant direction. Let's accent that with gold-toned fine jewelry to anchor the luxury warmth of the fabric composition.",
        "Understood, Sarswati. I've updated the seasonal capsule archive. The composition is highly optimized for comfort and visual authority."
      ];
      const randomResponse = {
        id: `m-${messages.length + 2}`,
        sender: 'stylist',
        text: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, randomResponse]);
    }, 2000);
  };

  const handleSwapItems = () => {
    Vibration.vibrate(10);
    const swappedItems = [...currentLook.items];
    const first = swappedItems.shift();
    if (first) {
      swappedItems.push(first);
    }
    setCurrentLook({
      ...currentLook,
      items: swappedItems,
    });
  };

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header section */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Sparkles size={18} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
              <Text style={styles.title}>AI Stylist</Text>
            </View>
            <Text style={styles.subtitle}>COGNITIVE CONCIERGE & CAPSULES</Text>
          </View>

          {/* Context Filter Chips */}
          <View style={styles.contextWrapper}>
            <Text style={styles.sectionLabel}>TARGET STYLE OCCASION</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contextScroll}>
              {CONTEXTS.map((ctx) => (
                <TouchableOpacity
                  key={ctx}
                  activeOpacity={0.8}
                  onPress={() => {
                    Vibration.vibrate(8);
                    setSelectedContext(ctx);
                  }}
                  style={[
                    styles.contextChip,
                    selectedContext === ctx && styles.contextChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.contextChipText,
                      selectedContext === ctx && styles.contextChipTextActive,
                    ]}
                  >
                    {ctx.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Curated Outfit Set Presentation */}
          <Animated.View style={[styles.outfitSection, { opacity: revealAnim }]}>
            <Text style={styles.sectionLabel}>RECOMMENDED LOOK COMPOSITION</Text>
            <Text style={styles.lookTitle}>{currentLook.name}</Text>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.outfitScroll}
            >
              {currentLook.items.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <View style={styles.itemImageContainer}>
                    <EditorialImage
                      source={{ uri: item.image }}
                      style={styles.itemImage}
                      containerStyle={styles.itemImageContainer}
                    />
                  </View>
                  <View style={styles.itemMeta}>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                    <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.itemBrand}>{item.brand}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Action buttons for composition */}
            <View style={styles.outfitActions}>
              <LuxuryButton
                title="Swap Items"
                onPress={handleSwapItems}
                variant="outline"
                style={styles.actionBtn}
                icon={<RefreshCw size={14} color={THEME.colors.primaryBurgundy} style={{ marginRight: 6 }} />}
              />
              <LuxuryButton
                title="Save Look"
                onPress={() => Vibration.vibrate([0, 15, 20])}
                style={styles.actionBtnRight}
                icon={<Bookmark size={14} color={THEME.colors.cardBackground} style={{ marginRight: 6 }} />}
              />
            </View>
          </Animated.View>

          {/* Chat dialog logs */}
          <View style={styles.chatSection}>
            <Text style={styles.sectionLabel}>STYLIST CONVERSATION LOG</Text>
            
            {messages.map((msg) => {
              const isStylist = msg.sender === 'stylist';
              return (
                <View
                  key={msg.id}
                  style={[
                    styles.messageRow,
                    isStylist ? styles.messageRowLeft : styles.messageRowRight,
                  ]}
                >
                  {isStylist ? (
                    <GlassCard style={styles.stylistBubble} opacity={0.88}>
                      <Text style={styles.messageText}>{msg.text}</Text>
                    </GlassCard>
                  ) : (
                    <View style={styles.userBubble}>
                      <Text style={styles.userMessageText}>{msg.text}</Text>
                    </View>
                  )}
                </View>
              );
            })}

            {/* Pulsing AI Typing indicator */}
            {isTyping && (
              <View style={[styles.messageRow, styles.messageRowLeft]}>
                <GlassCard style={styles.typingBubble} opacity={0.85}>
                  <Animated.View style={[styles.typingDot, { opacity: dot1 }]} />
                  <Animated.View style={[styles.typingDot, { opacity: dot2 }]} />
                  <Animated.View style={[styles.typingDot, { opacity: dot3 }]} />
                </GlassCard>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Input Bar (Sticky Bottom) */}
        <View style={styles.inputStickyContainer}>
          <GlassCard style={styles.inputStickyCard} opacity={0.94}>
            <TextInput
              style={styles.chatInput}
              placeholder="Ask Serene Stylist..."
              placeholderTextColor={THEME.colors.secondaryText}
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSend}
              style={styles.sendBtn}
            >
              <Send size={16} color={THEME.colors.cardBackground} />
            </TouchableOpacity>
          </GlassCard>
        </View>
      </KeyboardAvoidingView>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.softBeigeBackground,
  },
  scrollContent: {
    paddingBottom: 180, // Buffer for sticky bottom chat input + tab nav
  },
  header: {
    paddingHorizontal: THEME.spacing.md,
    paddingTop: THEME.spacing.md,
    paddingBottom: THEME.spacing.xs,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 22,
    color: THEME.colors.darkText,
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    color: THEME.colors.secondaryText,
    marginTop: 2,
  },
  contextWrapper: {
    marginTop: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.md,
  },
  sectionLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8.5,
    letterSpacing: 1.8,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.sm,
    textTransform: 'uppercase',
  },
  contextScroll: {
    flexDirection: 'row',
  },
  contextChip: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.xs + 2,
    borderRadius: THEME.borderRadius.pill,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    marginRight: 6,
    backgroundColor: THEME.colors.cardBackground,
  },
  contextChipActive: {
    backgroundColor: THEME.colors.primaryBurgundy,
    borderColor: THEME.colors.primaryBurgundy,
  },
  contextChipText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 10,
    letterSpacing: 0.8,
    color: THEME.colors.secondaryText,
  },
  contextChipTextActive: {
    color: THEME.colors.cardBackground,
    fontFamily: THEME.typography.bodyBold.fontFamily,
  },
  outfitSection: {
    marginTop: THEME.spacing.lg,
    paddingHorizontal: THEME.spacing.md,
  },
  lookTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 18,
    color: THEME.colors.darkText,
    marginBottom: THEME.spacing.md,
  },
  outfitScroll: {
    paddingBottom: THEME.spacing.xs,
  },
  itemCard: {
    width: 140,
    marginRight: THEME.spacing.md,
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.card,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    padding: THEME.spacing.sm,
    ...THEME.shadows.premium,
  },
  itemImageContainer: {
    width: '100%',
    height: 140,
    borderRadius: THEME.borderRadius.card - 4,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemMeta: {
    paddingTop: THEME.spacing.sm,
  },
  itemCategory: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 8,
    color: THEME.colors.secondaryText,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 12,
    color: THEME.colors.darkText,
    marginVertical: 1,
  },
  itemBrand: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    color: THEME.colors.primaryBurgundy,
    letterSpacing: 0.5,
  },
  outfitActions: {
    flexDirection: 'row',
    marginTop: THEME.spacing.md,
  },
  actionBtn: {
    flex: 1,
    height: 40,
    borderRadius: THEME.borderRadius.button,
  },
  actionBtnRight: {
    flex: 1,
    height: 40,
    borderRadius: THEME.borderRadius.button,
    marginLeft: THEME.spacing.sm,
  },
  chatSection: {
    marginTop: THEME.spacing.xl,
    paddingHorizontal: THEME.spacing.md,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: THEME.spacing.md,
    width: '100%',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
    paddingRight: THEME.spacing.xl,
  },
  messageRowRight: {
    justifyContent: 'flex-end',
    paddingLeft: THEME.spacing.xl,
  },
  stylistBubble: {
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: THEME.borderRadius.card,
    borderTopLeftRadius: 4,
    padding: THEME.spacing.md,
    backgroundColor: THEME.colors.cardBackground,
    ...THEME.shadows.premium,
  },
  userBubble: {
    backgroundColor: THEME.colors.primaryBurgundy,
    borderRadius: THEME.borderRadius.card,
    borderTopRightRadius: 4,
    padding: THEME.spacing.md,
    ...THEME.shadows.premium,
  },
  messageText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.darkText,
    lineHeight: 18,
  },
  userMessageText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.cardBackground,
    lineHeight: 18,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 62,
    height: 32,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    backgroundColor: THEME.colors.cardBackground,
  },
  typingDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: THEME.colors.primaryBurgundy,
    marginHorizontal: 2.5,
  },
  inputStickyContainer: {
    position: 'absolute',
    bottom: 96, // Anchored elegantly above bottom tab navigation
    left: THEME.spacing.md,
    right: THEME.spacing.md,
    zIndex: 100,
  },
  inputStickyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: THEME.borderRadius.pill,
    paddingLeft: THEME.spacing.md + 2,
    paddingRight: THEME.spacing.xs,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    ...THEME.shadows.premiumDeep,
  },
  chatInput: {
    flex: 1,
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 13,
    color: THEME.colors.darkText,
    padding: 0,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: THEME.colors.primaryBurgundy,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
