import React, { ReactElement, useState, useEffect } from 'react';
import style from './game-single.styles';
import { SafeAreaView } from 'react-native';
import { GradientBackground, Board } from '../../components/index';
import { BoardAPI, BoardState, PlayerAPI, Cell, useSounds } from '../../utilis';

enum Turn {
	bot="BOT",
	human="HUMAN"
}
export default function GameSingle(): ReactElement {
	// State
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

	// State Binding
	useEffect(() => {
		if (gameResult) {
			const winnerCell = gameResult.winner
			const winner = getWinner(winnerCell);
			if (winner === "DRAW") {
				playSound("draw");
				alert("Draw!");
			}
			if (winner === "HUMAN") {
				playSound("win");
				alert("You win!");
			}
			if (winner === "BOT") {
				playSound("loss");
				alert("You lose, loser");
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
					const bestMove = PlayerAPI.getBestMove(boardState, !isHumanMaximizing, 0, -1);
					insertCell(bestMove, isHumanMaximizing ? "o" : "x");
				}
				playSoundForTurn();
				setTurn(Turn.human); 
			}
		}
	}, [boardState, turn])

	return (
		<GradientBackground> 
			<SafeAreaView style={style.container}>
				<Board 
					size={300}
					state={boardState}
					disabled={isBoardDisabled() || turn === Turn.bot}
					onCellPressed={index => handleCellPressed(index)}/>
			</SafeAreaView>
		</GradientBackground>
	)
}