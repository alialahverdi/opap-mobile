import { forwardRef } from 'react'

const Input = forwardRef((props, ref) => {
    const { value, onChangeText, ...rest } = props

    return (
        <TextInput
            ref={ref}
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            {...rest}
        />
    )
})

const styles = StyleSheet.create({
    textInput: {
        ...font.gray,
        flex: 1,
        height: 40,
        borderWidth: .5,
        borderColor: "gray",
        padding: 10,
        textAlign: "right",
        borderRadius: 5,
    },
})

export default Input