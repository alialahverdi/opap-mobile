import Layout from '../Layout'
import api from '../../services/axiosInstance'
import realm from '../../model/v1/realmInstance'
import { storeArray } from '../../model/query'
import SearchbarHeader from '../SearchbarHeader'
import HorizontalFilter from '../HorizontalFilter'
import ProductCard from '../ProductCard'
import { toEnglishDigits } from '../../utils/numbersUtils'

const filterTypes = ['موجودی دار', 'سفارش دار', 'فرجه +۹۰', 'جایزه دار', 'موجودی دار', 'سفارش دار', 'فرجه +۹۰', 'جایزه دار']

const Products = ({ screenType, OnOrder, setIsShowList }) => {

    // ------- States ------- //
    const [productSpinner, setProductSpinner] = useState(true)
    const [products, setProducts] = useState([])
    const [searchedProducts, setSearchedProducts] = useState([])
    const [searchedProductText, setSearchedProductText] = useState("")

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getRealmProducts()
    }, [])

    const getRealmProducts = () => {
        const realmProducts = realm.objects("Product")
        const products = realmProducts.toJSON()
        if (realmProducts.length > 0) {
            setProducts(products)
            setSearchedProducts(products)
            setIsShowList(true)
            setProductSpinner(false)
            return
        };
        getApiProducts()
    }

    const getApiProducts = () => {
        api.get('/product/get').then(res => {
            storeArray(res.content, "Product").then(() => {
                setProducts(res.content)
                setSearchedProducts(res.content)
                setIsShowList(true)
                setProductSpinner(false)
            })
        }).catch(() => { })
    }

    const searchProduct = (text) => {
        const oldSearchedProducts = [...searchedProducts]
        const newSearchedProducts = oldSearchedProducts.filter(item => {
            // return item.CustomerName.toLowerCase().match(text)
            return contains(item, text)
        });
        setProducts(newSearchedProducts)
        setSearchedProductText(text)
    }

    const contains = (item, query) => {
        const { ProductName, ProductID } = item;
        const formattedQuery = toEnglishDigits(query.toString())
        if (
            ProductName.includes(query) ||
            ProductID.toString().includes(formattedQuery)
        ) return true
        return false
    }

    const showProducts = ({ item, index }) => {
        return (
            <ProductCard
                product={item}
                screenType={screenType}
                OnOrder={OnOrder}
            />
        )
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
                    <HorizontalFilter data={filterTypes} />
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={products}
                        renderItem={showProducts}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </>
            )}
        </Layout>
    )
}

const styles = StyleSheet.create({
    centerScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Products