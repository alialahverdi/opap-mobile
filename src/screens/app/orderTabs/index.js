import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsFocused } from '@react-navigation/native';

// Components
import SentOrdersScreen from './SentOrders'
import UnSentOrdersScreen from './UnSentOrders'

const Tab = createMaterialTopTabNavigator()

const OrdertTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="UnSentOrdersScreen"
            screenOptions={{
                tabBarStyle: { backgroundColor: themeColor.primary },
                tabBarLabelStyle: {
                    fontFamily: "IRANSansMobile(FaNum)"
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "rgba(255, 255, 255, .5)",
                tabBarIndicatorStyle: {
                    backgroundColor: '#fff',
                    margin: 1,
                    height: 3,
                    borderRadius: 10
                }
            }}
        >
            <Tab.Screen
                name="UnSentOrdersScreen"
                component={UnSentOrdersScreen}
                options={{
                    tabBarLabel: "ارسال نشده ها"
                }}
            />
            <Tab.Screen
                name="SentOrdersScreen"
                component={SentOrdersScreen}
                options={{
                    tabBarLabel: "ارسال شده ها"
                }}
            />
        </Tab.Navigator>
    );
}

export default OrdertTabs