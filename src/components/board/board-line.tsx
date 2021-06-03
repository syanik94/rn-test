import React, { ReactElement, useRef, useEffect } from "react";
import { StyleSheet, Animated } from 'react-native';
import { BoardResult, colors } from '../../utilis/index'

type BoardLineProp = {
  size: number;
  gameResult?: BoardResult | false;
}

const style = StyleSheet.create({
  line: {
    position: "absolute",
    backgroundColor: colors.lightPurple,
  },
  vLine: {
    width: 4,
  },
  hLine: {
    height: 4,
  },
  dLine: {
    width: 4,
    top: 0,
    left: '50%'
  }
})

export default function BoardLine({ size, gameResult }: BoardLineProp): ReactElement {
  const diagonalHeight = Math.sqrt(Math.pow(size, 2) * 2);
  const animatedRef = useRef<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedRef.current, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [])

  return(
    <>
      {gameResult && gameResult.column && gameResult.direction === "V" && 
        <Animated.View style={[
          style.line, 
          style.vLine, {
            height: animatedRef.current
              .interpolate({
                inputRange: [0,1],
                outputRange: ['0%','100%']
              }),
            left: `${33.3333 * gameResult.column - 16.666}%`
        }]}>
        </Animated.View>}
      {gameResult && gameResult.row && gameResult.direction === "H" &&
        <Animated.View style={[
          style.line, 
          style.hLine, {
            width: animatedRef.current
              .interpolate({
                inputRange: [0,1],
                outputRange: ['0%','100%']
              }),
            top: `${33.3333 * gameResult.row - 16.666}%`
        }]}>
        </Animated.View>}
      {gameResult && gameResult.diagonal && gameResult.direction === "D" &&
        <Animated.View style={[
          style.line, 
          style.dLine, {
            height: animatedRef.current
              .interpolate({
                inputRange: [0,1],
                outputRange: [0, diagonalHeight]
              }),
            transform: [
              { translateY: animatedRef.current
                .interpolate({
                  inputRange: [0,1],
                  outputRange: [(size / 2), -(diagonalHeight - size) / 2]
                })},
              { rotateZ: gameResult.diagonal === "MAIN" ? '-45deg' : '45deg' }
            ]}]}>
        </Animated.View>}
    </>
  )
}