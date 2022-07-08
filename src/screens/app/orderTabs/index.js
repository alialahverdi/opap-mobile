import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsFocused } from '@react-navigation/native';

// Components
import SentOrdersScreen from './SentOrders'
import UnSentOrdersScreen from './UnSentOrders'

const Tab = createMaterialTopTabNavigator()

const OrdertTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="SentOrdersScreen"
            screenOptions={{
                tabBarLabelStyle: {
                    fontFamily: "IRANSansMobile(FaNum)"
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