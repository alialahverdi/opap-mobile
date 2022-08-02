import { useContext } from 'react'
import realm from '../../../model/v1/realmInstance'
import { store } from '../../../model/query'
import snackbarContext from '../../../contexts/snackbarContext'
import Layout from '../../../components/Layout'
import Pie from 'react-native-pie'
import { View } from 'react-native-animatable'
import { formatNumber } from '../../../utils/numbersUtils'
import api from '../../../services/axiosInstance'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ripple from 'react-native-material-ripple'


// create a component
const Home = ({ navigation }) => {
    const [home, setHome] = useState({});
    const [expanded, setExpanded] = useState(false);
    const [menuHeight, setMenuHeight] = useState(0);
    const [spinner, setSpinner] = useState(false);
    // const [simsContent, setSimsContent] = useContext(snackbarContext);
    const getApiHome = () => {
        api.get('/home/get').then(res => {
            setHome(...res.content)
            setSpinner(true)
            // alert(JSON.stringify(home));
            // console.log('res', res.content);
        }).catch(() => { })
    }

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getApiHome();
    }, [])

    const expandMenu = () => {
        if (expanded) { setMenuHeight(0); }
        else { setMenuHeight(65); }
        setExpanded(!expanded);
    }
    const getDayLeft = () => {
        return home.DayPer !== undefined ? home.DayPer : 0;
    }
    const getTodayPercent = () => {
        return home.TodayPer !== undefined ? home.TodayPer : 0;
    }
    const getMonthPercent = () => {
        return home.MonthPer !== undefined ? home.MonthPer : 0;
    }




    return (
        <Layout containerStyle={styles.container}>
            {!spinner && (
                <View style={styles.centerScreen}>
                    <ActivityIndicator size="small" color="#6f74dd" />
                </View>
            )}
            {spinner && (
                <ScrollView>
                    <View style={styles.workInfo}>
                        <View style={styles.namValue}>
                            <Text style={styles.nameValue}>{home.DayPast}</Text>
                            <Text style={styles.nameKey}>تعداد روز سپری شده </Text>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <Pie
                                radius={60}
                                innerRadius={45}
                                sections={[
                                    {
                                        percentage: getDayLeft(),
                                        color: '#f00',
                                    },
                                ]}
                                backgroundColor="#ddd"
                            />
                            <View style={styles.gauge}>
                                <Text style={styles.nameKey}>روز</Text>
                                <Text style={{ fontSize: 25 }}>{home.DayLeft}</Text>
                                <Text style={styles.nameKey}>مانده</Text>
                            </View>
                        </View>
                        <View style={styles.namValue}>
                            <Text style={styles.nameValue}>{home.DayCount}</Text>
                            <Text style={styles.nameKey}>تعداد روز ماه</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.openOrder} activeOpacity={.4} onPress={() => navigation.navigate('OpenOrders')}>
                        <View style={styles.header}>
                            <Text style={styles.title}>سفارشات باز</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> {formatNumber(home.OrderAmount)} </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> {home.OrderCount}  </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.sellPerformance}>
                        <Text style={styles.title}>عملکرد روزانه</Text>
                        <View style={styles.chartAndBack}>
                            <View style={{ alignItems: 'center', }}>
                                <Pie
                                    radius={60}
                                    innerRadius={45}
                                    dividerSize={5}
                                    sections={[
                                        {
                                            percentage: 100 - getTodayPercent(),
                                            color: '#f00',
                                        },
                                        {
                                            percentage: getTodayPercent(),
                                            color: '#39e600',
                                        },
                                    ]}
                                    backgroundColor="#ddd"
                                />
                                <View style={styles.gauge}>
                                    <Text style={{ fontSize: 20 }}>{getTodayPercent()}%</Text>
                                </View>
                            </View>
                            <View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'flex-end' }}>
                                <View style={{ width: '100%', marginTop: 10 }}>
                                    <Text>فاکتور های فروش</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.valuePerformance}>{formatNumber(home.SalesAmountToday)}  </Text>
                                            <Text style={styles.nameKey}>ریال :</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 8, alignItems: 'center' }}>
                                            <View style={{ width: 40, alignItems: 'flex-end' }}>
                                                <Text style={styles.valuePerformance}>{home.SalesCountToday} </Text>
                                            </View>
                                            <Text style={styles.nameKey}>تعداد :</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '100%', marginTop: 10 }}>
                                    <Text>فاکتور های مرجوعی</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.valuePerformance}>{formatNumber(home.SalesRetAmountToday)} </Text>
                                            <Text style={styles.nameKey}>ریال :</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 8, alignItems: 'center' }}>
                                            <View style={{ width: 40, alignItems: 'flex-end' }}>
                                                <Text style={styles.valuePerformance}>{home.SalesRetCountToday} </Text>
                                            </View>
                                            <Text style={styles.nameKey}>تعداد :</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                        <View style={styles.line2} />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: .5, justifyContent: 'flex-end' }}>

                                <Text style={styles.valuePerformance}>{home.Per0} </Text>
                                <Text style={styles.nameKey}> درصد تحقق : </Text>
                                <Ionicons name="ribbon" size={16} color="#ff6666" />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: .5, justifyContent: 'flex-end' }}>
                                <Text style={styles.valuePerformance}>{formatNumber(home.T0)} </Text>
                                <Text style={styles.nameKey}> هدف روز : </Text>
                                <Ionicons name="pulse" size={16} color="#ff6666" />
                            </View>

                        </View>
                    </View>

                    <TouchableOpacity style={styles.sellPerformance} activeOpacity={.6} onPress={() => expandMenu()}>
                        <Text style={styles.title}>عملکرد ماهانه</Text>
                        <View style={styles.chartAndBack}>
                            <View style={{ alignItems: 'center', }}>
                                <Pie
                                    radius={60}
                                    innerRadius={45}
                                    dividerSize={5}
                                    sections={[
                                        {
                                            percentage: getMonthPercent(),
                                            color: '#ff3333',
                                        },
                                        {
                                            percentage: 100 - getMonthPercent(),
                                            color: '#39e600',
                                        },
                                    ]}
                                    backgroundColor="#ddd"
                                />
                                <View style={styles.gauge}>
                                    <Text style={{ fontSize: 20 }}>{getMonthPercent()}%</Text>
                                </View>
                            </View>
                            <View>

                            </View>
                            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'flex-end' }}>
                                <View style={{ width: '100%', marginTop: 10 }}>
                                    <Text>فاکتور های فروش</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.valuePerformance}>{formatNumber(home.SalesAmountMonth)}   </Text>
                                            <Text style={styles.nameKey}>ریال :</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 8, alignItems: 'center' }}>
                                            <View style={{ width: 40, alignItems: 'flex-end' }}>
                                                <Text style={styles.valuePerformance}>{home.SalesCountMonth} </Text>
                                            </View>
                                            <Text style={styles.nameKey}>تعداد :</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '100%', marginTop: 10 }}>
                                    <Text>فاکتور های مرجوعی</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.valuePerformance}>{formatNumber(home.SalesRetAmountMonth)}  </Text>
                                            <Text style={styles.nameKey}>ریال :</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 8, alignItems: 'center' }}>
                                            <View style={{ width: 40, alignItems: 'flex-end' }}>
                                                <Text style={styles.valuePerformance}>{home.SalesRetCountMonth} </Text>
                                            </View>
                                            <Text style={styles.nameKey}>تعداد :</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                        <View style={styles.line2} />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: .5, justifyContent: 'flex-end' }}>

                                <Text style={styles.valuePerformance}>{home.Per1} </Text>
                                <Text style={styles.nameKey}> درصد تحقق : </Text>
                                <Ionicons name="ribbon" size={16} color="#ff6666" />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: .5, justifyContent: 'flex-end' }}>
                                <Text style={styles.valuePerformance}>{formatNumber(home.T1)} </Text>
                                <Text style={styles.nameKey}> هدف روز : </Text>
                                <Ionicons name="pulse" size={16} color="#ff6666" />
                            </View>

                        </View>
                        <View style={{ height: menuHeight }}>
                            <View style={styles.line2} />
                            <View style={styles.content}>
                                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SalesDaily', { typeid: 4 })}>
                                    <Ionicons name="today-sharp" size={22} color="#0099ff" />
                                    <Text style={styles.textContent}>روزانه</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SalesProduct', { typeid: 3 })}>
                                    <Ionicons name="flask-sharp" size={22} color="#0099ff" />
                                    <Text style={styles.textContent}>محصولات</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SalesSupplier', { typeid: 2 })}>
                                    <Ionicons name="person" size={22} color="#0099ff" />
                                    <Text style={styles.textContent}>تامین کنندگان</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SalesCustomer', { typeid: 1 })}>
                                    <Ionicons name="people-sharp" size={22} color="#0099ff" />
                                    <Text style={styles.textContent}>مشتریان</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={[styles.sellPerformance, { marginBottom: 8 }]}>
                        <Ripple onPress={() => navigation.navigate('OpenFactors', { typeid: 1 })}>
                            <View>
                                <Text style={styles.title}>فاکتور های باز</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text style={styles.nameKey}>ریال</Text>
                                    <Text style={styles.valuePerformance}> {formatNumber(home.SalesOpenAmount)}  </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                    <Text style={styles.nameKey}>تعداد</Text>
                                    <Text style={styles.valuePerformance}> {home.SalesOpenCnt}  </Text>
                                </View>
                            </View>
                            <View style={styles.line} />
                        </Ripple>
                        <Ripple onPress={() => navigation.navigate('OpenFactors', { typeid: 2 })}>
                            <View>
                                <Text style={styles.title}>فاکتور های باز سر رسید شده</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text style={styles.nameKey}>ریال</Text>
                                    <Text style={styles.valuePerformance}> {formatNumber(home.PastSalesOpenAmount)}  </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                    <Text style={styles.nameKey}>تعداد</Text>
                                    <Text style={styles.valuePerformance}> {home.PastSalesOpenCnt}  </Text>
                                </View>
                            </View>
                            <View style={styles.line} />
                        </Ripple>
                        <Ripple onPress={() => navigation.navigate('OpenFactors', { typeid: 3 })}>
                            <View>
                                <Text style={styles.title}>فاکتور های باز سر رسید نشده</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text style={styles.nameKey}>ریال</Text>
                                    <Text style={styles.valuePerformance}> {formatNumber(home.NextSalesOpenAmount)}  </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                    <Text style={styles.nameKey}>تعداد</Text>
                                    <Text style={styles.valuePerformance}> {home.NextSalesOpenCnt}  </Text>
                                </View>
                            </View>
                            <View style={styles.line} />
                        </Ripple>
                        <Ripple onPress={() => navigation.navigate('OpenFactors', { typeid: 4 })}>
                            <View>
                                <Text style={styles.title}>فاکتور های باز نقدی 1 روزه</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text style={styles.nameKey}>ریال</Text>
                                    <Text style={styles.valuePerformance}> {formatNumber(home.OneSalesOpenAmount)}  </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                    <Text style={styles.nameKey}>تعداد</Text>
                                    <Text style={styles.valuePerformance}> {home.OneSalesOpenCnt}  </Text>
                                </View>
                            </View>
                        </Ripple>
                    </View>
                </ScrollView>
            )}
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 20
    },
    centerScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    workInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 4,
        marginTop: 10,
        marginHorizontal: 10,
        padding: 5,
        shadowColor: "gray",
        shadowOpacity: .5,
    },
    workInfoDetail: {
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    gauge: {
        position: 'absolute',
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // alignItems: ''
        // backgroundColor: 'yellow'
    },
    namValue: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'red'
    },

    nameValue: {
        ...font.blackBold,
        fontSize: 25
    },
    nameKey: {
        ...font.gray,
        fontSize: 11
    },
    openOrder: {
        // alignItems: 'flex-end',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        marginTop: 8,
        marginHorizontal: 10,
        padding: 10,
        shadowColor: "gray",
        shadowOpacity: .5,
    },
    body: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'flex-end',
    },
    left: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: 'yellow',
    },
    right: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: 'green'
    },
    title: {
        ...font.blackBold,
        fontSize: 12
    },
    sellPerformance: {
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        marginTop: 8,
        marginHorizontal: 10,
        padding: 10,
        shadowColor: "gray",
        shadowOpacity: .5,
    },
    chartAndBack: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    valuePerformance: {
        ...font.blackBold,
        fontSize: 16
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#E0DEDE',
        marginVertical: 5
    },
    line2: {
        height: 1,
        backgroundColor: '#f0f1f3',
        marginRight: 15,
        marginTop: 10
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 8,
    },
    item: {

        justifyContent: "center",
        alignItems: "center"
    },
    textContent: {
        ...font.gray,
        fontSize: 12,
        marginTop: 6
    }
})

//make this component available to the app
export default Home
