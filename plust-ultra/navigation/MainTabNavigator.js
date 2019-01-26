import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const LinksStack = createStackNavigator({
  Links: LinksScreen,
  Settings: SettingsScreen,
}, {
  initialRouteName: 'Settings',
});

export default LinksStack;
