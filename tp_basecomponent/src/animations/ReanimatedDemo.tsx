import { useEffect, useRef, useState } from 'react';
import { Animated, Button, Easing, LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, {
  Easing as ReEasing,
  FadeInDown,
  FadeOutLeft,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Section } from '../components/Section';
import { colors, radius, spacing } from '../theme';




export default function ReanimatedBasicsDemo() {
  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);
  const pulse = useSharedValue(1);

  // useAnimatedStyle est un worklet : il s'exécute sur le thread UI à chaque frame.
  const boxStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }, { rotate: `${rotation.value}deg` }, { scale: pulse.value }],
  }));

  const move = () => {
    // Écrire dans .value avec withSpring / withTiming lance l'animation.
    offset.value = withSpring(offset.value === 0 ? 120 : 0, { damping: 12 });
  };

  const spin = () => {
    rotation.value = withTiming(rotation.value + 360, { duration: 800, easing: ReEasing.out(ReEasing.exp) });
  };

  const heartbeat = () => {
    pulse.value = withRepeat(withSequence(withTiming(1.3, { duration: 150 }), withTiming(1, { duration: 150 })), 3);
  };

  return (
    <Section
      title="Reanimated : useSharedValue + useAnimatedStyle"
      description="Une shared value vit sur le thread UI. On l'anime en lui affectant withSpring / withTiming / withRepeat / withSequence."
    >
      <View style={styles.stage}>
        <Reanimated.View style={[styles.animatedBox, { backgroundColor: colors.boxC }, boxStyle]} />
      </View>
      <View style={styles.buttons}>
        <Button title="withSpring" onPress={move} />
        <Button title="withTiming" onPress={spin} />
        <Button title="withRepeat" onPress={heartbeat} />
      </View>
    </Section>
  );
}


export function EnteringExitingDemo() {
  const [items, setItems] = useState([1, 2, 3]);
  const next = useRef(4);

  const add = () => setItems((value) => [...value, next.current++]);
  const remove = (id: number) => setItems((value) => value.filter((item) => item !== id));

  return (
    <Section
      title="Reanimated : transitions d'apparition / disparition"
      description="entering et exiting animent l'ajout et le retrait d'un composant. layout anime le déplacement des voisins."
    >
      <View style={styles.rowWrap}>
        {items.map((id) => (
          <Reanimated.View
            key={id}
            entering={FadeInDown.springify().damping(14)}
            exiting={FadeOutLeft.duration(250)}
            layout={LinearTransition.springify()}
          >
            <Pressable onPress={() => remove(id)} style={styles.tag}>
              <Text style={styles.tagText}>Tag {id}  ✕</Text>
            </Pressable>
          </Reanimated.View>
        ))}
      </View>
      <View style={styles.buttons}>
        <Button title="Ajouter" onPress={add} />
        <Button title="Tout retirer" color={colors.danger} onPress={() => setItems([])} />
      </View>
      <Text style={styles.hint}>Touchez un tag pour le retirer.</Text>
    </Section>
  );
}


export function DragDemo() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  // Les callbacks du geste sont des worklets : ils lisent/écrivent les shared values
  // directement sur le thread UI, sans passer par le JS.
  const pan = Gesture.Pan()
    .onBegin(() => {
      isDragging.value = true;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      // Retour élastique à la position d'origine.
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    })
    .onFinalize(() => {
      isDragging.value = false;
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: withTiming(isDragging.value ? 1.15 : 1, { duration: 120 }) },
    ],
    opacity: withTiming(isDragging.value ? 0.8 : 1, { duration: 120 }),
  }));

  return (
    <Section
      title="Geste + animation : glisser-déposer"
      description="Gesture.Pan pilote des shared values ; au relâchement, withSpring ramène la boîte. Tout se passe sur le thread UI."
    >
      <View style={[styles.stage, { height: 180 }]}>
        <GestureDetector gesture={pan}>
          <Reanimated.View style={[styles.animatedBox, { backgroundColor: colors.accent }, style]}>
            <Text style={styles.dragText}>Glissez-moi</Text>
          </Reanimated.View>
        </GestureDetector>
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

