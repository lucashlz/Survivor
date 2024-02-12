import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { Keyboard } from "react-native";
import { getGPTResponse } from "../../services/apiGPT.service";
import TextSubmit from "../molecules/TextSubmit";
import LoadingSpinner from "../atoms/LoadingSpinner";
import Const from "../../const";

const colors = require("../../colors.json");

export default function WidgetGPT(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  let { external, extPrompt } = props.route.params;
  const [isExternal, setIsExternal] = useState(external);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(response);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const handleSubmit = async (currentPrompt) => {
    console.log("handleSubmit", currentPrompt);
    Keyboard.dismiss();
    setPrompt("");
    setIsLoading(true);
    const response = await getGPTResponse(currentPrompt);
    setResponse(response);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isExternal) {
      handleSubmit(extPrompt);
      setIsExternal(false);
    }
  }, [isExternal]);

  return (
    <View style={styles.container}>
      <TextSubmit
        onChangeText={setPrompt}
        onPress={() => handleSubmit(prompt)}
        value={prompt}
        placeholder="Ask me anything"
        style={styles.form}
        isMultiline
        submitVisible
      />
      <View style={styles.response}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {isLoading ? (
            <LoadingSpinner color={colors.secondary} />
          ) : (
            <Text style={styles.responseText}>{response}</Text>
          )}
        </ScrollView>
        <TouchableOpacity onPress={copyToClipboard} style={styles.button}>
          <MaterialCommunityIcons name="content-copy" size={30} color="black" />
          <Toast
            visible={toastVisible}
            position={-130}
            backgroundColor={colors.secondary}
            shadow={false}
            animation={true}
            style={{ justifyContent: "space-evenly" }}
          >
            <MaterialCommunityIcons name="check" size={20} color={colors.valid} style={{ margin: 5 }} />
            <Text style={{ textAlign: "center" }}>
              Text copied !
            </Text>
          </Toast>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'space-evenly',
    paddingTop: Const.SAFE_AREA_TOP,
    paddingBottom: Const.SAFE_AREA_BOTTOM,
    backgroundColor: colors.background,
  },
  form: {
    maxHeight: 130,
  },
  response: {
    width: 350,
    height: 520,
    borderRadius: Const.BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef"
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  responseText: {
    fontSize: 20,
    color: colors.darkText,
    fontFamily: Const.FONT_FAMILY,
    textAlign: "left",
    padding: 10,
  },
  button: {
    position: "relative",
    left: 140,
    bottom: 10,
    backgroundColor: colors.whiteTransparency,
    borderRadius: Const.BORDER_RADIUS_SMALL,
    padding: 10,
    marginTop: 10,
  },
});
