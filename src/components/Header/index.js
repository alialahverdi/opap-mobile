import Ripple from 'react-native-material-ripple'

// create a component
const Header = ({ title, goBack, onShowOrderListModal, countOrder }) => {

    // ------- Logic or Functions ------- //

    return (
        <View
            style={[
                styles.container,
                onShowOrderListModal != undefined
                    ? { justifyContent: "space-between" }
                    : { justifyContent: "flex-end" }
            ]}
        >
            {onShowOrderListModal != undefined && (
                <Ripple
                    style={styles.basketContainer}
                    onPress={onShowOrderListModal}
                >
                    <View
                        style={[
                            countOrder == 0
                                ? styles.counterDisable
                                : styles.counterActive,
                            styles.counter
                        ]}
                    >
                        <Text style={styles.counterText}>{countOrder}</Text>
                    </View>
                    <Ionicons
                        name="ios-cart"
                        size={32}
                        color="gray"
                        style={styles.basketIcon}
                    />
                </Ripple>
            )}
            <View style={styles.right}>
                <Text style={styles.title}>{title}</Text>
                <Ripple
                    style={styles.iconContainer}
                    onPress={goBack}
                >
                    <Ionicons name="ios-arrow-forward" size={25} color="gray" style={{ marginTop: 5 }} />
                </Ripple>
            </View>
        </View>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        elevation: 1,
        // backgroundColor: themeColor.primary,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10
    },
    right: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        ...font.black,
    },
    iconContainer: {
        padding: 10
    },
    basketContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignItems: "flex-end"
    },
    basketIcon: {
        marginTop: -10
    },
    counter: {
        justifyContent: "center",
        alignItems: "center",
        width: 22,
        height: 22,
        borderRadius: 10,
        zIndex: 1,
        marginRight: -8
    },
    counterText: {
        ...font.whiteBold
    },
    counterActive: {
        backgroundColor: "red",
    },
    counterDisable: {
        backgroundColor: "transparent",
    }
})

//make this component available to the app
export default Header
