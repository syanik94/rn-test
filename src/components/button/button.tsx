import styles from './button.styles';
import { Text } from '../index';
import React, { ReactElement } from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';

type ButtonProps = {
  title: string
} & TouchableOpacityProps;

export default function Button({title, style, ...props}: ButtonProps): ReactElement {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Text {...props} style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}