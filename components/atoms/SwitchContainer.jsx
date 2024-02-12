import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Const from '../../const';

const colors = require('../../colors.json');

export default function SwitchContainer(props) {
  const { name, value, onValueChange } = props;
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>{name}</Text>
      <Switch
        trackColor={{ false: colors.invalid, true: colors.valid }}
        thumbColor={value ? colors.lightText : colors.lightText}
        onValueChange={onValueChange}
        value={value}
        style={styles.switch}
        ios_backgroundColor={"lightgray"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 0,
    borderColor: colors.primary,
  },
  switchText: {
    fontSize: 20,
    fontFamily: Const.FONT_FAMILY,
    color: colors.lightText,
  },
  switch: {
  },
});
