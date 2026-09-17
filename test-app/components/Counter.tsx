import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useCounter, UseCounterOptions } from '../hooks/useCounter';

type Props = UseCounterOptions & {
  label?: string;
  /** Appelé à chaque changement de valeur. */
  onChange?: (value: number) => void;
};

/**
 * Composant d'affichage d'un compteur avec boutons +/-.
 * Il délègue toute la logique au hook useCounter : le test du composant
 * se concentre donc sur le rendu et les interactions.
 */
export function Counter({ label = 'Compteur', onChange, ...options }: Props) {
  const { count, increment, decrement, canIncrement, canDecrement } = useCounter(options);

  const handle = (fn: () => void, next: number) => () => {
    fn();
    onChange?.(next);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Décrémenter"
          disabled={!canDecrement}
          onPress={handle(decrement, count - (options.step ?? 1))}
          style={[styles.button, !canDecrement && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>−</Text>
        </Pressable>

        <Text testID="counter-value" style={styles.value} accessibilityHint='Counter value'>
          {count}
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Incrémenter"
          disabled={!canIncrement}
          onPress={handle(increment, count + (options.step ?? 1))}
          style={[styles.button, !canIncrement && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      {!canIncrement && <Text style={styles.hint}>Maximum atteint</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 8 },
  label: { fontSize: 16, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: { backgroundColor: '#9ca3af' },
  buttonText: { color: '#fff', fontSize: 24 },
  value: { fontSize: 24, minWidth: 40, textAlign: 'center' },
  hint: { color: '#b91c1c' },
});
