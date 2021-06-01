import style from './home.styles';
import React, { ReactElement } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GradientBackground, Button } from '../../components/index';
import { StackNavigatorParams } from '../../config/navigator';

type HomeProps = {
	navigation: StackNavigationProp<StackNavigatorParams, "Home">;
}
export default function Home({navigation}: HomeProps): ReactElement {
  return (
		<GradientBackground> 
			<ScrollView contentContainerStyle={style.container}>
				<Image
					style={style.logo}
					source={require('../../../assets/logo.png')} />
				<View style={style.buttonContainer}>
					<Button 
						style={style.button} 
						title="Single Player" 
						onPress={() => { navigation.navigate("GameSingle") }} /> 
					<Button style={style.button} title="Multiplayer" />
					<Button style={style.button} title="Login" />
					<Button title="Settings"/>
				</View>
			</ScrollView>
		</GradientBackground>
	)
}