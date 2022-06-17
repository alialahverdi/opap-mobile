import Ripple from 'react-native-material-ripple'

const FullButton = ({ title, disabled, ...rest }) => {
    return (
        <Ripple {...rest} disabled={disabled} style={[
            styles.container,
            disabled ? styles.deActiveBackground : styles.activeBackground
        ]}>
            <Text
                style={[
                    disabled ? styles.deactiveTitle : styles.activeTitle
                ]}>
                {title}
            </Text>
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
        // shadowColor: "gray",
        // shadowOpacity: .5,
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