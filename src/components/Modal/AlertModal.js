import { forwardRef } from 'react'
import Modal from 'react-native-modal'
import Ripple from 'react-native-material-ripple'
import FullButton from '../Button/FullButton'



const AlertModal = forwardRef((props, ref) => {

    const { isShowModal, hideModal, cancel, newOrder } = props

    return (
        <Modal
            ref={ref}
            backdropOpacity={.4}
            useNativeDriver={true}
            animationIn="fadeInUp"
            animationOut="fadeOutDown"
            swipeDirection="down"
            animationOutTiming={400}
            animationInTiming={400}
            isVisible={isShowModal}
            onBackdropPress={hideModal}
            onBackButtonPress={hideModal}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Ripple
                        onPress={hideModal}>
                        <Ionicons
                            name="ios-close"
                            style={{ color: '#fff', fontSize: 30, padding: 5 }}
                        />
                    </Ripple>
                    <Text style={styles.title}>سفارش تکراری</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.description}>شما یک سفارش تکراری دارید آیا مایل به ساخت سفارش جدید هستید؟</Text>
                    <View style={styles.actions}>
                        <View>
                            <FullButton
                                isLoading={false}
                                title="انصزاف"
                                containerStyle={styles.cancel}
                                onPress={cancel}
                            />
                        </View>
                        <View>
                            <FullButton
                                isLoading={false}
                                title="سفارش جدید"
                                onPress={newOrder}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

    )
})


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 5
        // textAlign: ''
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        height: 40,
        backgroundColor: themeColor.primary,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    title: {
        ...font.whiteBold,
        fontSize: 20
    },
    body: {
        backgroundColor: '#fff',
        padding: 10,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    description: {
        ...font.black,
        textAlign: 'right',
        marginTop: 10
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: '#fff',
        // height: 60,
        // paddingHorizontal: 25,
        marginTop: 20
    },
    cancel: {
        backgroundColor: 'red'
    }
})

export default AlertModal