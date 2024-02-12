import * as React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const colors = require('../../colors.json');

const LoginInput = ({ placeholder, secureTextEntry, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        placeholderTextColor={colors.placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    margin: 15,
    top: 310,
    width: '100%',
    borderRadius: 15,
    backgroundColor: 'white',
  },
  input: {
    height: 55,
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize: 17,
  },
});

export default LoginInput;