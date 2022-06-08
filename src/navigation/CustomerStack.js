import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// Screens
import Customer from '../screens/app/customer';

// Transition for navigate between screen
const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS,
    // gestureEnabled: true,
};


// Create stack fro screens
const Stack = createStackNavigator();

function CustomerStack() {
    return (
        <Stack.Navigator
            headerMode='none'
            screenOptions={TransitionScreenOptions}
        >
            <Stack.Screen name="Customer" component={Customer} />
        </Stack.Navigator>
    )
}

export default CustomerStack;