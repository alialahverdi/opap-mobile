import realm from '../../../model/v1/realmInstance'
import OrderCard from '../../../components/OrderCard'
import OrderTabsCard from '../../../components/OrderCard/OrderTabsCard'
import useSnackbar from '../../../hooks/useSnackbar'
import OrderModal from '../../../components/Modal/OrderModal'
import OrderListModal from '../../../components/Modal/OrderListModal'
import { useIsFocused } from '@react-navigation/native'

// create a component
const UnSentOrders = ({ navigation }) => {

    // ------- Constants ------- //
    const isFocused = useIsFocused()
    const { showSnakbar } = useSnackbar()

    // ------- States ------- //
    const [unSentOrders, setUnSentOrders] = useState([])
    const [orderModal, setOrderModal] = useState(false)
    const [isShowOrderListModal, setIsShowOrderListModal] = useState(false)
    const [productObj, setProductObj] = useState({})
    const [unSentOrdersDetail, setUnSentOrdersDetail] = useState([])

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

    const onUpdate = (customer) => {
        // navigation.navigate('OrderScreen')
        // console.log('navigation', navigation.navigate(CustomerStack))
        // const customer = { customer }
        // navigation.navigate('CustomerStack', {
        //     screen: 'OrderScreen',
        //     params: { customer }
        // });
        // console.log('item ======>', orderItem)
        // setUnSentOrdersDetail(orderItem.OrderDetail)
        // setIsShowOrderListModal(true)
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

    const showUnSentOrders = ({ item, index }) => {
        return (
            <OrderTabsCard
                unSent
                orderItem={item}
                onDelete={() => deleteOrder(item)}
                onUpdate={() => onUpdate(item)}
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
            {/* <OrderModal
                type="update"
                visible={orderModal}
                onclose={() => setOrderModal(false)}
                onRequestClose={() => setOrderModal(false)}
                product={productObj}
            /> */}
            <OrderListModal
                type="update"
                title="ویرایش سفارش"
                visible={isShowOrderListModal}
                onclose={() => setIsShowOrderListModal(false)}
                onRequestClose={() => setIsShowOrderListModal(false)}
                product={productObj}
                unSentOrders={unSentOrdersDetail}
                onUpdate={value => {
                    setProductObj(value)
                    setIsShowOrderListModal(false)
                    setOrderModal(true)
                }}
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