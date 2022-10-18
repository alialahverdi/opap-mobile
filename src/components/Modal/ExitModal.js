import { useEffect, useState } from 'react'
import Modal from 'react-native-modal'


const ExitModal = ({ navigation }) => {

    const [isShowModal, setIsShowModal] = useState(true)

    return (
        <Modal
            backdropOpacity={.4}
            useNativeDriver={true}
            animationIn="fadeInUp"
            animationOut="fadeOutDown"
            swipeDirection="down"
            animationOutTiming={400}
            animationInTiming={400}
            isVisible={isShowModal}
            onBackdropPress={() => {
                setIsShowModal(false)
                navigation.goBack()
            }}
            onBackButtonPress={() => {
                setIsShowModal(false)
                navigation.goBack()
            }}
        >
            <View style={styles.container}>
                <Text>Modal</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 5
    },
})

export default ExitModal