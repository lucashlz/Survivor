import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getGPTResponse } from "../../services/apiGPT.service";
import { Keyboard } from "react-native";
import Const from "../../const";

const colors = require("../../colors.json");

export default function TextSubmit(props) {
  const {
    onChangeText,
    submitVisible = true,
    onPress,
    value,
    placeholder,
    containerStyle,
    textInputStyle,
    icon,
    isMultiline,
    secureTextEntry,
  } = props;

  const iconName = icon || "send";

  return (
    <View style={[styles.form, containerStyle]}>
      <TextInput
        style={submitVisible ?
          [styles.text, textInputStyle] :
          [styles.text, textInputStyle, { width: 330 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        label={placeholder}
        multiline={isMultiline}
        secureTextEntry={secureTextEntry}
      />
      {submitVisible && (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <MaterialCommunityIcons name={iconName} size={30} color={colors.lightText} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: 350,
    minHeight: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.lightBackground,
    borderRadius: Const.BORDER_RADIUS,
    padding: 5,
  },
  text: {
    width: 270,
    fontSize: 20,
    color: colors.darkText,
    textAlign: "center",
    textAlignVertical: "center",
    paddingTop: 13,
    paddingBottom: 13,
    backgroundColor: colors.whiteTransparency,
    borderRadius: Const.BORDER_RADIUS - 5,
    fontFamily: Const.FONT_FAMILY,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: Const.BORDER_RADIUS_SMALL,
    padding: 10,
  },
});