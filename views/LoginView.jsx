import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import TextSubmit from '../components/molecules/TextSubmit';
import { login } from '../services/auth.service';
import { loginRequest } from '../services/api.service';
import Const from '../const';
import LoginInput from '../components/atoms/LoginInput'
import LoginButton from '../components/atoms/LoginButton'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const colors = require('../colors.json');

export default function LoginView({ updateAuthStatus }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setError("Please fill all fields");
      return;
    }

    try {
      const token = await loginRequest(email, password);
      if (token) {
        await login(token);
        await updateAuthStatus(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.blackSquare}></View>
      <View style={styles.whiteSquare}></View>
      <Image source={require('../assets/logo_light.png')} style={styles.logo} resizeMode="contain"/>
      <Text style={styles.login}>Login</Text>
      <Text style={styles.signup_message}>Please sign up to continue</Text>
      <LoginInput
        label="email"
        placeholder="yourname@example.com"
        secureTextEntry={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <LoginInput
        label="password"
        placeholder="password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <LoginButton style={styles.loginbutton} value="Log in" onPress={handleLogin}/>
    </View>
  )
};

const styles = StyleSheet.create({
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    root: {
      alignItems: 'center',
      padding: 50,
      margin: 10,
      marginTop: 150,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: 'white',
    },
    blackSquare: {
      position: 'absolute',
      marginTop: -500,
      width: '500%',
      height: '700%',
      backgroundColor: colors.darkBackground,
    },
    whiteSquare: {
      position: 'absolute',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      marginTop: 200,
      width: '139%',
      height: '500%',
      backgroundColor: 'white',
    },
    loginbutton: {
        borderRadius: 30,
        height: 45,
        top: 350,
        width: '70%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
        fontFamily: Const.FONT_FAMILY_BOLD,
    },
    logo: {
      height: 80,
      resizeMode: "contain",
      position: "absolute",
      marginTop: 5,
    },
    login: {
      height: 45,
      position: 'absolute',
      fontWeight: 'bold',
      fontSize: 40,
      marginTop: 265,
      left: 50,
      color:colors.darkText,
      fontFamily: Const.FONT_FAMILY_BOLD,
    },
    signup_message: {
      color: 'gray',
      position: 'absolute',
      fontSize: 17,
      marginTop: 320,
      left: 50,
      fontFamily: Const.FONT_FAMILY_BOLD,
    }
})
