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
import Header from '../../../components/Header'
import { StackActions } from '@react-navigation/native'
const Info = ({ route, navigation }) => {
    const [info, setInfo] = useState({});
    const customerObj = route.params.customer
    const getApiInfo = () => {
        api.get('/customer/data', { params: { customerid: customerObj.CustomerID } }).then(res => {
            setInfo(...res.content)
            // alert(JSON.stringify(info));
        }).catch(() => { })
    }

    // ------- Logic or Functions ------- //
    useEffect(() => {
        getApiInfo();
    }, [])

    return (
        <Layout containerStyle={styles.container}>
            <Header
                title="آنالیز مشتری"
                // goBack={() => navigation.dispatch(StackActions.replace("CustomerScreen"))}
                goBack={() => navigation.goBack()}
           />
            <ScrollView>

                <View style={styles.dateStyle}>
                    <View style={{ flex: .5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.nameKey}>اولین خرید</Text>
                        <Text style={styles.dateFont}>{info.FirstDate} </Text>
                    </View>
                    <View style={{ flex: .5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.nameKey}>آخرین خرید</Text>
                        <Text style={styles.dateFont}>{info.LastDate} </Text>
                    </View>
                </View>

                <View style={styles.sellPerformance}>
                    <Text style={styles.title}>عملکرد خرید</Text>
                    <View style={styles.chartAndBack}>
                        <View style={{ alignItems: 'center', }}>
                            <Pie
                                radius={60}
                                innerRadius={45}
                                dividerSize={5}
                                sections={[
                                    {
                                        percentage:info.PerSales !== undefined ? info.PerSales : 0, 
                                        color: '#f00',
                                    },
                                    {
                                        percentage:  100-(info.PerSales !== undefined ? info.PerSales : 0),
                                        color: '#39e600',
                                    },
                                ]}
                                backgroundColor="#ddd"
                            />
                            <View style={styles.gauge}>
                                <Text style={{ fontSize: 20 }}>{100-info.PerSales}%</Text>
                            </View>
                        </View>
                        <View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'flex-end' }}>
                            <View style={{ width: '100%', marginTop: 10 }}>
                                <Text>فاکتور های فروش</Text>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.valuePerformance}>{formatNumber(info.SalesAmount)}  </Text>
                                        <Text style={styles.nameKey}>ریال :</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: 8, alignItems: 'center' }}>
                                        <View style={{ width: 40, alignItems: 'flex-end' }}>
                                            <Text style={styles.valuePerformance}>{info.SalesCnt} </Text>
                                        </View>
                                        <Text style={styles.nameKey}>تعداد :</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '100%', marginTop: 10 }}>
                                <Text>فاکتور های مرجوعی</Text>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.valuePerformance}>{formatNumber(info.RetAmount)} </Text>
                                        <Text style={styles.nameKey}>ریال :</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: 8, alignItems: 'center' }}>
                                        <View style={{ width: 40, alignItems: 'flex-end' }}>
                                            <Text style={styles.valuePerformance}>{info.RetCnt} </Text>
                                        </View>
                                        <Text style={styles.nameKey}>تعداد :</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>


                <View style={[styles.sellPerformance, { marginBottom: 8 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('OpenFactorScreen', {customer:customerObj, typeid: 1})}>
                        <View>
                            <Text style={styles.title}>فاکتور های باز</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> {formatNumber(info.SalesOpenAmount)}  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> {info.SalesOpenCnt}  </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('OpenFactorScreen', {customer:customerObj, typeid: 2})}>
                        <View>
                            <Text style={styles.title}>فاکتور های باز سر رسید شده</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> {formatNumber(info.PastSalesOpenAmount)}  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> {info.PastSalesOpenCnt}  </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('OpenFactorScreen', {customer:customerObj, typeid: 3})}>
                        <View>
                            <Text style={styles.title}>فاکتور های باز سر رسید نشده</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> {formatNumber(info.NextSalesOpenAmount)}  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> {info.NextSalesOpenCnt}  </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('OpenFactorScreen', {customer:customerObj, typeid: 4})}>
                        <View>
                            <Text style={styles.title}>فاکتور های باز نقدی 1 روزه</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> {formatNumber(info.OneSalesOpenAmount)}  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> {info.OneSalesOpenCnt}  </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.sellPerformance}>
                    <Text style={styles.title}>رویکرد نوع پرداخت</Text>

                    <View style={[styles.chartAndBack,{flexDirection:'row'}]}>
                        <View style={{ alignItems: 'center', }}>
                            <Pie
                               radius={80}
                               sections={[
                                 {
                                   percentage:info.CheqPer !== undefined ? info.CheqPer : 0,
                                   color: '#C70039',
                                 },
                                 {
                                   percentage:info.CashPer !== undefined ? info.CashPer : 0,
                                   color: '#44CD40',
                                 },
                                 {
                                   percentage:info.FishPer !== undefined ? info.FishPer : 0, 
                                   color: '#404FCD',
                                 },
                                 {
                                   percentage:info.PosPer !== undefined ? info.PosPer : 0,
                                   color: '#EBD22F',
                                 },
                               ]}
                               strokeCap={'butt'}
                            /></View>
                            <View style={{ flex: 0.5, justifyContent: 'center'}}>
                        <View style={{ width: '100%', marginTop: 10 }}>
                            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'flex-end'}}>
                                <Text style={{ ...font.blackBold, color: '#C70039', fontSize: 14}}>چک {info.CheqPer} % </Text>
                                <Text style={[styles.circle,{color:'#C70039'}]}>⬤</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'flex-end'}}>
                                <Text style={{ ...font.blackBold, color: '#44CD40', fontSize: 14}}>نقد {info.CashPer} % </Text>
                                <Text style={[styles.circle,{color:'#44CD40'}]}>⬤</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'flex-end'}}>
                                <Text style={{ ...font.blackBold, color: '#404FCD', fontSize: 14}}>فیش {info.FishPer} % </Text>
                                <Text style={[styles.circle,{color:'#404FCD'}]}>⬤</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'flex-end'}}>
                                <Text style={{ ...font.blackBold, color: '#EBD22F', fontSize: 14}}>واریزی {info.PosPer} % </Text>
                                <Text style={[styles.circle,{color:'#EBD22F'}]}>⬤</Text>
                            </View>
                        </View>
                    </View>
                    </View>
                    
                </View>
                <View style={[styles.sellPerformance, { marginBottom: 8 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('OpenFactors', { typeid: 2 })}>
                        <View>
                            <Text style={styles.title}>چک های نزد بانک</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> {formatNumber(info.CheqInBankAmount)}  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> {info.CheqInBankCnt}  </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('OpenFactors', { typeid: 2 })}>
                        <View>
                            <Text style={styles.title}>چک های نزد صندوق</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> {formatNumber(info.CheqInCashAmount)}  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> {info.CheqInCashCnt}  </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('OpenFactors', { typeid: 3 })}>
                        <View>
                            <Text style={styles.title}>چک های برگشتی</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> {formatNumber(info.CheqRetAmount)}  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> {info.CheqRetCnt}  </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('OpenFactors', { typeid: 3 })}>
                        <View>
                            <Text style={styles.title}>چک های حقوقی</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> {formatNumber(info.CheqHAmount)}  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> {info.CheqHCnt}  </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('OpenFactors', { typeid: 3 })}>
                        <View>
                            <Text style={styles.title}>چک های خرج شده (در جریان)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> {formatNumber(info.CheqKHAmount)}  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> {info.CheqKHCnt}  </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Layout>
    )

}

// define your styles
const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 20
    },circle :{
        height : 30 ,
        width :30,
        borderRadius: 1000,
        fontSize:20,
        
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
    dateStyle: {
        flexDirection: 'row',
        // backgroundColor: '#cce6ff',
        borderRadius: 5,
        elevation: 5,
        marginTop: 8,
        marginHorizontal: 5,
        padding: 10,
        shadowColor: "gray",
        shadowOpacity: .5,
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
        marginTop: 5,
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
    dateFont: {
        ...font.blackBold,
        color: '#0066ff',
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
export default Info
