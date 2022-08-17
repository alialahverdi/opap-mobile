import Ripple from 'react-native-material-ripple'

const HorizontalFilter = ({ onPress }) => {

    // ------- States ------- //
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
    const onFilter = (filter, renderIndex) => {
        onPress(filter).then(() => {
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

    const renderItem = ({ item, index }) => {
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
        <View style={styles.container}>
            <FlatList
                horizontal
                inverted={true}
                showsHorizontalScrollIndicator={false}
                data={filterTypes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 10,
        paddingRight: 5,
        // backgroundColor: 'red'
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

export default HorizontalFilter