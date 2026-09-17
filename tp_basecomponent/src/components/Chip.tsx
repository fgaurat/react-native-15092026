import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing } from '../theme';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

/** Petit bouton « pilule » utilisé pour les sélecteurs de valeurs. */
export function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
      ]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipPressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 13,
    color: colors.text,
  },
  labelSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
