import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../components/organism/Header';
import TabBar from '../components/organism/TabBar';
import HomeContainer from "../views/HomeContainer";
import SettingView from "../views/SettingView";
import TrombiView from "../views/TrombiView";
import SearchView from "../views/SearchView";
import { WidgetProvider } from '../contexts/widget.context';

const Tab = createBottomTabNavigator();

function MainView() {
  return (
    <WidgetProvider>
      <NavigationContainer independent={true} >
        <Tab.Navigator
          initialRouteName='Home'
          tabBar={props => <TabBar {...props} />}
          screenOptions={{
            headerShown: false
          }}
        >
          <Tab.Screen name="Team" component={TrombiView} />
          <Tab.Screen name="Home" component={HomeContainer} />
          <Tab.Screen name="Setting" component={SettingView} />
        </Tab.Navigator>
        <Header />
      </NavigationContainer>
    </WidgetProvider>
  );
}

export default MainView;
