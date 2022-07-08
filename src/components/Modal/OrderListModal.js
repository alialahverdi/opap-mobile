import { memo } from 'react'
import Header from '../Header'
import OrderCard from '../OrderCard'
import FullButton from '../Button/FullButton'
import api from '../../services/axiosInstance'
import Snackbar from "../../components/Snakbar"
import realm from "../../model/v1/realmInstance"
import useSnackbar from '../../hooks/useSnackbar'
import { formatNumber } from '../../utils/numbersUtils'

const OrderListModal = ({
    type,
    title,
    visible,
    customer,
    onRequestClose,
    onclose,
    unSentOrders,
    setUnSentOrders,
    onUpdate
}) => {

    // ------- Constants ------- //
    const { showSnakbar } = useSnackbar()

    // ------- States ------- //
    const [snackbarMessage, setSnackbarMessage] = useState(null)
    const [completeOrderSpinner, setCompleteOrderSpinner] = useState(false)

    // ------- Logic or Functions ------- //
    useEffect(() => {
        if (snackbarMessage != null) {
            setTimeout(() => {
                setSnackbarMessage(null)
            }, 3000)
        }
    }, [snackbarMessage])

    const showOrderDetails = ({ item, index }) => {
        return (
            <OrderCard
                product={item}
                onUpdate={() => onUpdate(item)}
                onDelete={() => onDelete(item)}
            />
        )
    }

    const onDelete = (currentOrderDetail) => {
        realm.write(() => {
            realm.delete(currentOrderDetail)
        })
        setSnackbarMessage({
            variant: "success",
            message: "سفارش با موفقیت حذف شد."
        })
    }

    const createOrderItems = () => {
        return unSentOrders.map(item => {
            return {
                p: item.ProductID,
                q: item.count
            }
        })
    }

    const completeOrder = () => {
        setCompleteOrderSpinner(true)

        const currentOrder = realm.objects("Order").filtered(`CustomerID == ${customer.CustomerID}`)[0]
        if (currentOrder.isSent) {
            setSnackbarMessage({
                variant: "error",
                message: "این سفارش قبلا ثبت شده است."
            })
            return setCompleteOrderSpinner(false)
        }

        const data = {
            custID: customer.CustomerID,
            seq: new Date().getTime(),
            orderItem: createOrderItems()
        }

        api.post('/order/add', data).then(res => {
            updateOrder(currentOrder).then(() => {
                setUnSentOrders([])
                onclose()
                showSnakbar({
                    variant: "success",
                    message: "سفارش با موفقیت ثبت شد."
                })
            })
        }).catch(error => {
            setSnackbarMessage({ variant: "error", message: error.message })
        }).finally(() => {
            setCompleteOrderSpinner(false)
        })
    }

    const updateOrder = async (currentOrder) => {
        realm.write(() => {
            currentOrder.isSent = true
        })
    }

    const factorSum = () => {
        const prices = unSentOrders.map((i) => i.SalesPrice * i.count)
        const reducer = (accumulator, curr) => accumulator + curr;
        const total = prices.reduce(reducer)
        return total
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
                        goBack={onclose}
                    />
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={unSentOrders}
                        renderItem={showOrderDetails}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                {unSentOrders.length > 0 && type === "create" && (
                    <View style={styles.footer}>
                        <View>
                            <FullButton
                                isLoading={completeOrderSpinner}
                                title="تکمیل سفارش"
                                onPress={completeOrder}
                            />
                        </View>
                        <View>
                            <View style={styles.totalContainer}>
                                <Text style={styles.toman}>تومان</Text>
                                <Text style={styles.totalText}>{formatNumber(factorSum())}</Text>
                            </View>
                            {/* <Text>right</Text> */}
                        </View>
                    </View>
                )}

                {snackbarMessage && <Snackbar content={snackbarMessage} />}
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#f0f1f3'
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#fff',
        height: 60,
        elevation: 5,
        paddingHorizontal: 25
    },
    totalText: {
        ...font.black,
        color: "#2367ff",
        fontSize: Platform.OS == "android" ? 20 : 20
    },
    toman: {
        ...font.black,
        color: "#2367ff",
        fontSize: 12,
        marginRight: 5,
        marginTop: 7
    },
    totalContainer: {
        flexDirection: "row",
    }
})

export default OrderListModal