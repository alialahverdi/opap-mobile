import { StatusBar } from 'react-native'

const Layout = ({ children, containerStyle }) => {
    return (
        <SafeAreaView style={[styles.container, containerStyle]}>
            <StatusBar backgroundColor={themeColor.primary} />
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColor.background
    }
})

export default Layout;