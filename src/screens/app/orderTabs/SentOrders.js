import realm from '../../../model/v1/realmInstance'
import OrderTabsCard from '../../../components/OrderCard/OrderTabsCard'
import { useIsFocused } from '@react-navigation/native'
import OrderListModal from '../../../components/Modal/OrderListModal'
import useSnackbar from '../../../hooks/useSnackbar'
import api from '../../../services/axiosInstance'
import * as Animatable from 'react-native-animatable'

// create a component
const SentOrders = ({ navigation }) => {

    // ------- Constants ------- //
    const isFocused = useIsFocused()
    const { showSnakbar } = useSnackbar()

    // ------- States ------- //
    const [sentOrders, setSentOrders] = useState([])
    const [isShowOrderListModal, setIsShowOrderListModal] = useState(false)
    const [orderDetail, setOrderDetail] = useState([])

    // ------- Logic or Functions ------- //
    useEffect(() => {
        if (isFocused) {
            getRealmOrders()
        }
    }, [isFocused])

    const getRealmOrders = () => {
        const orders = realm.objects("Order")
        const realmUnSentOrders = orders.filtered(`isSent == true`)
        setSentOrders(realmUnSentOrders)
    }

    const deleteOrder = (orderItem) => {
        setOrderDetail([])
        const orders = realm.objects("Order")
        const currentOrder = orders.filtered(`OrderID == '${orderItem.OrderID}'`)[0]
        realm.write(() => {
            realm.delete(currentOrder)
        })
        showSnakbar({
            variant: "success",
            message: "سفارش با موفقیت حذف شد."
        })
    }

    const createOrderItems = (orderDetails) => {
        return orderDetails.map(item => {
            return {
                p: item.ProductID,
                q: item.count
            }
        })
    }

    const againeSendOrder = async (customer) => {
        const data = {
            custID: customer.CustomerID,
            seq: new Date().getTime(),
            orderItem: createOrderItems(customer.OrderDetail)
        }

        await api.post('/order/add', data).then(res => {
            showSnakbar({
                variant: "success",
                message: "ارسال مجدد سفارش با موفقیت ثبت شد."
            })
        }).catch(error => {
            showSnakbar({ variant: "error", message: error.message })
        })
    }

    const showSentOrders = ({ item, index }) => {
        const delayindex = index + 1

        return (
            <Animatable.View
                animation="fadeInUp"
                duration={400}
                delay={delayindex * 100}
                useNativeDriver={true}

            >
                <OrderTabsCard
                    sent
                    orderItem={item}
                    onDelete={() => deleteOrder(item)}
                    onUpdate={() => {
                        setOrderDetail(item.OrderDetail)
                        setIsShowOrderListModal(true)
                    }}
                    sendOrder={againeSendOrder}
                />
            </Animatable.View>

        )
    }

    return (
        <SafeAreaView>
            <FlatList
                style={{ paddingHorizontal: 10 }}
                data={sentOrders}
                renderItem={showSentOrders}
                keyExtractor={(item, index) => index.toString()}
            />
            <OrderListModal
                type="show"
                title="جزییات سفارش"
                visible={isShowOrderListModal}
                onclose={() => setIsShowOrderListModal(false)}
                onRequestClose={() => setIsShowOrderListModal(false)}
                orders={orderDetail}
            />
        </SafeAreaView>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
})

//make this component available to the app
export default SentOrders