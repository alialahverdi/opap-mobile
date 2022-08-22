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

    // ------- Constants ------- //
    const initialRender = useRef(true)

    // ------- States ------- //
    const [productSpinner, setProductSpinner] = useState(true)
    const [allProducts, setAllProducts] = useState([])
    const [renderedProducts, setRenderedProducts] = useState([])
    const [searchedProducts, setSearchedProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [previousFilteredProducts, setPreviousFilteredProducts] = useState([])
    const [curentFilteredProducts, setCurentFilteredProducts] = useState([])
    const [searchedProductText, setSearchedProductText] = useState("")
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const [filterTypes, setFilterTypes] = useState([
        {
            name: "موجودی دار",
            isActice: false
        },
        {
            name: "جایزه دار",
            isActice: false
        },
        {
            name: "تجهیزات",
            isActice: false
        },
        {
            name: "مکمل",
            isActice: false
        },
        {
            name: "فرجه +۹۰",
            isActice: false
        },
        {
            name: "کالای جدید",
            isActice: false
        }
    ])

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getRealmProducts()
    }, [])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        } else {
            filterHorizontal()
        }
    }, [filterTypes])

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
        setAllProducts(sentProducts)
        setRenderedProducts(sentProducts)
        setPreviousFilteredProducts(sentProducts)
        setCurentFilteredProducts(sentProducts)
        setIsShowList(true)
        setProductSpinner(false)
        setRefreshing(false)
    }

    const contains = (item, query) => {
        const { ProductName, ProductID } = item;
        const textData1 = query.replace("ي", "ی")
        const textData2 = query.replace("ی", "ي")
        const textData3 = query.replace("ك", "ک")
        const textData4 = query.replace("ک", "ك")
        const formattedQuery = toEnglishDigits(query.toString())
        if (
            ProductName.indexOf(textData1) > -1 ||
            ProductName.indexOf(textData2) > -1 ||
            ProductName.indexOf(textData3) > -1 ||
            ProductName.indexOf(textData4) > -1 ||
            ProductID.toString().includes(formattedQuery)
        ) return true
        return false
    }

    const showProducts = ({ item, index }) => {
        return (
            <ProductCard
                product={item}
                screenType={screenType}
                onPress={() => onPress(item)}
            />
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

    const filterHorizontal = async () => {
        const newSearchedProducts = await getFilteredProducts()
        setFilteredProducts(newSearchedProducts)
        setRenderedProducts(newSearchedProducts)
    }

    const getFilteredProducts = async () => {

        let latestFilteredProducts = searchedProductText !== ""
            ? [...searchedProducts] : [...allProducts]

        if (filterTypes.every(i => !i.isActice)) {
            return allProducts
        }


        if (filterTypes[0].isActice) {
            latestFilteredProducts = latestFilteredProducts.filter(item => item.StockQty > 0)
        }
        if (filterTypes[1].isActice) {
            latestFilteredProducts = latestFilteredProducts.filter(item => item.PromotionDesc.length > 0)
        }
        if (filterTypes[2].isActice) {
            latestFilteredProducts = latestFilteredProducts.filter(item => item.GroupID == 3)
        }
        if (filterTypes[3].isActice) {
            latestFilteredProducts = latestFilteredProducts.filter(item => item.GroupID == 4)
        }
        if (filterTypes[4].isActice) {
            latestFilteredProducts = latestFilteredProducts.filter(item => item.PayDay > 89)
        }
        if (filterTypes[5].isActice) {
            latestFilteredProducts = latestFilteredProducts.filter(item => item.NewProd == 1)
        }

        return latestFilteredProducts
    }

    const onFilter = (selectedIndex) => {

        const cloneFilterTypes = [...filterTypes]

        cloneFilterTypes[selectedIndex].isActice == true
            ? cloneFilterTypes[selectedIndex].isActice = false
            : cloneFilterTypes[selectedIndex].isActice = true

        setFilterTypes(cloneFilterTypes)
    }

    const horizontalRenderItem = ({ item, index }) => {
        return (
            <Ripple
                style={[
                    styles.filterCard,
                    item.isActice && styles.activeChip,
                    index == 0 ? { marginRight: 0 } : { marginRight: 10 }
                ]}
                onPress={() => onFilter(index)}
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
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: "#fff",
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