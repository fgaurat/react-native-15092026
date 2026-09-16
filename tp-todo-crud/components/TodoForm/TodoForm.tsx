import { View, Text, TextInput, Button, Platform, Alert } from "react-native";
import React, { useState } from "react";

function showAlert(message: string) {
  if (Platform.OS === "web") {
    window.alert(message);
  } else {
    Alert.alert(message);
  }
}

const TodoForm = (onCreate) => {
  const [title, setTitle] = useState("");

  const valider = ()=>{
    const cleanValue = title.trim()
    if (cleanValue.length === 0 ) {
      return;
    }
    onCreate({title:cleanValue,completed:false});
    setTitle('');    

  }
  return (
    <View>
      <TextInput
        placeholder="Nouvelle tâche"
        value={title}
        onChangeText={setTitle}
        returnKeyType="done"
        onSubmitEditing={valider}
        submitBehavior="submit"
      />
      <Button
        title="Press me"
        onPress={valider}
      />
    </View>
  );
};

export default TodoForm;
