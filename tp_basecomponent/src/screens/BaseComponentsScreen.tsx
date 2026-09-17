import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  Image,
  Pressable,
  ImageBackground,
  TextInput,
  Switch,
  ActivityIndicator,
  Button,
  useWindowDimensions,
  useColorScheme,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Section } from "../components/Section";
import { colors, radius, spacing } from "../theme";

const BaseComponentsScreen = () => {
  const [name, setName] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { height, width, scale, fontScale } = useWindowDimensions();
  const colorScheme = useColorScheme();

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <Section
        title="View"
        description="Le conteneur de base. Pas de scroll, pas de texte direct : la View sert à structurer et à styler (fond, bordure, ombre, marges). (div)"
      >
        <View style={styles.row}>
          <View style={[styles.box, { backgroundColor: colors.boxA }]} />
          <View
            style={[
              styles.box,
              styles.boxRounded,
              { backgroundColor: colors.boxB },
            ]}
          />
          <View
            style={[
              styles.box,
              styles.boxShadow,
              { backgroundColor: colors.boxC },
            ]}
          />
          <View style={[styles.box, styles.boxBordered]} />
        </View>
      </Section>

      <Section title="Texte" description="Du texte">
        <Text style={styles.paragraph}>
          <Text>
            Texte normal <Text style={styles.italic}>Texte italic</Text>
          </Text>{" "}
          la suite <Text style={styles.bold}>Texte bold</Text>{" "}
          <Text onPress={() => Alert.alert("Click")} style={styles.link}>
            Click
          </Text>
        </Text>

        <Text style={styles.paragraph} numberOfLines={2} ellipsizeMode="tail">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          obcaecati officiis molestias. Accusamus harum placeat ducimus sit,
          enim unde distinctio autem? Dignissimos impedit officiis ipsam eaque
          facere, necessitatibus ducimus fuga.
        </Text>

        <Text style={[styles.paragraph, styles.mono]} selectable>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora quod
          animi eaque eum id sit, suscipit, asperiores et sed praesentium
          accusamus perspiciatis, aut expedita architecto consequuntur rerum
          quam quas dolor.
        </Text>
      </Section>

      <Section title="Image" description="Les images">
        <View style={styles.row}>
          <View style={styles.imageCell}>
            <Image
              source={require("../../assets/icon.png")}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.caption}>require</Text>
          </View>

          <View style={styles.imageCell}>
            <Image
              source={{ uri: "https://robohash.org/florian%20duneau" }}
              style={styles.image}
              resizeMode={"contain"}
            />
            <Text style={styles.caption}>cover reactnative</Text>
          </View>

          <View style={styles.imageCell}>
            <Image
              source={{ uri: "https://robohash.org/Rodolphe" }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.caption}>contain Rodolphe</Text>
          </View>
        </View>
        <ImageBackground
          source={{
            uri: "https://loremimage.com/image/600x400/600x400/6366f1/ffffff.png",
          }}
          style={styles.background}
          imageStyle={{ borderRadius: radius.md }}
        >
          <Text style={styles.backgroundText}>Le texte</Text>
        </ImageBackground>
      </Section>

      <Section title="TextInput" description="TextInput">
        <TextInput
          style={styles.input}
          placeholder="Votre prénom"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          returnKeyType="join"
        />

        <Text style={styles.paragraph}>
          {name.length > 0 ? `Bonjour ${name}` : "State vide"}
        </Text>
      </Section>

      <Section
        title="Button, Switch, ActivityIndicator"
        description="Button, Switch, ActivityIndicator"
      >
        <View style={styles.rowBetween}>
          <Text style={styles.paragraph}>{enabled ? "Oui" : "Non"}</Text>

          <Switch
            value={enabled}
            onValueChange={setEnabled}
            trackColor={{ true: colors.primary }}
          />
        </View>

        <View style={styles.rowBetween}>
          <Button title="Load" onPress={simulateLoading} />
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <Text>Loaded</Text>
          )}
        </View>
      </Section>

      <Section
        title="Platform, useWindowDimensions, useColorScheme"
        description="Platform, useWindowDimensions, useColorScheme"
      >
        <Text style={styles.mono}>Platform.OS: {Platform.OS}</Text>
        <Text style={styles.mono}>Platform.Version: {Platform.Version}</Text>
        <Text style={styles.mono}>
          window = {height}, {width}, {scale}, {fontScale}
        </Text>
        <Text style={styles.mono}>colorScheme: {colorScheme}</Text>
        {Platform.select({
          ios: <Text>IOS</Text>,
          android: <Text>Android</Text>,
          default: <Text>Web</Text>,
        })}
      </Section>
      <Section title="Modal" description="Modal">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </Section>
    </>
  );
};

const BOX = 56;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  box: {
    width: BOX,
    height: BOX,
  },
  boxRounded: {
    borderRadius: BOX / 2,
  },
  boxShadow: {
    borderRadius: radius.sm,
    // boxShadow (CSS) est supporté depuis RN 0.76 sur iOS et Android.
    boxShadow: "0 4px 10px rgba(15, 23, 42, 0.35)",
  },
  boxBordered: {
    borderWidth: 3,
    borderColor: colors.primary,
    borderStyle: "dashed",
    borderRadius: radius.sm,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  bold: { fontWeight: "700" },
  italic: { fontStyle: "italic" },
  link: { color: colors.primary, textDecorationLine: "underline" },
  mono: {
    fontFamily: Platform.select({ ios: "Menlo", default: "monospace" }),
    fontSize: 13,
    color: colors.muted,
    marginBottom: spacing.xs,
  },
  imageCell: {
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 60,
    borderRadius: radius.sm,
    backgroundColor: colors.border,
  },
  caption: {
    fontSize: 12,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  background: {
    marginTop: spacing.md,
    height: 100,
    justifyContent: "flex-end",
    padding: spacing.sm,
  },
  backgroundText: {
    color: "#fff",
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

});

export default BaseComponentsScreen;
