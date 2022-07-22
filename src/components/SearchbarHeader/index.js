const SearchbarHeader = ({ text, onChangeText }) => {
    return (
        <View style={styles.textInputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder="جست جو"
                value={text}
                onChangeText={onChangeText}
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