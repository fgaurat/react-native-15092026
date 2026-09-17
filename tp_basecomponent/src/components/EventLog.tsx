import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

type EventLogProps = {
  entries: string[];
  maxHeight?: number;
};

/**
 * Journal d'événements affiché à l'écran : indispensable pour « voir »
 * les cycles de vie et les événements touch sans ouvrir la console.
 */
export function EventLog({ entries, maxHeight = 160 }: EventLogProps) {
  return (
    <View style={[styles.container, { maxHeight }]}>
      <ScrollView nestedScrollEnabled>
        {entries.length === 0 ? (
          <Text style={styles.empty}>Aucun événement pour l'instant…</Text>
        ) : (
          entries.map((entry, index) => (
            <Text key={`${index}-${entry}`} style={styles.line}>
              {entry}
            </Text>
          ))
        )}
      </ScrollView>
    </View>
  );
}

/** Préfixe une entrée de log avec l'heure courante (HH:MM:SS.mmm). */
export function stamp(message: string): string {
  const now = new Date();
  const time = now.toLocaleTimeString('fr-FR', { hour12: false });
  const ms = String(now.getMilliseconds()).padStart(3, '0');
  return `[${time}.${ms}] ${message}`;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    borderRadius: radius.sm,
    padding: spacing.sm,
  },
  line: {
    color: '#A5F3FC',
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    fontSize: 11,
    lineHeight: 16,
  },
  empty: {
    color: colors.muted,
    fontStyle: 'italic',
    fontSize: 12,
  },
});
