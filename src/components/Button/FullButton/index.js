import Ripple from 'react-native-material-ripple'

const FullButton = ({ isLoading, title, onPress, disabled = false, ...rest }) => {
    return (
        <Ripple
            {...rest}
            disabled={disabled}
            onPress={onPress}
            style={[
                styles.container,
                disabled ? styles.deActiveBackground : styles.activeBackground
            ]}
        >
            {
                isLoading
                    ? <ActivityIndicator size="small" color="#fff" />
                    : (
                        <Text style={[disabled ? styles.deactiveTitle : styles.activeTitle]}>
                            {title}
                        </Text>
                    )
            }
        </Ripple>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        paddingHorizontal: 25,
        shadowColor: "gray",
        shadowOpacity: .5,
        elevation: 1
    },
    activeBackground: {
        backgroundColor: "#2367ff"
    },
    deActiveBackground: {
        backgroundColor: "#e0e0e0"
    },
    activeTitle: {
        ...font.white,
        fontSize: 16
    },
    deactiveTitle: {
        ...font.disableBold,
        fontSize: 16
    }
})

export default FullButton