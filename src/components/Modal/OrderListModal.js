import Header from '../Header'
import OrderCard from '../OrderCard'
import FullButton from '../Button/FullButton'
import api from '../../services/axiosInstance'
import Snackbar from "../../components/Snakbar"

const OrderListModal = ({ visible, onRequestClose, onclose, unSentOrders }) => {

    // ------- States ------- //
    const [error, setError] = useState(null)
    const [completeOrderSpinner, setCompleteOrderSpinner] = useState(false)

    // ------- Logic or Functions ------- //
    const showProducts = ({ item, index }) => {
        return (
            <OrderCard
                product={item}
            />
        )
    }

    const completeOrder = () => {
        setCompleteOrderSpinner(true)
        const data = {
            custID: 220423,
            seq: 1,
            orderItem: [
                {
                    p: 3001017,
                    q: 1
                }
            ]
        }

        api.post('/order/add', data).then(res => {

        }).catch(error => {
            setError({ variant: "error", message: error.message })
            setTimeout(() => {
                setError(null)
            }, 3000)
        }).finally(() => {
            setCompleteOrderSpinner(false)
        })
    }


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

                {error && <Snackbar content={error} />}
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