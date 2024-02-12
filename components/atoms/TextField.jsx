import React from "react";
import { StyleSheet, TextInput } from "react-native";
import Const from "../../const";

const colors = require("../../colors.json");

const TextField = ({ label, value, onChange, secureTextEntry }) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={label}
      style={styles.textInput}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: Const.BORDER_RADIUS,
    height: 55,
    width: 270,
    margin: 5,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: colors.shadow,
    fontFamily: Const.FONT_FAMILY,
  },
});

export default TextField;
