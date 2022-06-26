import Header from '../Header'
import OrderCard from '../OrderCard'
import FullButton from '../Button/FullButton'
import api from '../../services/axiosInstance'
import Snackbar from "../../components/Snakbar"
import realm from "../../model/v1/realmInstance"
import useSnackbar from '../../hooks/useSnackbar'

const OrderListModal = ({ visible, customer, onRequestClose, onclose, unSentOrders, setUnSentOrders }) => {

    // ------- Constants ------- //
    const { showSnakbar } = useSnackbar()

    // ------- States ------- //
    const [snackbarMessage, setSnackbarMessage] = useState(null)
    const [completeOrderSpinner, setCompleteOrderSpinner] = useState(false)

    // ------- Logic or Functions ------- //
    const showProducts = ({ item, index }) => {
        return (
            <OrderCard
                product={item}
            />
        )
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

    useEffect(() => {
        if (snackbarMessage != null) {
            setTimeout(() => {
                setSnackbarMessage(null)
            }, 3000)
        }
    }, [snackbarMessage])


    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onRequestClose}
            style={{ zIndex: 0 }}
        >
            <SafeAreaView style={styles.container}>
                <View>
                    <Header
                        name="سفارش ها"
                        goBack={onclose}
                    />
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={unSentOrders}
                        renderItem={showProducts}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                {unSentOrders.length > 0 && (
                    <View style={styles.footer}>
                        <FullButton
                            isLoading={completeOrderSpinner}
                            title="تکمیل سفارش"
                            onPress={completeOrder}
                        />
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
        justifyContent: "center",
        marginHorizontal: 15,
        marginBottom: 10
    },
})

export default OrderListModal