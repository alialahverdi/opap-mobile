import Layout from '../Layout'
import api from '../../services/axiosInstance'
import realm from '../../model/v1/realmInstance'
import { storeArray } from '../../model/query'
import SearchbarHeader from '../SearchbarHeader'
import HorizontalFilter from '../HorizontalFilter'
import ProductCard from '../ProductCard'
import { toEnglishDigits } from '../../utils/numbersUtils'
import Ripple from 'react-native-material-ripple'


const Products = ({ screenType, OnOrder, setIsShowList }) => {

    // ------- States ------- //
    const [productSpinner, setProductSpinner] = useState(true)
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(0)
    const [searchedProducts, setSearchedProducts] = useState([])
    const [searchedProductText, setSearchedProductText] = useState("")
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
        // const slicedProducts = products.slice(page, page + 15)
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
                const slicedProducts = res.content.slice(page, page + 15)
                setStateProducts(slicedProducts)
            })
        }).catch(() => { })
    }

    const setStateProducts = (sentProducts) => {
        setProducts(prev => [
            ...prev,
            ...sentProducts
        ])
        setSearchedProducts(sentProducts)
        setIsShowList(true)
        setProductSpinner(false)
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

    const handleLoadMore = () => {
        setPage(prev => prev + 15)
    }

    const searchProduct = (text, horizontal = false) => {
        const oldSearchedProducts = [...searchedProducts]

        const isNotHorizontal = filterTypes.some(item => item.name == "همه" && item.isActice)



        let newSearchedProducts;

        if (isNotHorizontal) {
            newSearchedProducts = oldSearchedProducts.filter(item => contains(item, text))
        } else {
            newSearchedProducts = products.filter(item => contains(item, text))
        }

        if (horizontal) {
            return newSearchedProducts
        }
        setProducts(newSearchedProducts)
        setSearchedProductText(text)
    }

    const filterHorizontal = async (filter) => {
        const newSearchedProducts = await filteredProducts(filter)
        // console.log('newSearchedProducts', newSearchedProducts)
        setProducts(newSearchedProducts)
    }

    const filteredProducts = async (filter) => {
        const oldSearchedProducts = [...searchedProducts]

        if (filter.name.includes("همه")) {
            if (searchedProductText !== "") {
                return searchProduct(searchedProductText, true)
            }
            return oldSearchedProducts
        }

        if (filter.name.includes("موجودی دار")) {
            if (searchedProductText !== "") {
                return products.filter(item => item.StockQty > 0)
            }
            return oldSearchedProducts.filter(item => item.StockQty > 0)
        }
    }

    const onFilter = (filter, renderIndex) => {
        filterHorizontal(filter).then(() => {
            const cloneFilterTypes = [...filterTypes]
            const changedFilterTypes = cloneFilterTypes.map((item, index) => {
                if (item.isActice) {
                    item.isActice = false
                }
                if (index == renderIndex) {
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
                        data={products}
                        renderItem={showProducts}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={handleLoadMore}
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
        marginVertical: 10,
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