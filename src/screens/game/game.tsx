import React from 'react';
import style from './game.styles';
import { View, Text } from 'react-native';
import { GradientBackground } from '../../components/index';

export default function Game() {
	return (
		<GradientBackground> 
			<Text>"Hello, Game lol"</Text>
		</GradientBackground>
	)
}