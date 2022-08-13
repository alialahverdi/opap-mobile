import { formatNumber } from '../utils/numbersUtils'
import Ripple from 'react-native-material-ripple'

const ProductCard = ({ product, screenType, onPress }) => {

    return (
        <Ripple onPress={onPress} style={styles.container}>
            <View style={styles.header}>
                <Text numberOfLines={1} style={styles.productName}>{product.ProductID} {product.ProductName}</Text>
                <MaterialCommunityIcons
                    name="gift-outline"
                    size={18}
                    color={product.PromotionDesc === "" ? "gray" : "red"}
                />
            </View>
            <View style={styles.tageContainer}>
                <View style={styles.supplierContainer}>
                    <Text style={styles.supplierText}>{product.StockQty} بسته</Text>
                </View>
                <View style={styles.supplierContainer}>
                    <Text style={styles.supplierText}>{product.ExprDate} انقضا</Text>
                </View>
                <View style={styles.supplierContainer}>
                    <Text style={styles.supplierText}>{product.PayDay} روز</Text>
                </View>
                <View style={styles.supplierContainer}>
                    <Text style={styles.supplierText}>{formatNumber(product.SalesPrice)} ریال</Text>
                </View>
                <View style={styles.supplierContainer}>
                    <Text style={styles.supplierText}>{product.SupplierName}</Text>
                </View>
            </View>
            {/* <View style={styles.left}>
                <Ripple style={styles.orderButton} onPress={onPress} >
                    <Ionicons
                        name={screenType === "ProductScreen" ? "eye" : "ios-cart"}
                        size={20}
                        color="#0351ff"
                    />
                </Ripple>
            </View>
            <View style={[
                styles.right,
                // screenType == "OrderedProducts" ? { paddingLeft: 0 } : { paddingLeft: 15 },
                // screenType == "OrderedProducts" ? { flex: .6 } : { flex: .8 }
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
            </View> */}
        </Ripple>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingTop: Platform.OS === "ios" ? 10 : 5,
        padding: 10,
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        // flexDirection: "row",
        justifyContent: "flex-end"
    },
    header: {
        flexDirection: 'row',
        padding: 1,
        justifyContent: "flex-end",
        alignItems: 'flex-start',
        // backgroundColor: 'red'
    },
    productName: {
        ...font.black,
        color: "#111",
        marginRight: 10
        // textAlign: "right",
    },
    tageContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    left: {
        flex: .1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'red'
    },
    right: {
        flex: .9,
        // backgroundColor: "yellow"
        // alignItems: "flex-end",
    },
    orderButton: {
        width: 35,
        height: 35,
        backgroundColor: '#f1f4fc',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
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
    // right: {
    //     flex: .2,
    //     justifyContent: "center",
    //     alignItems: "center"
    // },
    productIdText: {
        ...font.black,
        fontSize: Platform.OS == "android" ? 12 : 14,
        color: "#2367ff"
    },
    supplierContainer: {
        marginTop: Platform.OS === "ios" ? 15 : 10,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'rgba(108, 182, 65, 0.1)',
        marginLeft: 5
    },
    supplierText: {
        fontFamily: 'IRANSansMobile(FaNum)',
        fontSize: Platform.OS === "ios" ? 12 : 9,
        color: '#009933',
    }
})

export default ProductCard