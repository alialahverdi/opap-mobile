import { formatNumber } from '../utils/numbersUtils'
import Ripple from 'react-native-material-ripple'

const ProductCard = ({ product, screenType, onPress }) => {

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Ripple style={styles.orderButton} onPress={onPress} >
                    <Ionicons
                        name={screenType === "ProductScreen" ? "eye" : "ios-cart"}
                        size={20}
                        color="#0351ff"
                    />
                </Ripple>
            </View>
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
        paddingTop: Platform.OS === "ios" ? 10 : 5,
        paddingBottom: 5,
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
        fontSize: Platform.OS == "android" ? 12 : 14,
        color: "#18277a"
    },
    salesPriceText: {
        ...font.gray,
        fontSize: 12,
        marginTop: Platform.OS === "ios" ? 10 : 5
    },
    right: {
        flex: .2,
        justifyContent: "center",
        alignItems: "center"
    },
    productIdText: {
        ...font.black,
        fontSize: Platform.OS == "android" ? 12 : 14,
        color: "#2367ff"
    },
    supplierContainer: {
        marginTop: Platform.OS === "ios" ? 15 : 10,
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'rgba(108, 182, 65, 0.1)'
    },
    supplierText: {
        fontFamily: 'IRANSansMobile(FaNum)',
        fontSize: Platform.OS === "ios" ? 12 : 9,
        color: '#6CB641',
    }
})

export default ProductCard