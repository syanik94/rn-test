import { StyleSheet } from "react-native";
import { colors } from '../../utilis/index';

const styles = StyleSheet.create({
  board: {
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: "wrap"
  },
  cell: {
    width:"33.333%",
    height:"33.333%",
    borderWidth: 2,
    borderColor: colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell0: {
    borderTopWidth: 0,
    borderLeftWidth: 0
  },
  cell1: {
    borderTopWidth: 0
  },
  cell2: {
    borderTopWidth: 0,
    borderRightWidth: 0
  },
  cell3: {
    borderLeftWidth: 0,
  },
  cell5: {
    borderRightWidth: 0
  },
  cell6: {
    borderLeftWidth: 0,
    borderBottomWidth: 0
  },
  cell7: {
    borderBottomWidth: 0
  },
  cell8: {
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  cellText: {
    color: colors.lightGreen,
  }
})

export default styles;