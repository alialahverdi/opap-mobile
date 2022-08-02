import Layout from '../../../components/Layout'
import Header from '../../../components/Header'
import Ripple from 'react-native-material-ripple'


// create a component
const OpenFactor = ({ navigation, route }) => {

    // ------- Constants ------- //
    const { openFactor } = route.params

    // ------- States ------- //
    const [factors, setFactors] = useState(openFactor.factors)

    const selectFactor = (factor, index) => {
        const cloneFactors = [...factors]
        cloneFactors[index].selected = cloneFactors[index].selected === false ? true : false
        setFactors(cloneFactors)
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
                            <Text>{item.SalesDate} </Text>
                            <Text>تاریخ  :</Text>
                        </View>
                        <View style={styles.infoContaierText}>
                            <Text>{item.SalesNo} </Text>
                            <Text>شماره  :</Text>
                        </View>
                    </View>
                    <View style={[styles.info, { marginVertical: 10 }]}>
                        <View style={styles.infoContaierText}>
                            <Text>{item.RemAmount}</Text>
                            <Text>مانده فاکتور :</Text>
                        </View>
                        <View style={styles.infoContaierText}>
                            <Text>{item.NetAmount} </Text>
                            <Text>خالص فاکتور :</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.infoContaierText}>
                            <Text>{item.PayDate}</Text>
                            <Text>تاریخ باز پرداخت:</Text>
                        </View>
                        <View style={styles.infoContaierText}>
                            <Text>{item.PayDay} </Text>
                            <Text>مدت باز پرداخت:</Text>
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
                </View>
                <View style={styles.body}>
                    <FlatList
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
        paddingHorizontal: 10
    },
    haeder: {
        // backgroundColor: 'yellow',
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
        flexGrow: 1
    },
    footer: {
        // backgroundColor: 'blue',
    }
})

//make this component available to the app
export default OpenFactor
