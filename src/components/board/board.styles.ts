import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#fff',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: "wrap"
  },
  cell: {
    width:"33.333%",
    height:"33.333%",
    backgroundColor: "#fff",
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default styles;