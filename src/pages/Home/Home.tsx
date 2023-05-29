import { StyleSheet, View } from "react-native"
import { Text } from "@ui-kitten/components"
import { SafeAreaView } from "react-native-safe-area-context"


export const HomeView = ({}) => {

    return (
        <SafeAreaView style={style.container}>
            <View>
                <Text>Olá</Text>
            </View>
        </SafeAreaView>
    )

}

const style = StyleSheet.create({
    container: {
        flex: 1,
    }
})