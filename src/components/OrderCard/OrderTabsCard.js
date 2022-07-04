import Ripple from 'react-native-material-ripple'
import { formatNumber } from '../../utils/numbersUtils'

// create a component
const OrderTabsCard = ({ orderItem, sent, onDelete }) => {

    const factorSum = () => {
        if (orderItem.OrderDetail.length > 0) {
            const prices = orderItem.OrderDetail.map((i) => i.SalesPrice * i.count)
            const reducer = (accumulator, curr) => accumulator + curr;
            const total = prices.reduce(reducer)
            return total
        }
    }

    const vertex = () => {

    }

    return (
        <View style={styles.container}>
            {!sent && (
                <View style={styles.left}>
                    <Ripple
                        style={[styles.buttonContainer, { marginRight: 10 }]}
                        onPress={onDelete}
                    >
                        <MaterialCommunityIcons
                            name="delete"
                            size={20}
                            color="#0351ff"
                        />
                    </Ripple>
                    <Ripple style={styles.buttonContainer}>
                        <MaterialCommunityIcons
                            name="pencil"
                            size={20}
                            color="#0351ff"
                        />
                    </Ripple>
                </View>
            )}
            <View style={styles.right}>
                <Text
                    numberOfLines={1}
                    style={styles.productNameText}
                >
                    {orderItem.CustomerName}
                </Text>
                {/* <View style={styles.infoProduct}>
                    <Text style={styles.infoText}>{formatNumber(factorSum())} </Text>
                    <Text style={styles.infoText}>تعداد :</Text>
                </View> */}
                {/* <View style={styles.infoProduct}>
                    <Text style={styles.toman}>تومان</Text>
                    <Text style={styles.infoText}>{formatNumber(vertex())} </Text>
                    <Text style={styles.infoText}>رأس :</Text>
                </View> */}
                <View style={styles.infoProduct}>
                    <Text style={styles.toman}>تومان</Text>
                    <Text style={styles.infoText}>{formatNumber(factorSum())} </Text>
                    <Text style={styles.infoText}>قیمت کل :</Text>
                </View>
            </View>
        </View>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 10,
        elevation: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    left: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    buttonContainer: {
        width: 35,
        height: 35,
        backgroundColor: '#f1f4fc',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        alignItems: "flex-end",
        flex: 7
    },
    productNameText: {
        ...font.blackBold,
        color: "#18277a",
        fontSize: 15,
        // marginBottom: 5
    },
    infoProduct: {
        flexDirection: "row",
        marginTop: 10
    },
    infoText: {
        ...font.black,
        color: "#2367ff",
        fontSize: Platform.OS == "android" ? 12 : 14
    },
    toman: {
        ...font.gray,
        color: "#2367ff",
        fontSize: 8,
        marginRight: 5,
        marginTop: 5
    },
    supplierContainer: {
        marginTop: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'rgba(108, 182, 65, 0.1)'
    },
    supplierText: {
        fontFamily: 'IRANSansMobile(FaNum)',
        fontSize: 10,
        color: '#6CB641',
    }
})

//make this component available to the app
export default OrderTabsCard