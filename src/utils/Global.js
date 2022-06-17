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
global.StatusBar = ReactNative.StatusBar;
global.TextInput = ReactNative.TextInput;
global.Platform = ReactNative.Platform;
global.Alert = ReactNative.Alert;
global.ToastAndroid = ReactNative.ToastAndroid;
global.ActivityIndicator = ReactNative.ActivityIndicator;
global.FlatList = ReactNative.FlatList;
global.ScrollView = ReactNative.ScrollView;
global.Modal = ReactNative.Modal;
global.Pressable = ReactNative.Pressable;

// ----------------* Icons *----------------
import Ionicons from 'react-native-vector-icons/Ionicons';
global.Ionicons = Ionicons;


import font from '../constants/fonts';
global.font = font;
