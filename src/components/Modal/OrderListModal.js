import Header from '../Header'
import OrderCard from '../OrderCard'

const OrderListModal = ({ visible, onRequestClose, onclose, unSentOrders }) => {

    const showProducts = ({ item, index }) => {
        return (
            <OrderCard
                product={item}
            />
        )
    }


    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <SafeAreaView style={styles.container}>
                <Header
                    name="سفارش ها"
                    goBack={onclose}
                />
                <FlatList
                    style={{ paddingHorizontal: 10 }}
                    data={unSentOrders}
                    renderItem={showProducts}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f1f3'
    }
})

export default OrderListModal