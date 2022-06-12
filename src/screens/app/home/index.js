import realm from '../../../model/v1/realmInstance';
import { store } from '../../../model/query';

const array = [
    {
        CustomerID: 120438,
        CustomerName: "داروخانه شبانه روزی ثامن ",
        OwnerName: "دکتر علی اکبر اتحاديه",
        StatusID: 1,
        GroupID: 2,
        GroupName: "خصوصی",
        SubGroupID: 16,
        SubGroupName: "داروخانه",
        Latitute: "35.7389586",
        Longitute: "51.3262204",
        Tell: "44094800",
        Mobile: "0910901045",
        Address: "بزرگراه حکيم غرب - روبروي خ اباذر - ساختمان سپيد ",
        RemAmount: -110417000.0,
        RCheqCount: 0.0,
        RCheqAmount: 0.0,
        HCheqCount: 0.0,
        HCheqAmount: 0.0,
        CountOpen: 1.0,
        StatusName: "فعال"
    },
    {
        "CustomerID": 120474,
        "CustomerName": "داروخانه دکتر آزاده سالم",
        "OwnerName": "آزاده سالم",
        "StatusID": 1,
        "GroupID": 2,
        "GroupName": "خصوصی",
        "SubGroupID": 16,
        "SubGroupName": "داروخانه",
        "Latitute": "35.7222186",
        "Longitute": "51.3333266",
        "Tell": "47908888-44071694",
        "Mobile": "989124808645",
        "Address": "فلکه دوم صادقيه- ابتداي آيت الله کاشاني- ط همکف درمانگاه ش ابن سينا",
        "RemAmount": 0.0,
        "RCheqCount": 0.0,
        "RCheqAmount": 0.0,
        "HCheqCount": 0.0,
        "HCheqAmount": 0.0,
        "CountOpen": 0.0,
        "StatusName": "فعال"
    }
]

// create a component
const Home = ({ navigation }) => {

    // ------- Logic or Functions ------- //
    useEffect(() => {
    }, [])

    return (
        <View style={styles.container}>
            <Text>Home screen</Text>
        </View>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
})

//make this component available to the app
export default Home
