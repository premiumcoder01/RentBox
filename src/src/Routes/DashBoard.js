import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AboutUs,
  Account,
  ChangePassword,
  Chat,
  ChatInBox,
  EditProfile,
  FAQ,
  FollowUs,
  ForgetPassword,
  Help,
  Home,
  Login,
  ManageProduct,
  Notification,
  OnBoarding,
  Otp,
  PrivacyPolicy,
  ProductDetail,
  Rental,
  SearchScreen,
  SignUp,
  TermsConditions,
  Wholesale,
  WishList,
} from '../screens';
import HomeIcon from 'react-native-vector-icons/Entypo';
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import WholeSaleIcon from '../assets/Images/WholeSaleIcon';
import RentalIcon from '../assets/Images/RentalIcon';
import ChatIcon from '../assets/Images/ChatIcon';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UploadImage from '../screens/ManageProduct/UploadImage';
import AddProduct from '../screens/ManageProduct/AddProduct';
import EditProduct from '../screens/ManageProduct/EditProduct';
import UserInfoEdit from '../screens/Edit Profile/UserInfoEdit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import dynamicLinks from '@react-native-firebase/dynamic-links';
import SplashScreen from 'react-native-splash-screen';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Stack1 = createNativeStackNavigator();
const DashBoard = props => {
  const hide = props.routeName == 'ChatInbox';
  const navigation = useNavigation();
  const [firstScreen, setFirstScreen] = useState('');
  const [loading, setLoading] = useState(true);

  const handleDynamicLink = link => {
    if (link !== null) {
      console.log('deeplink foreground', link);
      const product_name = link.url.split('api/')[1];
      navigation.navigate('Home', {
        screen: 'ProductDetail',
        params: {
          item: product_name,
        },
      });
    }
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link !== null) {
          console.log('deeplink background', link);
          const product_name = link.url.split('api/')[1];
          console.log(product_name)
          navigation.navigate('Home', {
            screen: 'ProductDetail',
            params: {
              item: product_name,
            },
          });
        }
      });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('userInfo')
      .then(data => {
        setFirstScreen(data ? 'Tab' : 'OnBoarding');
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setFirstScreen('OnBoarding');
      });
  }, []);

  function HomeStack() {
    return (
      <Stack.Navigator
        initialRoutName="MainScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainScreen" component={Home} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    );
  }

  function RentalStack() {
    return (
      <Stack.Navigator
        initialRoutName="Rental"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Rental" component={Rental} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    );
  }

  function AccountStack() {
    return (
      <Stack.Navigator
        initialRoutName="Account"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="About Us" component={AboutUs} />
        <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
        <Stack.Screen name="Term & Conditions" component={TermsConditions} />
        <Stack.Screen name="Help (Support)" component={Help} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="FollowUs" component={FollowUs} />
        <Stack.Screen name="My Wishlist" component={WishList} />
        <Stack.Screen name="Manage Products" component={ManageProduct} />
        <Stack.Screen name="UploadImage" component={UploadImage} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
      </Stack.Navigator>
    );
  }

  function ChatStack() {
    return (
      <Stack.Navigator
        initialRoutName="ChatList"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="ChatList" component={Chat} />
        <Stack.Screen name="ChatInbox" component={ChatInBox} />
      </Stack.Navigator>
    );
  }

  if (loading) {
    return null;
  }

  return (
    <>
      <Stack1.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={firstScreen}>
        <Stack1.Screen name="OnBoarding" component={OnBoarding} />
        <Stack1.Screen name="SignUp" component={SignUp} />
        <Stack1.Screen name="Login" component={Login} />
        <Stack1.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack1.Screen name="UserInfoEdit" component={UserInfoEdit} />
        <Stack1.Screen name="OtpVerify" component={Otp} />
        <Stack1.Screen name="ChangePassword" component={ChangePassword} />
        <Stack1.Screen name="Tab">
          {() => (
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarLabelStyle: {
                  fontSize: 10,
                  fontFamily: 'Poppins-SemiBold',
                  color: '#000000',
                  marginBottom: 2,
                },
                tabBarStyle: {
                  position: 'absolute',
                  bottom: 0,
                  height: 75,
                  borderTopRightRadius: 30,
                  borderTopLeftRadius: 30,
                },
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerTitleAlign: 'center',
              }}>
              <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                  tabBarIcon: ({focused}) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          padding: 10,
                          borderWidth: 1,
                          borderRadius: 100,
                          backgroundColor: focused ? '#159DEA' : '#fff',
                          borderColor: focused ? '#159DEA' : '#222222',
                          opacity: focused ? 1 : 0.2,
                        }}>
                        <HomeIcon
                          name="home"
                          size={17}
                          color={focused ? '#fff' : '#222222'}
                        />
                      </View>
                    );
                  },
                }}
              />

              <Tab.Screen
                name="Rental"
                component={RentalStack}
                options={{
                  tabBarIcon: ({focused}) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          padding: 10,
                          borderWidth: 1,
                          borderRadius: 100,
                          backgroundColor: focused ? '#33AD66' : '#fff',
                          borderColor: focused ? '#33AD66' : '#222222',
                          opacity: focused ? 1 : 0.2,
                        }}>
                        <RentalIcon color={focused ? '#fff' : '#222222'} />
                      </View>
                    );
                  },
                }}
              />
              <Tab.Screen
                name="Wholesale"
                component={Wholesale}
                options={{
                  tabBarIcon: ({focused}) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          padding: 8,
                          paddingVertical: 10,
                          borderWidth: 1,
                          borderRadius: 100,
                          backgroundColor: focused ? '#159DEA' : '#fff',
                          borderColor: focused ? '#159DEA' : '#222222',
                          opacity: focused ? 1 : 0.2,
                        }}>
                        <WholeSaleIcon color={focused ? '#fff' : '#222222'} />
                      </View>
                    );
                  },
                }}
              />
              <Tab.Screen
                name="Chat"
                component={ChatStack}
                options={{
                  tabBarIcon: ({focused}) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          padding: 10,
                          borderWidth: 1,
                          borderRadius: 100,
                          backgroundColor: focused ? '#159DEA' : '#fff',
                          borderColor: focused ? '#159DEA' : '#222222',
                          opacity: focused ? 1 : 0.2,
                        }}>
                        <ChatIcon color={focused ? '#fff' : '#222222'} />
                      </View>
                    );
                  },
                  tabBarStyle: {
                    position: 'absolute',
                    bottom: hide ? -300 : 0,
                    height: 75,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                  },
                }}
              />
              <Tab.Screen
                name="Account"
                // component={Account}
                component={AccountStack}
                options={{
                  tabBarIcon: ({focused}) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          padding: 10,
                          borderWidth: 1,
                          borderRadius: 100,
                          backgroundColor: focused ? '#159DEA' : '#fff',
                          borderColor: focused ? '#159DEA' : '#222222',
                          opacity: focused ? 1 : 0.2,
                        }}>
                        <UserIcon
                          name="user-alt"
                          size={17}
                          color={focused ? '#fff' : '#222222'}
                        />
                      </View>
                    );
                  },
                }}
              />
            </Tab.Navigator>
          )}
        </Stack1.Screen>
      </Stack1.Navigator>
    </>
  );
};

export default DashBoard;
