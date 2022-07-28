import Layout from '../Layout'
import api from '../../services/axiosInstance'
import realm from '../../model/v1/realmInstance'
import { storeArray, deleteAllDataFromSchema } from '../../model/query'
import SearchbarHeader from '../SearchbarHeader'
import HorizontalFilter from '../HorizontalFilter'
import ProductCard from '../ProductCard'
import { toEnglishDigits } from '../../utils/numbersUtils'
import Ripple from 'react-native-material-ripple'
import * as Animatable from 'react-native-animatable'


const Products = ({ screenType, onPress, setIsShowList }) => {

    // ------- States ------- //
    const [productSpinner, setProductSpinner] = useState(true)
    const [allProducts, setAllProducts] = useState("")
    const [renderedProducts, setRenderedProducts] = useState([])
    const [searchedProducts, setSearchedProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchedProductText, setSearchedProductText] = useState("")
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const [filterTypes, setFilterTypes] = useState([
        {
            name: "همه",
            isActice: true
        },
        {
            name: "موجودی دار",
            isActice: false
        },
        {
            name: "سفارش دار",
            isActice: false
        },
        {
            name: "فرجه +۹۰",
            isActice: false
        },
        {
            name: "جایزه دار",
            isActice: false
        }
    ])

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getRealmProducts()
    }, [])

    const getRealmProducts = () => {
        const realmProducts = realm.objects("Product")
        const products = JSON.parse(JSON.stringify(realmProducts))
        if (products.length > 0) {
            return setStateProducts(products)
        }
        if (products.length == 0) {
            return getApiProducts()
        }
    }

    const getApiProducts = () => {
        api.get('/product/get').then(res => {
            storeArray(res.content, "Product").then(() => {
                setStateProducts(res.content)
            })
        }).catch(() => { })
    }

    const setStateProducts = (sentProducts) => {
        setRenderedProducts(sentProducts)
        setAllProducts(sentProducts)
        setIsShowList(true)
        setProductSpinner(false)
        setRefreshing(false)
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
        const delayindex = index + 1

        return (
            <Animatable.View
                animation="fadeInUp"
                duration={400}
                delay={delayindex * 100}
                useNativeDriver={true}
            >
                <ProductCard
                    product={item}
                    screenType={screenType}
                    onPress={() => onPress(item)}
                />
            </Animatable.View>

        )
    }

    const searchProduct = (text) => {

        let latestsearchedProducts;

        if (!filterTypes.some(item => item.name == "همه" && item.isActice)) {
            latestsearchedProducts = [...filteredProducts]
        } else {
            latestsearchedProducts = allProducts
        }

        const newSearchedProducts = latestsearchedProducts.filter(item => contains(item, text))
        setSearchedProducts(newSearchedProducts)
        setRenderedProducts(newSearchedProducts)
        setSearchedProductText(text)
    }

    const filterHorizontal = async (filter) => {
        const newSearchedProducts = await getFilteredProducts(filter)
        setFilteredProducts(newSearchedProducts)
        setRenderedProducts(newSearchedProducts)
    }

    const getFilteredProducts = async (filter) => {

        const latestFilteredProducts = searchedProductText !== ""
            ? [...searchedProducts] : [...allProducts]

        if (filter.name.includes("همه")) {
            return latestFilteredProducts
        }

        if (filter.name.includes("موجودی دار")) {
            return latestFilteredProducts.filter(item => item.StockQty > 0)
        }

    }

    const onFilter = (filter, selectedIndex) => {
        filterHorizontal(filter).then((filter) => {
            const cloneFilterTypes = [...filterTypes]
            const changedFilterTypes = cloneFilterTypes.map((item, index) => {
                if (item.isActice) {
                    item.isActice = false
                }
                if (index == selectedIndex) {
                    item.isActice = true
                }
                return item
            })
            setFilterTypes(changedFilterTypes)
        })
    }

    const horizontalRenderItem = ({ item, index }) => {
        return (
            <Ripple
                style={[
                    styles.filterCard,
                    item.isActice && styles.activeChip,
                    index === 0 ? { marginRight: 0 } : { marginRight: 10 }
                ]}
                onPress={() => onFilter(item, index)}
            >
                <Text style={[
                    styles.content,
                    item.isActice && styles.activeText,
                ]}>{item.name}</Text>
            </Ripple>
        )
    }

    const handleRefresh = () => {
        setRefreshing(true)
        api.get('/product/get').then(res => {
            deleteAllDataFromSchema("Product").then(() => {
                storeArray(res.content, "Product").then(() => {
                    setStateProducts(res.content)
                })
            })
        }).catch(() => { })
    }

    const handleLoadMore = () => {
        setPage(prev => prev + 15)
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
                    <View style={{ flexDirection: 'row' }}>
                        <SearchbarHeader text={searchedProductText} onChangeText={searchProduct} />
                    </View>
                    <View>
                        <FlatList
                            style={styles.horizontalContainer}
                            horizontal
                            inverted={true}
                            showsHorizontalScrollIndicator={false}
                            data={filterTypes}
                            renderItem={horizontalRenderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={renderedProducts}
                        renderItem={showProducts}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    // onEndReached={handleLoadMore}
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
    horizontalContainer: {
        marginHorizontal: 10,
        marginVertical: 5,
        paddingRight: 5,
    },
    filterCard: {
        paddingVertical: Platform.OS == "android" ? 5 : 10,
        paddingHorizontal: 12,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    content: {
        ...font.gray,
        fontSize: Platform.OS == "android" ? 12 : 14
    },
    activeChip: {
        borderWidth: .5,
        borderColor: "#0351ff",

    },
    activeText: {
        color: "#0351ff",
    }
})

export default Products