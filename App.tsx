/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CameraScreen} from './src/page/CameraScreen';
import {PermissionsPage} from './src/page/PremissionPage';
import {Camera} from 'react-native-vision-camera';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import type {Routes} from './src/page/Routes';
import {MediaPage} from './src/page/MediaPage';
import {CodeScannerPage} from './src/page/CodeScannerPage';
import {pickFile, read} from '@dr.pogodin/react-native-fs';
import JPush from 'jpush-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';

import {store} from './src/store/redux/store';
import FavoritesContextProvider from './src/store/context/favorites-context';
import MealsOverviewScreen from './src/page/MealsOverviewScreen';
import MetalDetailScreen from './src/page/MealDetailScreen';
import CategoriesScreen from './src/page/CategoriesScreen';
import SettingScreen from './src/page/SettingScreen';
function HomeStackScreen() {
  const Tab = createBottomTabNavigator();
  const tabBarIconInit = useCallback(route => {
    return ({
      focused,
      color,
      size,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }) => {
      let iconName = 'home';

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'List') {
        iconName = focused ? 'list' : 'list-outline';
      } else if (route.name === 'Setting') {
        iconName = focused ? 'settings' : 'settings-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    };
  }, []);
  return (
    <Tab.Navigator
      initialRouteName={'MroHome'}
      screenOptions={({route}) => ({
        tabBarIcon: (() => tabBarIconInit(route))(),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="List" component={CategoriesScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}

function CameraStackScreen() {
  const CameraStack = createNativeStackNavigator();
  return (
    <CameraStack.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
      })}
      initialRouteName="Camera">
      <CameraStack.Screen name="Camera" component={CameraScreen} />
      <CameraStack.Screen name="MediaPage" component={MediaPage} />
      <CameraStack.Screen name="CodeScannerPage" component={CodeScannerPage} />
    </CameraStack.Navigator>
  );
}
function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const openCamera = useCallback(async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();
    console.log(
      `Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission}`,
    );
    if (cameraPermission !== 'granted' || microphonePermission !== 'granted') {
      navigation.navigate('PermissionsPage');
    } else {
      navigation.navigate('MroCamera', {screen: 'Camera'});
    }
  }, [navigation]);

  const readFile = useCallback(async () => {
    const res = await pickFile();
    Alert.alert(`Picked ${res.length} file(s)`, res.join('; '));

    for (let i = 0; i < res.length; ++i) {
      const begin = await read(res[0]!, 10);
      Alert.alert(`File #{i + 1} starts with`, begin);
    }
  }, []);
  const scane = useCallback(async () => {
    navigation.navigate('MroCamera', {screen: 'CodeScannerPage'});
  }, [navigation]);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.sectionTitle}>MroApp</Text>
      </View>
      <Button title="打开相机" onPress={() => openCamera()} />
      <Button title="读取文件" onPress={() => readFile()} />

      <Button title="扫描二维码" onPress={() => scane()} />
    </ScrollView>
  );
}
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
const Stack = createNativeStackNavigator<Routes>();
function App(): React.JSX.Element {
  useEffect(() => {
    JPush.init({
      appKey: '02c7f79c9248ecadf25140f7',
      channel: 'dev',
      production: 1,
    });
    //连接状态
    const connectListener = result => {
      console.log('connectListener:' + JSON.stringify(result));
    };
    //通知回调
    const notificationListener = result => {
      console.log('notificationListener:' + JSON.stringify(result));
    };
    //本地通知回调
    const localNotificationListener = result => {
      console.log('localNotificationListener:' + JSON.stringify(result));
    };
    //tag alias事件回调
    const tagAliasListener = result => {
      console.log('tagAliasListener:' + JSON.stringify(result));
    };
    //手机号码事件回调
    const mobileNumberListener = result => {
      console.log('mobileNumberListener:' + JSON.stringify(result));
    };
    JPush.addConnectEventListener(connectListener);
    JPush.addNotificationListener(notificationListener);
    JPush.addLocalNotificationListener(localNotificationListener);
    JPush.addTagAliasListener(tagAliasListener);
    JPush.addMobileNumberListener(mobileNumberListener);
  }, []);
  return (
    <Provider store={store}>
      <FavoritesContextProvider>
        <NavigationContainer>
          <GestureHandlerRootView style={styles.root}>
            <Stack.Navigator>
              <Stack.Screen name="MroHome" component={HomeStackScreen} />
              <Stack.Screen name="MroCamera" component={CameraStackScreen} />
              <Stack.Screen
                name="MealsOverview"
                component={MealsOverviewScreen}
              />
              <Stack.Screen
                name="MealDetail"
                component={MetalDetailScreen}
                options={{
                  title: 'Meal Detail',
                }}
              />
              <Stack.Screen
                name="PermissionsPage"
                component={PermissionsPage}
              />
            </Stack.Navigator>
          </GestureHandlerRootView>
        </NavigationContainer>
      </FavoritesContextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
