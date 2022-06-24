import * as Animatable from 'react-native-animatable';

const Snackbar = ({ content }) => {
    return (
        <Animatable.View
            animation="fadeIn"
            duration={300}
            useNativeDriver={true}
            style={styles.continer}
        >
            <Text>{content?.message}</Text>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    continer: {
        backgroundColor: "#fff",
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        zIndex: 1000,
        position: "absolute",
        bottom: "13%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        ...font.gray
    }
})

export default Snackbar