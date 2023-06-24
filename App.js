import './ignoreWarnings';
import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import MainRoutes from './src/Routes/MainRoutes';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';
import {StripeProvider} from '@stripe/stripe-react-native';

const APP_ID = 'b00faf62-d933-443b-b03a-a9813b30799c';
const SENDER_ID = '1088833333526';

import {LogBox} from 'react-native';
import {Provider} from 'react-native-paper';
import DashBoard from './src/src/Routes/DashBoard';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ref = createNavigationContainerRef();
const App = () => {
  const [routeName, setRouteName] = useState();
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message

  LogBox.ignoreAllLogs(); //Ignore all log notifications

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(APP_ID);

    OneSignal.getDeviceState().then(async res => {
      // console.log(res);
      // await AsyncStorage.setItem('pushObj', JSON.stringify(res));
    });

    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();

        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );
  }, [OneSignal]);

  const userDetail = async () => {
    const user = await AsyncStorage.getItem('userDetail');
    console.log('user ka info h re baba', user);
  };

  useEffect(() => {
    SplashScreen.hide();
    userDetail();
  }, []);

  const config = {
    screens: {
      ProductView: {
        path: 'ProductView/:itemId',
      },
    },
  };

  return (
    <StripeProvider
      publishableKey="pk_live_51MjgxiFMffulFtJ3CRsCWGYV8eFc8vntRz5uDIo4asyWlkvZDvcBNkmAlOCRjuVlFgsGNKSsqJ7lOpBsqkZA76Wr00SxBhA65V"
      urlScheme="your-url-scheme"
      // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}"
      // required for Apple Pay
    >
      <Provider>
        <NavigationContainer
          ref={ref}
          onReady={() => {
            setRouteName(ref.getCurrentRoute().name);
          }}
          onStateChange={async () => {
            const previousRouteName = routeName;
            const currentRouteName = ref.getCurrentRoute().name;
            setRouteName(currentRouteName);
          }}>
          <StatusBar backgroundColor="#159DEA" />
          {/* <MainRoutes /> */}
          <DashBoard routeName={routeName} />
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
};

export default App;
