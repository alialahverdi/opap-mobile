const SearchbarHeader = ({ text, onChangeText }) => {


    const changeToPersion = (value) => {
        // const textData1 = value.replace("ي", "ی")
        // const textData2 = textData1.replace("ی", "ي")
        // const textData3 = textData2.replace("ك", "ک")
        // const textData4 = textData3.replace("ک", "ك")
        onChangeText(value)
    }

    return (
        <View style={styles.textInputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder="جست جو"
                value={text}
                onChangeText={changeToPersion}
            />
            <Ionicons
                name="search"
                size={20}
                color="gray"
                style={{ paddingHorizontal: 10 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginHorizontal: 10,
        marginVertical: 5,
        flex: 1
    },
    textInput: {
        ...font.black,
        flex: 1,
        backgroundColor: "transparent",
        paddingHorizontal: 5,
        textAlign: "right",
        fontSize: 13
    },

})

export default SearchbarHeader