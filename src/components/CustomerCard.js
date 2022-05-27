const CustomerCard = ({ customer }) => {

    getRandomColor = () => {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    }

    return (
        <View style={styles.container}>
            <View style={styles.customerPay}>
                <Text style={{ fontSize: 12 }}>فاکتور باز : {customer.CountOpen}</Text>
                <Text style={{ fontSize: 12 }}>مانده مشتری : {customer.CountOpen}</Text>
            </View>
            <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{customer.CustomerName}</Text>
                <Text style={styles.customerID}>{customer.CustomerID}</Text>
                <Text style={styles.customerAddr}>{customer.Address}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 4,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingVertical: 10,
        paddingLeft: 10,
        elevation: 1,
        backgroundColor: "#f7f7f9"
    },
    customerInfo: {
        flex: 1,
        alignItems: "flex-end",
        paddingHorizontal: 10
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
        justifyContent: "center",
    },
    customerPay: {
        justifyContent: "space-between",
        alignItems: "flex-end"
    }
})

export default CustomerCard;