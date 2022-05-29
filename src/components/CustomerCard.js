const CustomerCard = ({ customer, onExpand }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                activeOpacity={.6}
                onPress={onExpand}
            >
                <View style={styles.customerPay}>
                    <Text style={{ fontSize: 12 }}>فاکتور باز : {customer.CountOpen}</Text>
                    <Text style={{ fontSize: 12 }}>مانده مشتری : {customer.RemAmount}</Text>
                </View>
                <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{customer.CustomerName}</Text>
                    <Text style={styles.customerID}>{customer.CustomerID}</Text>
                    <Text style={styles.customerAddr}>{customer.Address}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ height: customer.layoutHeight }}>
                <View style={styles.line} />
                <View style={styles.content}>
                    <View style={styles.item}>
                        <Ionicons name="podium" size={22} color="gray" />
                        <Text style={styles.textContent}>فاکتور باز</Text>
                    </View>
                    <View style={styles.item}>
                        <Ionicons name="person" size={22} color="gray" />
                        <Text style={styles.textContent}>اطلاعات مشتری</Text>
                    </View>
                    <View style={styles.item}>
                        <Ionicons name="ios-cart" size={22} color="gray" />
                        <Text style={styles.textContent}>ثبت سفارش</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingVertical: 10,
        paddingLeft: 20,
        elevation: 1
    },
    header: {
        flexDirection: "row",
    },
    customerInfo: {
        flex: .7,
        alignItems: "flex-end",
        paddingHorizontal: 15
    },
    customerName: {
        fontSize: 15,
        textAlign: "right",
    },
    customerID: {
        textAlign: "right",
        fontSize: 10,
        marginTop: 8
    },
    customerAddr: {
        textAlign: "right",
        fontSize: 10,
        marginTop: 12
    },
    firstletter: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    customerPay: {
        flex: .3,
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    line: {
        height: 1,
        backgroundColor: '#f0f1f3',
        marginRight: 20,
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
        fontSize: 12,
        marginTop: 6
    }

})

export default CustomerCard;