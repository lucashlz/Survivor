import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import NavIcons from '../atoms/NavIcons';
import { BlurView } from 'expo-blur';
import Const from '../../const';

const colors = require('../../colors.json');

export default function Header() {
  const navigation = useNavigation();
  const navState = useNavigationState(state => state);
  const ScreenIsFocused = navState ? navState.index === 3 : false;

  return (
    <BlurView
      intensity={60}
      tint='default'
      style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.berlier}
      />
      </TouchableOpacity>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Const.HEADER_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: 0,
    paddingTop: 40,
    borderRadius: Const.BORDER_RADIUS,
    backgroundColor: colors.background + '58',
  },
  berlier: {
    width: 160,
    height: 77,
    resizeMode: 'contain',
    marginLeft: 17,
  },
  button: {
    marginRight: 20,
    padding: 5,
  },
  buttonFocused: {
    marginRight: 20,
    backgroundColor: colors.shadow,
    borderRadius: Const.BORDER_RADIUS_SMALL,
    padding: 5,
  },
});
