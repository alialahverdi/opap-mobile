import Ripple from "react-native-material-ripple";
import { formatNumber } from "../utils/numbersUtils";

const CustomerCard = ({ customer, onExpand, onOrder, onOpenFactor, onInfo }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                activeOpacity={.6}
                onPress={onExpand}
            >
                <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{customer.CustomerName}</Text>
                    <Text>  </Text>
                    <Text style={styles.customerName}>{customer.CustomerID}</Text>
                    <Text>  </Text>
                    <MaterialCommunityIcons
                        name={customer.StatusID === 2 ? "account-cancel" : "account-check"}
                        size={20}
                        color={customer.StatusID === 2 ? "red" : "green"}
                    />
                </View>

                <View style={styles.customerInfo}>
                    <Text style={styles.customerAddr}>{customer.Address}</Text>
                </View>
                <View style={styles.customerPay}>
                    <Text style={[font.black, { fontSize: 12, flex: .5, color: '#1a8cff' }]}>فاکتور باز : {customer.CountOpen}</Text>
                    <Text style={[font.black, { fontSize: 12, flex: .5, color: '#1a8cff' }]}>مانده مشتری :  {formatNumber(customer.RemAmount)}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ height: customer.layoutHeight }}>
                <View style={styles.line} />
                <View style={styles.content}>
                    <Ripple
                        style={styles.item}
                        onPress={onOpenFactor}
                    >
                        <Ionicons name="document-text" size={22} color="#ff6666" />
                        <Text style={styles.textContent}>فاکتور باز</Text>
                    </Ripple>
                    <Ripple
                        style={styles.item}
                        onPress={onInfo}
                    >
                        <Ionicons name="stats-chart" size={22} color="#8000ff" />
                        <Text style={styles.textContent}>آنالیز مشتری</Text>
                    </Ripple>
                    <Ripple
                        style={styles.item}
                        onPress={onOrder}
                    >
                        <Ionicons name="ios-cart" size={22} color="#00b300" />
                        <Text style={styles.textContent}>ثبت سفارش</Text>
                    </Ripple>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 2,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginBottom: 5,
        // paddingVertical: 5,
        padding: 1,
        // elevation: 3,

    },
    header: {
        // flexDirection: "row",
        alignItems: "flex-end",
    },
    customerInfo: {
        // flex: .7,
        // alignItems: "flex-end",
        // backgroundColor: 'red',
        paddingHorizontal: 10,
        flexDirection: 'row',
        padding: 1,
    },
    customerName: {
        ...font.black,
        color: "#111",
        textAlign: "right",
    },
    customerID: {
        ...font.gray,
        textAlign: "right",
        color: "#2367ff",
        fontSize: 10,
        marginTop: 8
    },
    customerAddr: {
        ...font.gray,
        textAlign: "right",
        fontSize: 10
    },
    firstletter: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    customerPay: {
        flexDirection: 'row', paddingHorizontal: 10, color: '#3399ff'
        , padding: 2,
        marginVertical: 2
    },
    line: {
        height: 1,
        backgroundColor: '#f0f1f3',
        marginRight: 15,
        marginTop: 10
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        marginRight: 10
    },
    item: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textContent: {
        ...font.gray,
        fontSize: 12,
        marginTop: 6
    }

})

export default CustomerCard;