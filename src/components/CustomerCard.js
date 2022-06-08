const CustomerCard = ({ customer, onExpand, onOrder }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                activeOpacity={.6}
                onPress={onExpand}
            >
                <View style={styles.customerPay}>
                    <Text style={[font.black, { fontSize: 12 }]}>فاکتور باز : {customer.CountOpen}</Text>
                    <Text style={[font.black, { fontSize: 12 }]}>مانده مشتری : {customer.RemAmount}</Text>
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
                    <TouchableOpacity
                        style={styles.item}
                        activeOpacity={.6}
                        onPress={onOrder}
                    >
                        <Ionicons name="ios-cart" size={22} color="gray" />
                        <Text style={styles.textContent}>ثبت سفارش</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
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
        ...font.black,
        color: "#18277a",
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