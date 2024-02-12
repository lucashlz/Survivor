import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TextSubmit from "../molecules/TextSubmit";
import Const from "../../const";

const colors = require("../../colors.json");

export default function ButtonWidgetGPT({ onPress }) {
  const navigation = useNavigation();
  const [prompt, setPrompt] = React.useState("");

  const handleSubmit = async () => {
    navigation.navigate("WidgetGPT", {
      external: true,
      extPrompt: prompt,
    });
  };

  return (
    <TextSubmit
      value={prompt}
      onChangeText={setPrompt}
      onPress={handleSubmit}
      placeholder="Ask me anything"
      containerStyle={styles.container}
      submitVisible
      isMultiline={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    margin: 7,
  },
});
