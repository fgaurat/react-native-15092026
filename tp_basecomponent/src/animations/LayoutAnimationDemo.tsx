import { useEffect, useRef, useState } from 'react';
import { StyleSheet,LayoutAnimation, Pressable,View,Text } from 'react-native';
import { Section } from '../components/Section';
import { colors, radius, spacing } from '../theme';


export default function LayoutAnimationDemo() {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    // À appeler AVANT le setState qui modifie le layout.
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((value) => !value);
  };

  return (
    <Section
      title="LayoutAnimation"
      description="Anime automatiquement la transition vers le prochain layout (taille, position). Idéal pour un accordéon."
    >
      <Pressable onPress={toggle} style={styles.accordionHeader}>
        <Text style={styles.accordionTitle}>{expanded ? '▾' : '▸'} Détails de la commande</Text>
      </Pressable>
      {expanded ? (
        <View style={styles.accordionBody}>
          <Text style={styles.text}>2 × Croissant — 2,40 €</Text>
          <Text style={styles.text}>1 × Café allongé — 2,10 €</Text>
          <Text style={[styles.text, { fontWeight: '700' }]}>Total : 6,90 €</Text>
        </View>
      ) : null}
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

