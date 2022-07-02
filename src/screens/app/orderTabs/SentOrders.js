import realm from '../../../model/v1/realmInstance'
import OrderCard from '../../../components/OrderCard'

// create a component
const SentOrders = ({ navigation }) => {
    // ------- States ------- //
    const [sentOrders, setSentOrders] = useState([])

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getRealmOrders()
    }, [])

    const getRealmOrders = () => {
        const orders = realm.objects("Order")
        const realmSentOrders = orders.filtered(`isSent == true`)
        setSentOrders(realmSentOrders)
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
            <Text>ارسال شده ها</Text>
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
export default SentOrders