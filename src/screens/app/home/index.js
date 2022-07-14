import { useContext } from 'react'
import realm from '../../../model/v1/realmInstance'
import { store } from '../../../model/query'
import snackbarContext from '../../../contexts/snackbarContext'
import Layout from '../../../components/Layout'
import Pie from 'react-native-pie'
import { View } from 'react-native-animatable'





// create a component
const Home = ({ navigation }) => {

    // const [simsContent, setSimsContent] = useContext(snackbarContext);


    // ------- Logic or Functions ------- //
    useEffect(() => {
    }, [])

    return (
        <Layout containerStyle={styles.container}>
            <ScrollView>
                <View style={styles.workInfo}>
                    <View style={styles.namValue}>
                        <Text style={styles.nameValue}>12</Text>
                        <Text style={styles.nameKey}>تعداد روز سپری شده </Text>
                    </View>
                    <View style={{ alignItems: 'center', }}>
                        <Pie
                            radius={60}
                            innerRadius={45}
                            sections={[
                                {
                                    percentage: 70,
                                    color: '#f00',
                                },
                            ]}
                            backgroundColor="#ddd"
                        />
                        <View style={styles.gauge}>
                            <Text style={styles.nameKey}>روز</Text>
                            <Text style={{ fontSize: 25 }}>11</Text>
                            <Text style={styles.nameKey}>مانده</Text>
                        </View>
                    </View>
                    <View style={styles.namValue}>
                        <Text style={styles.nameValue}>26</Text>
                        <Text style={styles.nameKey}>تعداد روز ماه</Text>
                    </View>
                </View>

                <View style={styles.openOrder}>
                    <View style={styles.header}>
                        <Text style={styles.title}>سفارشات باز</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={styles.nameKey}>ریال</Text>
                            <Text style={styles.valuePerformance}> 250,000  </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                            <Text style={styles.nameKey}>تعداد</Text>
                            <Text style={styles.valuePerformance}> 10  </Text>
                        </View>
                    </View>
                </View>

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
                                        percentage: 30,
                                        color: '#f00',
                                    },
                                    {
                                        percentage: 70,
                                        color: 'green',
                                    },
                                ]}
                                backgroundColor="#ddd"
                            />
                            <View style={styles.gauge}>
                                <Text style={{ fontSize: 20 }}>73%</Text>
                            </View>
                        </View>
                        <View>

                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'flex-end' }}>
                            <View style={{ width: '100%', marginTop: 10 }}>
                                <Text>فاکتور های مرجوعی</Text>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.valuePerformance}>15,000,000  </Text>
                                        <Text style={styles.nameKey}>ریال : </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                        <View style={{ width: 40, alignItems: 'flex-end' }}>
                                            <Text style={styles.valuePerformance}>155 </Text>
                                        </View>
                                        <Text style={styles.nameKey}>تعداد : </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '100%', marginTop: 10 }}>
                                <Text>فاکتور های فروش</Text>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.valuePerformance}>740,000  </Text>
                                        <Text style={styles.nameKey}>ریال : </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                        <View style={{ width: 40, alignItems: 'flex-end' }}>
                                            <Text style={styles.valuePerformance}>2 </Text>
                                        </View>
                                        <Text style={styles.nameKey}>تعداد : </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.sellPerformance}>
                    <Text style={styles.title}>عملکرد ماهانه</Text>
                    <View style={styles.chartAndBack}>
                        <View style={{ alignItems: 'center', }}>
                            <Pie
                                radius={60}
                                innerRadius={45}
                                dividerSize={5}
                                sections={[
                                    {
                                        percentage: 30,
                                        color: '#f00',
                                    },
                                    {
                                        percentage: 70,
                                        color: 'green',
                                    },
                                ]}
                                backgroundColor="#ddd"
                            />
                            <View style={styles.gauge}>
                                <Text style={{ fontSize: 20 }}>73%</Text>
                            </View>
                        </View>
                        <View>

                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'flex-end' }}>
                            <View style={{ width: '100%', marginTop: 10 }}>
                                <Text>فاکتور های مرجوعی</Text>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.valuePerformance}>15,000,000  </Text>
                                        <Text style={styles.nameKey}>ریال : </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                        <View style={{ width: 40, alignItems: 'flex-end' }}>
                                            <Text style={styles.valuePerformance}>155 </Text>
                                        </View>
                                        <Text style={styles.nameKey}>تعداد : </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '100%', marginTop: 10 }}>
                                <Text>فاکتور های فروش</Text>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.valuePerformance}>740,000  </Text>
                                        <Text style={styles.nameKey}>ریال : </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                        <View style={{ width: 40, alignItems: 'flex-end' }}>
                                            <Text style={styles.valuePerformance}>2 </Text>
                                        </View>
                                        <Text style={styles.nameKey}>تعداد : </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.sellPerformance, { marginBottom: 10 }]}>
                    <View>
                        <View>
                            <View>
                                <Text style={styles.title}>فاکتور های باز</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text style={styles.nameKey}>ریال</Text>
                                    <Text style={styles.valuePerformance}> 740,000,000  </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                    <Text style={styles.nameKey}>تعداد</Text>
                                    <Text style={styles.valuePerformance}> 95  </Text>
                                </View>
                            </View>
                            <View style={styles.line} />
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.title}>فاکتور های سر رسید شده</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> 820,000  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> 10  </Text>
                            </View>
                        </View>
                        <View style={styles.line} />
                    </View>
                    <View>
                        <View>
                            <Text style={styles.title}>فاکتور های سر رسید نشده</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.nameKey}>ریال</Text>
                                <Text style={styles.valuePerformance}> 250,000  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Text style={styles.nameKey}>تعداد</Text>
                                <Text style={styles.valuePerformance}> 10  </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 20
    },
    workInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
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
        fontSize: 13
    },
    openOrder: {
        // alignItems: 'flex-end',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        marginTop: 10,
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
        ...font.blackBold
    },
    sellPerformance: {
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        marginTop: 10,
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
})

//make this component available to the app
export default Home
