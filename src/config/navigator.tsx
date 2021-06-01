import React, { ReactElement } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, GameSingle } from '../screens';

export type StackNavigatorParams = {
  Home: undefined;
  GameSingle: undefined;
  GameMulti: { gameId: string };
}

const Stack = createStackNavigator<StackNavigatorParams>(); 
export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="GameSingle" component={GameSingle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}