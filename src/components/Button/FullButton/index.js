import Ripple from 'react-native-material-ripple'

const FullButton = ({ containerStyle, isLoading, title, onPress, disabled = false, ...rest }) => {
    return (
        <Ripple
            {...rest}
            disabled={disabled}
            onPress={onPress}
            style={[
                styles.container, containerStyle,
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
        borderRadius: 5,
        paddingHorizontal: 25,
        shadowColor: "gray",
        shadowOpacity: .5,
        elevation: 1
    },
    activeBackground: {
        backgroundColor: themeColor.secondary
    },
    deActiveBackground: {
        backgroundColor: "#e0e0e0"
    },
    activeTitle: {
        ...font.white
    },
    deactiveTitle: {
        ...font.disableBold
    }
})

export default FullButton