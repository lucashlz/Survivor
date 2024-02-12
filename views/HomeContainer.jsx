import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from './HomeView';
import WidgetGPT from '../components/organism/WidgetGPT';
import WidgetWeather from '../components/organism/WidgetWeather';

const Stack = createStackNavigator();

export default function HomeContainer() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" >
          {props => <HomeView {...props} />}
        </Stack.Screen>
        <Stack.Screen name="WidgetGPT" >
          {props => <WidgetGPT {...props} />}
        </Stack.Screen>
        <Stack.Screen name="WidgetWeather" >
          {props => <WidgetWeather {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
