import React from 'react';
import { LogBox } from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LayoutsNavigator } from './layouts.navigator';
import { ComponentsNavigator } from './components.navigator';
import { ThemesNavigator } from './themes.navigator';
import { HomeBottomNavigation } from '../scenes/home/home-bottom-navigation.component';
import { HomeDrawer } from '../scenes/home/home-drawer.component';
import { EcommerceNavigator } from './ecommerce.navigator';
import { ProfileSettings1Screen } from '../scenes/social/profile-settings-1.component';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Components' : 'Layouts';

const ROOT_ROUTES: string[] = ['Home', 'Layouts', 'Components', 'Themes'];

const TabBarVisibilityOptions = ({ route }): BottomTabNavigationOptions => {
  const isNestedRoute: boolean = route.state?.index > 0;
  const isRootRoute: boolean = ROOT_ROUTES.includes(route.name);

  return { tabBarVisible: isRootRoute && !isNestedRoute };
};


const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibilityOptions}
    initialRouteName={initialTabRoute}
    tabBar={props => <HomeBottomNavigation {...props} />} >
    <BottomTab.Screen name='Layouts' component={LayoutsNavigator} />
    <BottomTab.Screen name='Components' component={ComponentsNavigator} />
    <BottomTab.Screen name='Themes' component={ThemesNavigator} />
  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: true }}
    drawerContent={props => <HomeDrawer {...props} />}>
    {/* <Drawer.Screen name='Home' component={HomeTabsNavigator} /> */}
    <Drawer.Screen name='Home' component={EcommerceNavigator} />
    <Drawer.Screen name='Profile' component={ProfileSettings1Screen} />
  </Drawer.Navigator>
);

LogBox.ignoreLogs(['Accessing the \'state\'']);
