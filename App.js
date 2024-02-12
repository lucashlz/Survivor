import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text, LogBox } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootSiblingParent } from "react-native-root-siblings";
import { StatusBar } from "expo-status-bar";
import { isAuthenticated } from "./services/auth.service";
import { LogOutContext } from "./contexts/logout.context";
import { logout } from "./services/auth.service";
import MainView from "./views/MainView";
import LoginView from "./views/LoginView";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Const from "./const";
import { DarkModeProvider } from "./contexts/DarkModeContext";

LogBox.ignoreAllLogs(); 

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [fontsLoaded] = useFonts(Const.FONT_FAMILIES);

  const updateAuthStatus = async () => {
    const authenticated = await isAuthenticated();
    setLoggedIn(authenticated);
  };

  useEffect(() => {
    updateAuthStatus();
  }, []);

  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
    updateAuthStatus();
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <DarkModeProvider>
      <RootSiblingParent>
        <StatusBar style="dark" />
        <LogOutContext.Provider value={handleLogout}>
          <View style={styles.container} onLayout={onLayoutRootView}>
            <NavigationContainer independent={true}>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {loggedIn ? (
                  <Stack.Screen name="Main">
                    {(props) => <MainView {...props} />}
                  </Stack.Screen>
                ) : (
                  <Stack.Screen name="Login">
                    {(props) => (
                      <LoginView
                        {...props}
                        updateAuthStatus={updateAuthStatus}
                      />
                    )}
                  </Stack.Screen>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </LogOutContext.Provider>
      </RootSiblingParent>
    </DarkModeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
  },
});
