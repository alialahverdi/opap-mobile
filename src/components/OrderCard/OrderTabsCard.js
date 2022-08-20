import Ripple from 'react-native-material-ripple'
import { formatNumber } from '../../utils/numbersUtils'
import Button from '../Button'


// create a component
const OrderTabsCard = ({ orderItem, sent, onUpdate, onDelete, sendOrder }) => {

    const [sendOrderLoading, setSendOrderLoading] = useState(false)

    const factorSum = () => {
        if (orderItem.OrderDetail.length > 0) {
            const prices = orderItem.OrderDetail.map((i) => i.SalesPrice * i.count)
            const reducer = (accumulator, curr) => accumulator + curr;
            const total = prices.reduce(reducer)
            return total
        }
    }

    const payday = () => {
        if (orderItem.OrderDetail.length > 0) {

            const prices = orderItem.OrderDetail.map((i) => i.SalesPrice * i.count)
            const reducer = (accumulator, curr) => accumulator + curr;
            const total = prices.reduce(reducer)

            const day = orderItem.OrderDetail.map((i) => i.SalesPrice * i.count * i.PayDay)
            const dayreducer = (accumulator, curr) => accumulator + curr;
            const totalDay = day.reduce(dayreducer)

            const devider = totalDay / total

            return Math.floor(devider)
        }

    }

    const onPress = () => {
        setSendOrderLoading(true)
        sendOrder(orderItem).then(() => {
            setSendOrderLoading(false)
        })
    }

    return (
        <View style={styles.container}>
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
                {!sent && (
                    <Ripple
                        style={styles.buttonContainer}
                        onPress={onUpdate}
                    >
                        <MaterialCommunityIcons
                            name="pencil"
                            size={20}
                            color="#0351ff"
                        />
                    </Ripple>
                )}
                {sent && (
                    <Ripple
                        style={styles.buttonContainer}
                        onPress={onUpdate}
                    >
                        <MaterialCommunityIcons
                            name="eye"
                            size={20}
                            color="#0351ff"
                        />
                    </Ripple>
                )}
            </View>
            <View style={styles.right}>
                <Text
                    numberOfLines={1}
                    style={styles.productNameText}
                >
                    {orderItem.CustomerName}
                </Text>
                <View style={[styles.infoProduct, { marginTop: 10 }]}>
                    <Text style={styles.toman}>روز</Text>
                    <Text style={styles.infoText}>{formatNumber(payday()) ?? 0} </Text>
                    <Text style={styles.infoText}>رأس :</Text>
                </View>
                <View style={styles.infoProduct}>
                    <Text style={styles.toman}>ریال</Text>
                    <Text style={styles.infoText}>{formatNumber(factorSum()) ?? 0} </Text>
                    <Text style={styles.infoText}>قیمت کل :</Text>
                </View>
                <Button
                    isLoading={sendOrderLoading}
                    containerStyle={styles.actions}
                    title={sent ? "ارسال مجدد" : "ارسال سفارش"}
                    color="#6495ED"
                    width={95}
                    onPress={onPress}
                />
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
        marginTop: 5
    },
    infoText: {
        ...font.black,
        color: "#2367ff",
        fontSize: Platform.OS == "android" ? 14 : 14
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
    },
    actions: {
        marginTop: 10
    }
})

//make this component available to the app
export default OrderTabsCard