import realm from '../../../model/v1/realmInstance'
import OrderCard from '../../../components/OrderCard'

// create a component
const UnSentOrders = ({ navigation }) => {
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

    const showSentOrders = ({ item, index }) => {
        return (
            <OrderCard
                product={item}
            />
        )
    }

    return (
        <SafeAreaView>
            <Text>ارسال نشده ها</Text>
            {/* <FlatList
                style={{ paddingHorizontal: 10 }}
                data={sentOrders}
                renderItem={showSentOrders}
                keyExtractor={(item, index) => index.toString()}
            /> */}
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