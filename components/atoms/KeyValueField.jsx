import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Const from '../../const';

const colors = require('../../colors.json');

function KeyValueField ({ label, value, color, valueStyle }) {
  return (
    <View >
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: color }, valueStyle]}>{value}</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 12,
    color: colors.primary,
    marginRight: 10,
    fontFamily: Const.FONT_FAMILY_BOLD,
    paddingLeft: 10,
    position: 'absolute',
  },
  value: {
    flex: 1,
    fontSize: 20,
    fontFamily: Const.FONT_FAMILY,
    textAlign: 'center',
  },
});

export default KeyValueField;
