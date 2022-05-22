// Load required Components and Packegs 
import "./src/utils/Global";

// Register react navigation in app
import 'react-native-gesture-handler';

// Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Stacks and Screen
import SplashScreen from './src/screens/splash';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';


// Create stack fro all screens
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppStack" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
