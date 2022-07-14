import Ripple from 'react-native-material-ripple'

const Button = ({ containerStyle, title, color, isLoading, onPress }) => {
    return (
        <Ripple
            style={[
                containerStyle,
                styles.container,
                { backgroundColor: color }
            ]}
            onPress={onPress}
        >

            {
                isLoading
                    ? <ActivityIndicator size="small" color="#fff" />
                    : (
                        <Text style={styles.title}>{title}</Text>
                    )
            }
        </Ripple>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        height: 30,
        paddingHorizontal: 10
    },
    title: {
        ...font.white,
        fontSize: 13
    }
})

export default Button