import Layout from '../../../components/Layout'
import Header from '../../../components/Header'
import Ripple from 'react-native-material-ripple'
import { formatNumber } from '../../../utils/numbersUtils'


// create a component
const OpenFactor = ({ navigation, route }) => {

    // ------- Constants ------- //
    const { openFactor } = route.params

    // ------- States ------- //
    const [factors, setFactors] = useState(openFactor.factors)
    const [sumFactor, setSumFactor] = useState(0)
    const [sumPayDay, setSumPayDay] = useState(0)
    const [sumPayDayDate, setSumPayDayDate] = useState(0)

    // ------- Logic or Functions ------- //

    const selectFactor = (factor, index) => {
        const cloneFactors = [...factors]
        cloneFactors[index].selected = cloneFactors[index].selected === false ? true : false
        getSumFactor(cloneFactors)
        getSumPayDay(cloneFactors)
        setFactors(cloneFactors)
    }

    const getSumFactor = (newFactors) => {
        const selectedFactors = newFactors.filter((i) => i.selected)
        const prices = selectedFactors.map((i) => i.RemAmount)
        if (prices.length === 0) {
            return setSumFactor(0)
        }
        const reducer = (accumulator, curr) => accumulator + curr;
        const total = prices.reduce(reducer)
        setSumFactor(total)
    }

    const getSumPayDay = (newFactors) => {
        const selectedFactors = newFactors.filter((i) => i.selected)

        const up = selectedFactors.map((i) => i.RemAmount * i.MDay)
        const down = selectedFactors.map((i) => i.RemAmount)

        if (up.length === 0) {
            setSumPayDayDate(0)
            return setSumPayDay(0)
        }

        const reducer = (accumulator, curr) => accumulator + curr;
        const sumUp = up.reduce(reducer)
        const sumDown = down.reduce(reducer)

        const dayRoss = Math.round(sumUp / sumDown)
        getPayDayDate(dayRoss)
        setSumPayDay(dayRoss)
    }

    const miladi_be_shamsi = (gy, gm, gd) => {
        var g_d_m, jy, jm, jd, gy2, days;
        g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        gy2 = (gm > 2) ? (gy + 1) : gy;
        days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
        jy = -1595 + (33 * ~~(days / 12053));
        days %= 12053;
        jy += 4 * ~~(days / 1461);
        days %= 1461;
        if (days > 365) {
            jy += ~~((days - 1) / 365);
            days = (days - 1) % 365;
        }
        if (days < 186) {
            jm = 1 + ~~(days / 31);
            jd = 1 + (days % 31);
        } else {
            jm = 7 + ~~((days - 186) / 30);
            jd = 1 + ((days - 186) % 30);
        }
        return [jy + '/' + jm + '/' + jd];
    }

    const getPayDayDate = (dayRoss) => {
        const today = new Date()
        let specialDateMiladi = new Date()
        specialDateMiladi.setDate(today.getDate() + dayRoss)
        const x = specialDateMiladi.toISOString()
        let date_convert_y = parseInt(x.substr(0, 4));
        let date_convert_m = parseInt(x.substr(5, 2));
        let date_convert_d = parseInt(x.substr(8, 2));
        setSumPayDayDate(miladi_be_shamsi(date_convert_y, date_convert_m, date_convert_d))
    }

    const renderFactor = ({ item, index }) => {
        return (
            <Ripple
                style={styles.factorContainer}
                onPress={() => selectFactor(item, index)}
            >
                <View style={styles.leftFactor}>
                    <View style={styles.info}>
                        <View style={styles.infoContaierText}>
                            <Text style={styles.value}>{item.SalesDate} </Text>
                            <Text style={styles.key}>تاریخ :</Text>
                        </View>
                        <View style={styles.infoContaierText}>
                            <Text style={styles.value}>{item.SalesNo} </Text>
                            <Text style={styles.key}>شماره :</Text>
                        </View>
                    </View>
                    <View style={[styles.info, { marginVertical: 5 }]}>
                        <View style={styles.infoContaierText}>
                            <Text style={styles.value}>{formatNumber(item.RemAmount)} </Text>
                            <Text style={styles.key}>مانده فاکتور :</Text>
                        </View>
                        <View style={styles.infoContaierText}>
                            <Text style={styles.value}>{formatNumber(item.NetAmount)} </Text>
                            <Text style={styles.key}>خالص فاکتور :</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.infoContaierText}>
                            <Text style={styles.value}>{item.PayDate}</Text>
                            <Text style={styles.key}>تاریخ باز پرداخت :</Text>
                        </View>
                        <View style={styles.infoContaierText}>
                            <Text style={styles.value}>{item.PayDay} </Text>
                            <Text style={styles.key}>مدت باز پرداخت :</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.rightFactor}>
                    <Ionicons
                        name={item.selected ? "checkbox-outline" : "square-outline"}
                        size={22}
                        color="#0351ff"
                    />
                </View>
            </Ripple>
        )
    }

    return (
        <Layout>
            <Header
                title="فاکتور باز"
                goBack={() => navigation.goBack()}
            />
            <View style={styles.container}>
                <View style={styles.haeder}>
                    <Text style={styles.customerName}>
                        {openFactor.CustomerID} - {openFactor.CustomerName}
                    </Text>
                    <View style={styles.infoOpenFactorContainer}>
                        <View style={styles.infoOpenFactor}>
                            <Text style={styles.toman}>تومان</Text>
                            <Text style={styles.infoNumber}>{formatNumber(sumFactor)} </Text>
                            <Text style={styles.infoLabel}>جمع مانده :</Text>
                        </View>
                        <View style={styles.rasContainer}>
                            <View style={styles.infoOpenFactor}>
                                <Text style={styles.infoNumber}>{sumPayDayDate} </Text>
                                <Text style={styles.infoLabel}>راس (تاریخ) :</Text>
                            </View>
                            <View style={styles.infoOpenFactor}>
                                <Text style={styles.infoNumber}>{sumPayDay} </Text>
                                <Text style={styles.infoLabel}>راس (روز) :</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={factors}
                        renderItem={renderFactor}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </Layout>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        flex: 1,
        // paddingHorizontal: 10
    },
    haeder: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 10
    },
    factorContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 10,
        marginBottom: 5
        // padingVertical: 10
    },
    leftFactor: {
        // backgroundColor: 'red',
        flex: 9
    },
    rightFactor: {
        flex: 1,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    customerName: {
        ...font.black,
        fontSize: 15,
        color: "#18277a",
        marginBottom: Platform.OS == "ios" ? 10 : 10,
        textAlign: 'right'
    },
    info: {
        flexDirection: 'row',
        // marginTop: 10
    },
    infoContaierText: {
        flex: .5,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    body: {
        flexGrow: 1,
        // backgroundColor: 'red',
        // paddingHorizontal: 10,
        paddingBottom: 20
    },
    infoOpenFactorContainer: {
        alignItems: "flex-end",
        // justifyContent: "flex-end",
        // backgroundColor: 'red',
        marginTop: 5
    },
    infoOpenFactor: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: "50%"
        // backgroundColor: 'red',
    },
    infoLabel: {
        ...font.black,
        color: "gray",
        fontSize: Platform.OS == "android" ? 12 : 16
    },
    infoNumber: {
        ...font.black,
        color: "#FF5733",
        fontSize: Platform.OS == "android" ? 18 : 20
    },
    toman: {
        ...font.gray,
        color: "#FF5733",
        fontSize: 8,
        marginRight: 5
    },
    rasContainer: {
        marginTop: 5,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    value: {
        ...font.black,
        color: "#2367ff",
        fontSize: Platform.OS == "android" ? 14 : 16
    },
    key: {
        ...font.black,
        color: "gray",
        fontSize: Platform.OS == "android" ? 12 : 14
    },
    footer: {
        // backgroundColor: 'blue',
    }
})

//make this component available to the app
export default OpenFactor
