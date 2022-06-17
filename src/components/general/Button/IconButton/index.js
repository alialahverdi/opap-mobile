import Ripple from 'react-native-material-ripple'

const IconButton = ({ basic, iconName, onPress }) => {
    return (
        <Ripple
            style={[
                styles.container,
                basic ? styles.basic : styles.outline
            ]}
            onPress={onPress}
        >
            <Ionicons
                name={iconName}
                color={basic ? "#fff" : "gray"}
                size={25}
            />
        </Ripple>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 5
    },
    basic: {
        backgroundColor: "#2367ff"
    },
    outline: {
        borderWidth: 1,
        borderColor: "gray",
    }
})

export default IconButton