import React, { ReactElement, useState, useEffect } from 'react';
import styles from './game-single.styles';
import { Dimensions, SafeAreaView, View } from 'react-native';
import { GradientBackground, Board, Text, Button } from '../../components/index';
import { BoardAPI, BoardState, PlayerAPI, Cell, useSounds } from '../../utilis';

enum Turn {
	bot="BOT",
	human="HUMAN"
}

const SCREEN_WIDTH = Dimensions.get("screen").width;

export default function GameSingle(): ReactElement {
	// State
	const [score, setScore] = useState({
		wins: 0,
		draws: 0,
		losses: 0,
	})
	const [boardState, setBoardState] = useState<BoardState>([
		null, null, null, 
		null, null, null, 
		null, null, null])
	const [turn, setTurn] = useState<Turn>(
		Math.random() < 0.5 ? Turn.human : Turn.bot);

	const playSound = useSounds();
	const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);

	// Properties
	const gameResult = BoardAPI.isTerminal(boardState);
	
	const insertCell = (index: number, symbol: "x" | "o") => {
		const stateCopy: BoardState = [...boardState]
		if (stateCopy[index] || BoardAPI.isTerminal(stateCopy)) {
			return
		}
		stateCopy[index] = symbol;
		setBoardState(stateCopy);
	}

	const handleCellPressed = (index: number) => {
		insertCell(index, isHumanMaximizing ? "x" : "o");
		playSoundForTurn();
		setTurn(Turn.bot);
	}

	const playSoundForTurn = () => {
		(turn === Turn.human) ? playSound("pop1") : playSound("pop2");
	}

	const isBoardDisabled = (): boolean => {
		const stateCopy: BoardState = [...boardState];
		if (BoardAPI.isTerminal(stateCopy)) {
			return true;
		}
		return false;
	}
	
	const getWinner = (winnerSymbol: Cell): "HUMAN" | "BOT" | "DRAW" => {
		if (winnerSymbol === "x") {
			return isHumanMaximizing ? "HUMAN" : "BOT";
		} else if (winnerSymbol === "o") {
			return isHumanMaximizing ? "BOT" : "HUMAN";
		} else {
			return "DRAW";
		}
	}
	
	const resetGame = () => {
		const stateCopy: BoardState = [...boardState];
		for (let index = 0; index < stateCopy.length; index++) {
			stateCopy[index] = null;
		}
		setTurn(Math.random() < 0.5 ? Turn.human : Turn.bot);
		setBoardState(stateCopy);
	}

	// State Binding
	useEffect(() => {
		if (gameResult) {
			const winnerCell = gameResult.winner
			const winner = getWinner(winnerCell);

			if (winner === "DRAW") {
				setScore({...score, draws: score.draws + 1});
				playSound("draw");
			}
			if (winner === "HUMAN") {
				setScore({...score, wins: score.wins + 1});
				playSound("win");
			}
			if (winner === "BOT") {
				setScore({...score, losses: score.losses + 1});
				playSound("loss");
			}
		} else {
			if (turn === Turn.bot) {
				if (BoardAPI.isEmpty(boardState)) {
					const centerAndCorners = [0,2,6,8,4];
					const firstMove = centerAndCorners[
						Math.floor(Math.random() * centerAndCorners.length)];
						insertCell(firstMove, "x");
						setIsHumanMaximizing(false);
				} else {
					const bestMove = PlayerAPI.getBestMove(boardState, !isHumanMaximizing, 0, 1);
					insertCell(bestMove, isHumanMaximizing ? "o" : "x");
				}
				playSoundForTurn();
				setTurn(Turn.human); 
			}
		}
	}, [boardState, turn])

	return (
		<GradientBackground> 
			<SafeAreaView style={styles.container}>
				<View>
					<Text style={styles.difficulty}>
						Difficulty: Hard
					</Text>

					<View style={styles.results}>
						<View style={styles.resultsBox}>
							<Text style={styles.resultsTitle}>Wins</Text>
							<Text style={styles.resultsCount}>{score.wins}</Text>
						</View>
						<View style={styles.resultsBox}>
							<Text style={styles.resultsTitle}>Draws</Text>
							<Text style={styles.resultsCount}>{score.draws}</Text>
						</View>
						<View style={styles.resultsBox}>
							<Text style={styles.resultsTitle}>Loss</Text>
							<Text style={styles.resultsCount}>{score.losses}</Text>
						</View>
					</View>
				</View>

				<Board 
					size={SCREEN_WIDTH - 60}
					state={boardState}
					gameResult={gameResult}
					disabled={isBoardDisabled() || turn === Turn.bot}
					onCellPressed={index => handleCellPressed(index)}
				/>
				{gameResult && (
					<View style={styles.modal}>
						<Text style={styles.modalText}>{
							getWinner(gameResult.winner) === "BOT" ? "You Lost" :
							getWinner(gameResult.winner) === "HUMAN" ? "You Won" : "Draw"
						}</Text>
						<Button title="Play again" onPress={() => resetGame()} />
					</View>
				)}
			</SafeAreaView>
		</GradientBackground>
	)
}