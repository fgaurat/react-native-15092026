import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native";
import { loadJson, saveJson } from "../services/storage";

const Storage = () => {
  const [value, setValue] = useState<string | null>("Pas de valeur");

  const save = () => {
    saveJson("theValue", "Une valeur");
  };

  const load = async () => {
    const v = await loadJson<string>("theValue");
    setValue(v);
  };

  return (
    <View>
      <Text>{value}</Text>
      <Button title="setValue" onPress={() => save()} />
      <Button title="getValue" onPress={() => load()} />
    </View>
  );
};

export default Storage;
