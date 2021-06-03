import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import { colors } from "../../utilis";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 80,
    },
    difficulty: {
        color: colors.lightGreen,
        fontSize: 22,
        textAlign: "center",
        marginBottom: 20
    },
    results: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 80
    },
    resultsBox: {
        backgroundColor: colors.lightGreen,
        borderColor: colors.lightPurple,
        borderWidth: 1,
        alignItems: "center",
        padding: 15,
        marginHorizontal: 5
    },
    resultsTitle: {
        textAlign: "center",
        fontSize: 14,
        color: colors.darkPurple,
    }, 
    resultsCount: {
        textAlign: "center",
        fontSize: 14,
        color: colors.darkPurple,
    },
    modal: {
        alignItems: "center",
        position: "absolute",
        backgroundColor: colors.lightPurple,
        bottom: 40,
        left: 30, right: 30,
        borderWidth: 3,
        borderColor: colors.lightGreen,
        paddingBottom: 30,
    }, 
    modalText: {
        color: colors.lightGreen,
        fontSize: 28,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 30,
    }
})

export default styles;