import React from "react";
import { Text, View, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getDeepLResponse } from "../../services/apiDeepL.service";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Const from "../../const";
import TextSubmit from "../molecules/TextSubmit";
import { SelectList } from 'react-native-dropdown-select-list';
import LoadingSpinner from "../atoms/LoadingSpinner";

const colors = require("../../colors.json");

const LANGUAGUES = [
  { key: 'BG', value: 'Bulgarian' },
  { key: 'CS', value: 'Czech' },
  { key: 'DA', value: 'Danish' },
  { key: 'DE', value: 'German' },
  { key: 'EL', value: 'Greek' },
  { key: 'EN', value: 'English' },
  { key: 'ES', value: 'Spanish' },
  { key: 'ET', value: 'Estonian' },
  { key: 'FI', value: 'Finnish' },
  { key: 'FR', value: 'French' },
  { key: 'HU', value: 'Hungarian' },
  { key: 'ID', value: 'Indonesian' },
  { key: 'IT', value: 'Italian' },
  { key: 'JA', value: 'Japanese' },
  { key: 'KO', value: 'Korean' },
  { key: 'LT', value: 'Lithuanian' },
  { key: 'LV', value: 'Latvian' },
  { key: 'NB', value: 'Norwegian' },
  { key: 'NL', value: 'Dutch' },
  { key: 'PL', value: 'Polish' },
  { key: 'PT', value: 'Portuguese' },
  { key: 'RO', value: 'Romanian' },
  { key: 'RU', value: 'Russian' },
  { key: 'SK', value: 'Slovak' },
  { key: 'SL', value: 'Slovenian' },
  { key: 'SV', value: 'Swedish' },
  { key: 'TR', value: 'Turkish' },
  { key: 'UK', value: 'Ukrainian' },
  { key: 'ZH', value: 'Chinese' }
];


export default function WidgetDeepL() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(null);
  const [text, setText] = React.useState("");
  const [translatedText, setTranslatedText] = React.useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await getDeepLResponse(text, selectedLanguage);
    setTranslatedText(response.text);
    setIsLoading(false);
    console.log(response);
  };

  return (
    <View style={translatedText ?
      [styles.container, { height: 240 }] :
      [styles.container, { height: 135 }]
    }>
      <TextSubmit
        placeholder="Enter text to translate"
        onChangeText={setText}
        submitVisible={false}
        isMultiline={true}
        textInputStyle={{ height: 50 }}
      />
      <View style={styles.underBox}>
        <SelectList
          setSelected={setSelectedLanguage}
          data={LANGUAGUES}
          placeholder="Select"
          search
          boxStyles={styles.boxStyles}
          inputStyles={styles.inputStyles}
          dropdownStyles={styles.dropdownStyles}
          dropdownItemStyles={styles.dropdownItemStyles}
          arrowicon={<MaterialCommunityIcons name="chevron-down" size={30} color={colors.darkText} />}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            Translate
          </Text>
        </TouchableOpacity>
      </View>
      { translatedText &&
      <ScrollView style={styles.translatedTextBoxContainer} contentContainerStyle={styles.translatedTextBoxContent}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Text style={styles.translatedText}>
            {translatedText}
          </Text>
        )}
      </ScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    alignItems: "center",
    backgroundColor: colors.lightBackground,
    borderRadius: Const.BORDER_RADIUS,
    width: 355,
    height: 135,
    margin: 7,
    paddingBottom: 5,
    zIndex: 1,
  },
  underBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  boxStyles: {
    width: 160,
    height: 50,
    borderRadius: Const.BORDER_RADIUS_SMALL,
    margin: 5,
    backgroundColor: colors.whiteTransparency,
    borderWidth: 0,
    paddingRight: 10,
  },
  inputStyles: {
    fontSize: 14,
    fontFamily: Const.FONT_FAMILY_BOLD,
    color: colors.darkText,
    paddingTop: 7,
  },
  dropdownStyles: {
    position: "absolute",
    top: 65,
    left: -5,
    width: 170,
    height: 180,
    borderRadius: Const.BORDER_RADIUS_SMALL,
    backgroundColor: colors.shadow,
    borderWidth: 0,
  },
  dropdownItemStyles: {
    fontSize: 14,
    fontFamily: Const.FONT_FAMILY_BOLD,
    color: colors.darkText,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    borderBottomWidth: 1,
  },
  button: {
    width: 160,
    height: 50,
    margin: 5,
    borderRadius: Const.BORDER_RADIUS_SMALL,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Const.FONT_FAMILY_BOLD,
    color: colors.lightText,
  },
  translatedTextBoxContainer: {
    width: 330,
    height: 90,
    margin: 5,
    borderRadius: Const.BORDER_RADIUS_SMALL,
    backgroundColor: colors.shadow,
    padding: 5,
    zIndex: -1,
  },
  translatedTextBoxContent: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    minHeight: 90,
  },
  translatedText: {
    fontSize: 18,
    fontFamily: Const.FONT_FAMILY,
    color: colors.darkText,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
