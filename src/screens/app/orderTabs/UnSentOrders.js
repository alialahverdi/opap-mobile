import realm from '../../../model/v1/realmInstance'
import OrderCard from '../../../components/OrderCard'
import OrderTabsCard from '../../../components/OrderCard/OrderTabsCard'
import useSnackbar from '../../../hooks/useSnackbar'
import OrderModal from '../../../components/Modal/OrderModal'
import OrderListModal from '../../../components/Modal/OrderListModal'
import { useIsFocused } from '@react-navigation/native'
import api from '../../../services/axiosInstance'

// create a component
const UnSentOrders = ({ navigation }) => {

    // ------- Constants ------- //
    const isFocused = useIsFocused()
    const { showSnakbar } = useSnackbar()

    // ------- States ------- //
    const [unSentOrders, setUnSentOrders] = useState([])


    // ------- Logic or Functions ------- //
    useEffect(() => {
        if (isFocused) {
            getRealmOrders()
        }
    }, [isFocused])

    const getRealmOrders = () => {
        const orders = realm.objects("Order")
        const realmUnSentOrders = orders.filtered(`isSent == false`)
        setUnSentOrders(realmUnSentOrders)

    }

    const onUpdate = (orderItem) => {
        const customer = JSON.parse(JSON.stringify(orderItem))
        navigation.navigate('CustomerStack', {
            screen: 'OrderScreen',
            params: { customer }
        })
    }

    const deleteOrder = (orderItem) => {
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

    const updateOrder = async (currentOrder) => {
        realm.write(() => {
            currentOrder.isSent = true
        })
    }

    const sendOrder = async (customer) => {

        const data = {
            custID: customer.CustomerID,
            seq: new Date().getTime(),
            orderItem: createOrderItems(customer.OrderDetail)
        }

        api.post('/order/add', data).then(res => {
            updateOrder(customer).then(() => {
                showSnakbar({
                    variant: "success",
                    message: "سفارش با موفقیت ثبت شد."
                })
            })
        }).catch(error => {
            showSnakbar({ variant: "error", message: error.message })
        })
    }

    const showUnSentOrders = ({ item, index }) => {
        return (
            <OrderTabsCard
                unSent
                orderItem={item}
                onDelete={() => deleteOrder(item)}
                onUpdate={() => onUpdate(item)}
                sendOrder={sendOrder}
            />
        )
    }

    return (
        <SafeAreaView>
            <FlatList
                style={{ paddingHorizontal: 10 }}
                data={unSentOrders}
                renderItem={showUnSentOrders}
                keyExtractor={(item, index) => index.toString()}
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
export default UnSentOrders