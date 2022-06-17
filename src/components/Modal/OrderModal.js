import { formatNumber } from '../../utils/numbersUtils'
import IconButton from '../general/Button/IconButton'
import Input from '../general/Input'
import FullButton from '../general/Button/FullButton'
import Ripple from 'react-native-material-ripple'

const OrderModal = ({ visible, product, onRequestClose, onclose }) => {

    // ------- States ------- //
    const [count, setCount] = useState("")


    // ------- Logic or Functions ------- //

    const increase = () => {
        setCount(prev => {
            const numCount = Number(prev) + 1
            return numCount.toString()
        })
    }

    const decrease = () => {
        setCount(prev => {
            const numCount = Number(prev) - 1
            return numCount.toString()
        })
    }

    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.title}>جزییات کالا</Text>
                        <Ripple
                            style={styles.arrowForwardeIconContainer}
                            onPress={onclose}
                        >
                            <Ionicons name="ios-arrow-forward" size={25} color="gray" style={{ marginTop: 2 }} />
                        </Ripple>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.addToBasketContainer}>
                            <View style={styles.outlineContainer}>
                                <IconButton outline iconName="remove" onPress={decrease} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Input
                                    value={count}
                                    onChangeText={setCount}
                                    placeholder="تعداد"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.basicContainer}>
                                <IconButton basic iconName="add" onPress={increase} />
                            </View>
                        </View>
                        <Text style={styles.productName}>{product.ProductID} - {product.ProductName}</Text>
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
                            <Text style={styles.value}>{product.PayDay}</Text>
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
                </View>

                <View style={styles.footer}>
                    <FullButton title="تکمیل سفارش" disabled={count != "" ? false : true} />
                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    header: {
        // flex: .7,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        elevation: 1,
    },
    content: {
        // flex: 8.5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    footer: {
        justifyContent: "center",
        marginHorizontal: 15,
        marginBottom: 10
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
        marginTop: 30,
        marginBottom: Platform.OS == "ios" ? 30 : 10,
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
        fontSize: Platform.OS == "android" ? 12 : 14
    },
    value: {
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
    stairText: {
        ...font.gray,
        fontSize: 12,
        marginVertical: 15,
        textAlign: 'right'
    },
    addToBasketContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15
    },
    outlineContainer: {
        flex: 2,
        alignItems: "center"
    },
    inputContainer: {
        flex: 6,
        height: 40
    },
    basicContainer: {
        flex: 2,
        alignItems: "center"
    }
})

export default OrderModal