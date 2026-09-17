import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

type SectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

/**
 * Carte réutilisable : un titre, une explication courte, puis la démo.
 * Chaque écran du TP est composé d'une suite de <Section>.
 */
export function Section({ title, description, children }: SectionProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    marginTop: spacing.xs,
    color: colors.muted,
    lineHeight: 20,
  },
  body: {
    marginTop: spacing.md,
  },
});
