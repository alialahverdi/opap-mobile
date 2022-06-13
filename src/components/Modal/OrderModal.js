import { formatNumber } from '../../utils/numbersUtils'

const OrderModal = ({ visible, product, onRequestClose, onclose }) => {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>جزییات کالا</Text>
                    <TouchableOpacity
                        activeOpacity={.6}
                        style={styles.arrowForwardeIconContainer}
                        onPress={onclose}
                    >
                        <Ionicons name="ios-arrow-forward" size={25} color="gray" style={{ marginTop: 2 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={styles.productName}>{product.ProductName}</Text>
                    <View style={styles.detailContainer}>
                        <Text style={styles.value}>{product.SupplierName}</Text>
                        <Text style={styles.key}>تامین کننده</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.detailContainer}>
                        <Text style={styles.value}>{product.ExprDate}</Text>
                        <Text style={styles.key}>تاریخ انقضا</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.detailContainer}>
                        <Text style={styles.value}>{product.StockQty}</Text>
                        <Text style={styles.key}>موجودی</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.detailContainer}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.toman}>تومان</Text>
                            <Text style={styles.value}>{formatNumber(product.SalesPrice)}</Text>
                        </View>
                        <Text style={styles.key}>قیمت فروش</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.detailContainer}>
                        <Text></Text>
                        <Text style={styles.key}>فرجه</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.detailContainer}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.toman}>تومان</Text>
                            <Text style={styles.value}>{formatNumber(product.CustomerPrice)}</Text>
                        </View>
                        <Text style={styles.key}>قیمت مصرف کننده</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.detailContainer}>
                        <Text style={styles.value}>{product.UnitQty}</Text>
                        <Text style={styles.key}>تعداد در بسته</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.detailContainer}>
                        <Text style={styles.value}>{product.SupplierName}</Text>
                        <Text style={styles.key}>گروه کالایی</Text>
                    </View>
                    <View style={styles.line} />
                    <View>
                        <Text style={styles.stairText}>{product.PromotionDesc}</Text>
                    </View>
                </View>
                <View style={styles.footer}>

                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: .7,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: '#fff',
        elevation: 2,
    },
    content: {
        flex: 8.3,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    footer: {
        flex: 1,
    },
    arrowForwardeIconContainer: {
        padding: 10
    },
    title: {
        ...font.black,
    },
    productName: {
        ...font.black,
        fontSize: 15,
        color: "#18277a",
        marginTop: 5,
        marginBottom: 25,
        textAlign: 'right'
    },
    detailContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#f7f7f9',
        marginBottom: 5
    },
    key: {
        ...font.gray,
        fontSize: 13
    },
    value: {
        ...font.black,
        color: "#2367ff",
        fontSize: 13
    },
    toman: {
        ...font.gray,
        color: "#2367ff",
        fontSize: 8,
        marginRight: 5,
        marginTop: 5
    },
    stairText: {
        ...font.gray,
        fontSize: 12,
        marginVertical: 15,
        textAlign: 'right'
    }
})

export default OrderModal