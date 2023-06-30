import { StyleSheet } from "react-native"

export const Styles = StyleSheet.create({
    container: {
        flex: 1
    },

    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        gap: 20
    },

    cardContainer: {
        width: '100%',
        borderRadius: 10,
        elevation: 10,
    },

    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    labelForm: {
        marginTop: 15
    },

    divider: {
        marginTop: 10,
        marginBottom: 20
    }
})