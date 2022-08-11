// ----------------* React Hooks *----------------
global.React = require("react");
global.Component = React.Component;
global.useState = React.useState;
global.useEffect = React.useEffect;
global.useRef = React.useRef;

// ----------------* React Native Components *----------------
global.ReactNative = require("react-native");
global.SafeAreaView = ReactNative.SafeAreaView;
global.View = ReactNative.View;
global.Text = ReactNative.Text;
global.StyleSheet = ReactNative.StyleSheet;
global.TouchableOpacity = ReactNative.TouchableOpacity;
global.TextInput = ReactNative.TextInput;
global.Platform = ReactNative.Platform;
global.Alert = ReactNative.Alert;
global.ToastAndroid = ReactNative.ToastAndroid;
global.ActivityIndicator = ReactNative.ActivityIndicator;
global.FlatList = ReactNative.FlatList;
global.ScrollView = ReactNative.ScrollView;
global.Modal = ReactNative.Modal;
global.BackHandler = ReactNative.BackHandler;

// ----------------* Icons *----------------
import Ionicons from 'react-native-vector-icons/Ionicons';
global.Ionicons = Ionicons;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
global.MaterialCommunityIcons = MaterialCommunityIcons;



import font from '../constants/fonts';
global.font = font;

// theme
import theme from '../constants/theme';
global.themeColor = theme;
