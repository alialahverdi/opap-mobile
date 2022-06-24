// Load required Components and Packegs 
import "./src/utils/Global"

// Register react navigation in app
import 'react-native-gesture-handler'

// Navigator
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Stacks and Screen
import SplashScreen from './src/screens/splash'
import AuthStack from './src/navigation/AuthStack'
import AppStack from './src/navigation/AppStack'

// Wrapper Components
import SnakbarProvider from "./src/components/Snakbar/SnakbarProvider"
import ErrorHandler from "./src/components/ErrorHandler"



// Create stack fro all screens
const Stack = createStackNavigator()

const Root = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <SnakbarProvider>
        <Root />
      </SnakbarProvider>
    </NavigationContainer>
  )
}
export default App;
