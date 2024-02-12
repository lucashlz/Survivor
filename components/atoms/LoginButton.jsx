import * as React from "react";
import { Button } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";

const colors = require('../../colors.json');

const LoginButton = ({ style, value , onPress }) => {
  return (
    <Button
      style={style}
      contentStyle={{ flexDirection: "row-reverse", alignItems: 'center', height: '100%'}}
      icon="login"
      value={value}
      textColor="white"
      buttonColor={colors.darkBackground}
      onPress={onPress}
      labelStyle={{ fontSize: 20 }}
    >
      {value}
    </Button>
  );
};

export default LoginButton;