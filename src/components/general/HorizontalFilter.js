const HorizontalFilter = ({ data }) => {

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={.6} style={styles.filterCard}>
                <Text>{item}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                inverted={true}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    filterCard: {
        padding: 10,
        marginLeft: 10,
        borderRadius: 5,
        // borderWidth: .5,
        backgroundColor: '#fff'
    }
})

export default HorizontalFilter