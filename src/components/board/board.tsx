import styles from './board.styles';
import { Text } from '../../components/index';
import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BoardState } from '../../utilis/index'

type BoardProps = {
  size: number;
  state: BoardState;
  disabled?: boolean;
  onCellPressed?: (index: number) => void;
}

export default function Board({ state, size, disabled, onCellPressed }: BoardProps): ReactElement {
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
            disabled={disabled}
            onPress={() => onCellPressed && onCellPressed(index)}>
            <Text style={{fontSize: size/8}}>
              {cell}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  );
}