import realm from '../../../model/v1/realmInstance'
import OrderCard from '../../../components/OrderCard'
import OrderTabsCard from '../../../components/OrderCard/OrderTabsCard'
import useSnackbar from '../../../hooks/useSnackbar'

// create a component
const UnSentOrders = () => {
    // ------- Constants ------- //
    const { showSnakbar } = useSnackbar()

    // ------- States ------- //
    const [unSentOrders, setUnSentOrders] = useState([])

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getRealmOrders()
    }, [])

    const getRealmOrders = () => {
        const orders = realm.objects("Order")
        const realmUnSentOrders = orders.filtered(`isSent == false`)
        setUnSentOrders(realmUnSentOrders)
    }

    const deleteOrder = (orderItem) => {
        const orders = realm.objects("Order")
        let currentOrder = orders.filtered(`OrderID == '${orderItem.OrderID}'`)[0]
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