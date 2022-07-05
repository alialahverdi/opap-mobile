import { useMemo } from 'react'
import { formatNumber } from '../../utils/numbersUtils'
import IconButton from '../Button/IconButton'
import Input from '../Input'
import FullButton from '../Button/FullButton'
import realm from '../../model/v1/realmInstance'
import { storeArray, updateArray, updateObj } from '../../model/query'
import { toEnglishDigits } from '../../utils/numbersUtils'
import Header from '../Header'
import Snackbar from "../../components/Snakbar"


const OrderModal = ({ type, title, visible, product, customer, onRequestClose, onclose }) => {

    // ------- States ------- //
    const [count, setCount] = useState("")
    const [snackbarMessage, setSnackbarMessage] = useState(null)


    // ------- Logic or Functions ------- //

    useEffect(() => {
        if (product && type == "edit") {
            setCount(product.count.toString())
        }
    }, [product])

    useEffect(() => {
        if (snackbarMessage != null) {
            setTimeout(() => {
                setSnackbarMessage(null)
            }, 3000)
        }
    }, [snackbarMessage])


    const increase = () => {
        if (!product.StockQty) {
            return setSnackbarMessage({
                variant: "error",
                message: "موجودی کافی نمی باشد."
            })
        }
        setCount(prev => {
            const numCount = Number(prev) + 1
            return numCount.toString()
        })
    }

    const decrease = () => {
        setCount(prev => {
            const numCount = Number(prev) - 1
            if (numCount <= 0) return ""
            return numCount.toString()
        })
    }

    const onOrder = () => {
        const newCount = Number(toEnglishDigits(count))
        if (newCount > product.StockQty) {
            return setSnackbarMessage({
                variant: "error",
                message: "موجودی کافی نمی باشد."
            })
        }
        const currentOrder = realm.objects("Order").filtered(`CustomerID == ${customer.CustomerID}`)[0]
        const data = {
            ...product,
            StockQty: product.StockQty - newCount,
            count: newCount
        }
        //TODO: update and create detail order 
        return

        updateArray(currentOrder.OrderDetail, data).then(() => {
            setCount("")
            onclose()
        })
    }

    const updateOrderDetail = () => {
        const newCount = Number(toEnglishDigits(count))
    }

    const updateProductsRealm = (StockQty) => {
        const currentProduct = realm.objects("Product").filtered(`ProductID == ${product.ProductID}`)[0]
        realm.write(() => {
            currentProduct.StockQty = StockQty
        })
        setCount("")
        onclose()
    }

    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <SafeAreaView style={styles.container}>
                <View>
                    <Header
                        name={title}
                        goBack={() => {
                            onclose()
                            setCount("")
                        }}
                    />
                    <View style={styles.content}>
                        <View style={styles.addToBasketContainer}>
                            <View style={styles.outlineContainer}>
                                <IconButton outline iconName="remove" onPress={decrease} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Input
                                    placeholder="تعداد"
                                    keyboardType="numeric"
                                    value={count}
                                    onChangeText={setCount}
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
                    <FullButton
                        title={type == "create" ? "ثبت" : "ویرایش"}
                        disabled={count != "" ? false : true}
                        onPress={onOrder}
                    />
                </View>

                {snackbarMessage && <Snackbar content={snackbarMessage} />}
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
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