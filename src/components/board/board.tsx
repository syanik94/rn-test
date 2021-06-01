import styles from './board.styles';
import { Text } from '../../components/index';
import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BoardState, BoardResult } from '../../utilis/index'
import BoardLine from './board-line';

type BoardProps = {
  size: number;
  state: BoardState;
  disabled?: boolean;
  gameResult?: BoardResult | false;
  onCellPressed?: (index: number) => void;
}

export default function Board({ 
  state, 
  size, 
  disabled, 
  gameResult, 
  onCellPressed 
}: BoardProps): ReactElement {
  return (
    <View
      style={[{
        width: size,
        height: size,
      }, styles.board]}>
      {state.map((cell,index) => {
        return (
          <TouchableOpacity 
            key={index}
            style={styles.cell} 
            disabled={disabled || cell != null}
            onPress={() => onCellPressed && onCellPressed(index)}>
            <Text style={{fontSize: size/8}}>
              {cell}
            </Text>
          </TouchableOpacity>
        )
      })}
      {gameResult && <BoardLine size={size} gameResult={gameResult}/>}
    </View>
  );
}