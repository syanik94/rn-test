import React, { ReactElement } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { Home, GameSingle, Settings } from '../screens';
import { colors } from '../utilis/index';

export type StackNavigatorParams = {
  Home: undefined;
  GameSingle: undefined;
  GameMulti: { gameId: string };
  Settings: undefined;
}

const navigatorOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.purple,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  headerTintColor: colors.lightGreen,
  headerTitleStyle: {
    fontFamily: "DeliusUnicase_700Bold",
    fontSize: 20
  },
  headerBackTitleVisible: false,
}
const Stack = createStackNavigator<StackNavigatorParams>(); 

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={navigatorOptions} >
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="GameSingle" component={GameSingle} options={{headerShown:false}} />
        <Stack.Screen name="Settings" component={Settings} options={{headerShown:true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}