import Layout from '../../../components/layout'
import api from '../../../services/axiosInstance'
import realm from '../../../model/v1/realmInstance'
import { store } from '../../../model/query'
import SearchbarHeader from '../../../components/general/SearchbarHeader'

// create a component
const Product = ({ navigation }) => {

    // ------- States ------- //
    const [productSpinner, setProductSpinner] = useState(true)
    const [products, setProducts] = useState([])
    const [searchedProductText, setSearchedProductText] = useState("")

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getRealmProducts()
    }, [])

    const getRealmProducts = () => {
        const realmProducts = realm.objects('Product')
        const products = realmProducts.toJSON()
        if (realmProducts.length > 0) {
            setProducts(products)
            setProductSpinner(false)
            return
        };
        getApiProducts()
    }

    const getApiProducts = () => {
        api.get('/product/get').then(res => {
            store(res.content, "Product").then(() => {
                setProducts(products)
                setProductSpinner(false)
            })
        }).catch(() => { })
    }

    const searchProduct = () => {

    }

    return (
        <Layout>
            {productSpinner && (
                <View style={styles.centerScreen}>
                    <ActivityIndicator size="small" color="#6f74dd" />
                </View>
            )}
            {!productSpinner && (
                <>
                    <SearchbarHeader text={searchedProductText} onChangeText={searchProduct} />

                </>
            )}
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
    centerScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

//make this component available to the app
export default Product
