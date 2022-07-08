import realm from '../../../model/v1/realmInstance'
import OrderTabsCard from '../../../components/OrderCard/OrderTabsCard'
import { useIsFocused } from '@react-navigation/native'

// create a component
const SentOrders = ({ navigation }) => {

    // ------- Constants ------- //
    const isFocused = useIsFocused()

    // ------- States ------- //
    const [sentOrders, setSentOrders] = useState([])

    // ------- Logic or Functions ------- //
    useEffect(() => {
        if (isFocused) {
            getRealmOrders()
        }
    }, [isFocused])

    const getRealmOrders = () => {
        const orders = realm.objects("Order")
        const realmSentOrders = orders.filtered(`isSent == true`)
        setSentOrders(realmSentOrders)
    }

    const showSentOrders = ({ item, index }) => {
        return (
            <OrderTabsCard
                sent
                orderItem={item}
            />
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