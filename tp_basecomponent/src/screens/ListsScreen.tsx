import { View, Text, StyleSheet, ScrollView, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent, FlatList, RefreshControl, SectionList } from "react-native";
import React, { useState,useCallback,useRef, useMemo } from "react";
import { colors, radius, spacing } from "../theme";
import { Chip } from "../components/Chip";

type Tab = "scrollview" | "flatlist" | "sectionlist";

const ListsScreen = () => {
  const [tab, setTab] = useState<Tab>("scrollview");
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Chip label="ScrollView" selected={tab==='scrollview'} onPress={() => setTab('scrollview')}/>
        <Chip label="Flat List" selected={tab==='flatlist'} onPress={() => setTab('flatlist')}/>
        <Chip label="Section List" selected={tab==='sectionlist'} onPress={() => setTab('sectionlist')}/>
      </View>

      {tab === "scrollview" && <ScrollViewDemo/>}
      {tab === "flatlist" && <FlatListDemo/>}
      {tab === "sectionlist" && <SectionListDemo/>}
    </View>
  );
};


/* -------------------------------------------------------------------------- */
/*  ScrollView                                                                 */
/* -------------------------------------------------------------------------- */

const PALETTE = [colors.boxA, colors.boxB, colors.boxC, colors.boxD, colors.primary, colors.accent];

function ScrollViewDemo() {
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const pageWidth = width - spacing.md * 2;

  const onHorizontalScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPage(Math.round(event.nativeEvent.contentOffset.x / pageWidth));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      onScroll={(event) => setOffsetY(event.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
    >
      <Text style={styles.hint}>Défilement vertical : offset Y = {Math.round(offsetY)} px</Text>

      <Text style={styles.subtitle}>Horizontal + pagingEnabled (page {page + 1}/{PALETTE.length})</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onHorizontalScroll}
        scrollEventThrottle={16}
        style={styles.carousel}
      >
        {PALETTE.map((color, index) => (
          <View key={color} style={[styles.page, { width: pageWidth, backgroundColor: color }]}>
            <Text style={styles.pageText}>Page {index + 1}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.subtitle}>Horizontal libre (chips)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.from({ length: 15 }, (_, index) => (
          <View key={index} style={styles.chip}>
            <Text>Tag {index + 1}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.subtitle}>Contenu long (tout est rendu d'un coup)</Text>
      {Array.from({ length: 30 }, (_, index) => (
        <View key={index} style={styles.line}>
          <Text>Ligne {index + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

/* -------------------------------------------------------------------------- */
/*  FlatList                                                                   */
/* -------------------------------------------------------------------------- */

type Item = { id: string; title: string; color: string };

function makeItems(start: number, count: number): Item[] {
  return Array.from({ length: count }, (_, index) => {
    const n = start + index;
    return { id: String(n), title: `Élément n° ${n}`, color: PALETTE[n % PALETTE.length] };
  });
}

function FlatListDemo() {
  const [items, setItems] = useState(() => makeItems(1, 20));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleRange, setVisibleRange] = useState('');

  // Tirer vers le bas : on remplace les données.
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setItems(makeItems(1, 20));
      setRefreshing(false);
    }, 1000);
  }, []);

  // Arriver en bas : on ajoute une page (pagination infinie).
  const onEndReached = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setItems((previous) => [...previous, ...makeItems(previous.length + 1, 20)]);
      setLoadingMore(false);
    }, 800);
  }, [loadingMore]);

  // onViewableItemsChanged doit garder la même référence pendant toute la vie de la liste.
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken<Item>[] }) => {
      if (viewableItems.length === 0) return;
      const first = viewableItems[0].index ?? 0;
      const last = viewableItems[viewableItems.length - 1].index ?? 0;
      setVisibleRange(`${first + 1} → ${last + 1}`);
    },
  ).current;

  // renderItem est appelé uniquement pour les lignes proches de la zone visible (virtualisation).
  const renderItem = useCallback(({ item, index }: { item: Item; index: number }) => {
    return (
      <View style={styles.itemRow}>
        <View style={[styles.avatar, { backgroundColor: item.color }]}>
          <Text style={styles.avatarText}>{index + 1}</Text>
        </View>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    );
  }, []);

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <Text style={styles.hint}>
          {items.length} éléments dans data, lignes visibles : {visibleRange || '…'}. Tirez vers le bas pour
          rafraîchir, allez en bas pour charger la suite.
        </Text>
      }
      ListFooterComponent={loadingMore ? <Text style={styles.footer}>Chargement…</Text> : null}
      ListEmptyComponent={<Text style={styles.footer}>Aucun élément</Text>}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      contentContainerStyle={styles.scrollContent}
      windowSize={20}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  SectionList                                                                */
/* -------------------------------------------------------------------------- */

const CONTACTS = [
  'Alice', 'Antoine', 'Amina', 'Bruno', 'Béatrice', 'Camille', 'Chloé', 'Clément', 'David', 'Dounia',
  'Émile', 'Emma', 'Fatou', 'Félix', 'Gabriel', 'Hugo', 'Inès', 'Jade', 'Jules', 'Karim', 'Léa', 'Lucas',
  'Manon', 'Mohamed', 'Nathan', 'Noa', 'Olivia', 'Paul', 'Rania', 'Sofia', 'Théo', 'Yasmine', 'Zoé',
];

function SectionListDemo() {
  const sections = useMemo(() => {
    const groups = new Map<string, string[]>();
    for (const name of [...CONTACTS].sort((a, b) => a.localeCompare(b, 'fr'))) {
      const letter = name[0].normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
      groups.set(letter, [...(groups.get(letter) ?? []), name]);
    }
    return [...groups.entries()].map(([title, data]) => ({ title, data }));
  }, []);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item}
      stickySectionHeadersEnabled
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.itemRow}>
          <Text style={styles.itemTitle}>{item}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={<Text style={styles.hint}>En-têtes collants (stickySectionHeadersEnabled).</Text>}
      contentContainerStyle={styles.scrollContent}
    />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  hint: {
    color: colors.muted,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  subtitle: {
    fontWeight: "700",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    color: colors.text,
  },
  carousel: {
    borderRadius: radius.md,
    overflow: "hidden",
  },
  page: {
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  pageText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  chip: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
  },
  line: {
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  itemTitle: {
    fontSize: 16,
    color: colors.text,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  footer: {
    textAlign: "center",
    padding: spacing.md,
    color: colors.muted,
  },
  sectionHeader: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  sectionHeaderText: {
    fontWeight: "700",
    color: colors.primary,
  },
});

export default ListsScreen;
