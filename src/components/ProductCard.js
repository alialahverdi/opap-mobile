import { formatNumber } from '../utils/numbersUtils'

const ProductCard = ({ product, screenType, OnOrder }) => {

    return (
        <View style={styles.container}>
            {screenType == "OrderedProducts" && (
                <TouchableOpacity
                    activeOpacity={.6}
                    style={styles.left}
                    onPress={() => OnOrder(product)}
                >
                    <View style={styles.orderButton}>
                        <Ionicons name="ios-cart" size={20} color="#0351ff" />
                    </View>
                </TouchableOpacity>
            )}
            <View style={[
                styles.center,
                screenType == "OrderedProducts" ? { paddingLeft: 0 } : { paddingLeft: 15 },
                screenType == "OrderedProducts" ? { flex: .6 } : { flex: .8 }
            ]}>
                <Text
                    numberOfLines={1}
                    style={styles.productNameText}
                >
                    {product.ProductName}
                </Text>
                <Text style={styles.salesPriceText}>{formatNumber(product.SalesPrice)}</Text>
                <View style={styles.supplierContainer}>
                    <Text style={styles.supplierText}>{product.SupplierName}</Text>
                </View>
            </View>
            <View style={styles.right}>
                <Text style={styles.productIdText}>{product.ProductID}</Text>
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
        // paddingLeft: 5,
        elevation: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    left: {
        flex: .2,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'red'
    },
    orderButton: {
        width: 35,
        height: 35,
        backgroundColor: '#f1f4fc',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        alignItems: "flex-end",
    },
    productNameText: {
        ...font.black,
        color: "#18277a"
    },
    salesPriceText: {
        ...font.gray,
        fontSize: 13,
        marginTop: 10
    },
    right: {
        flex: .2,
        justifyContent: "center",
        alignItems: "center"
    },
    productIdText: {
        ...font.black,
        color: "#2367ff"
    },
    supplierContainer: {
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'rgba(108, 182, 65, 0.1)',
        // width: 80,
    },
    supplierText: {
        fontFamily: 'IRANSansMobile(FaNum)',
        fontSize: 10,
        color: '#6CB641',
    }
})

export default ProductCard