import { useEffect, useRef, useState } from 'react';
import { Animated,StyleSheet,LayoutAnimation, Pressable,View,Text, Easing, Button } from 'react-native';
import { Section } from '../components/Section';
import { colors, radius, spacing } from '../theme';


export default function AnimatedApiDemo() {
  // useRef : la valeur animée doit survivre aux re-renders sans être recréée.
  const progress = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Un Animated.Value peut être interpolé vers n'importe quoi : degrés, couleurs, pixels…
  const rotate = progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const translateX = progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 120, 0] });
  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.boxA, colors.boxB],
  });

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, [opacity]);

  const runTiming = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 1200,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const runSpring = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.5, friction: 3, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();
  };

  const runParallel = () => {
    progress.setValue(0);
    Animated.parallel([
      Animated.timing(progress, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.sequence([
        Animated.timing(scale, { toValue: 0.5, duration: 500, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();
  };

  return (
    <Section
      title="Animated (API intégrée)"
      description="Animated.Value + timing / spring / sequence / parallel + interpolate. Seuls Animated.View, Text, Image, ScrollView (ou createAnimatedComponent) acceptent des valeurs animées."
    >
      <View style={styles.stage}>
        <Animated.View
          style={[
            styles.animatedBox,
            { opacity, backgroundColor, transform: [{ translateX }, { rotate }, { scale }] },
          ]}
        />
      </View>
      <View style={styles.buttons}>
        <Button title="timing" onPress={runTiming} />
        <Button title="spring" onPress={runSpring} />
        <Button title="parallel" onPress={runParallel} />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    lineHeight: 22,
  },
  hint: {
    color: colors.muted,
    marginTop: spacing.sm,
    fontSize: 12,
  },
  accordionHeader: {
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: radius.sm,
  },
  accordionTitle: {
    fontWeight: '700',
    color: colors.primary,
  },
  accordionBody: {
    padding: spacing.md,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.border,
    borderBottomLeftRadius: radius.sm,
    borderBottomRightRadius: radius.sm,
  },
  stage: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  animatedBox: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    minHeight: 44,
  },
  tag: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
  },
  tagText: {
    color: '#fff',
    fontWeight: '600',
  },
});

