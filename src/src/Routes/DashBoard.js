import {View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AboutUs,
  Account,
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
import CustomDrawer from './CustomDrawer';
import WholeSaleIcon from '../assets/Images/WholeSaleIcon';
import RentalIcon from '../assets/Images/RentalIcon';
import ChatIcon from '../assets/Images/ChatIcon';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UploadImage from '../screens/ManageProduct/UploadImage';
import AddProduct from '../screens/ManageProduct/AddProduct';
import EditProduct from '../screens/ManageProduct/EditProduct';
import UserInfoEdit from '../screens/Edit Profile/UserInfoEdit';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const DashBoard = props => {
  const hide = props.routeName == 'ChatInbox';

  function HomeStck() {
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
        initialRoutName="Chat"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="ChatInbox" component={ChatInBox} />
      </Stack.Navigator>
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName="OnBoarding"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: 'transparent',
        drawerStyle: {
          width: '00%',
        },
        swipeEnabled: false,
        keyboardDismissMode: 'none',
        headerShown: false,
      }}>
      <Drawer.Screen name="OnBoarding" component={OnBoarding} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="SignUp" component={SignUp} />
      <Drawer.Screen name="ForgetPassword" component={ForgetPassword} />
      <Drawer.Screen name="UserInfoEdit" component={UserInfoEdit} />
      <Drawer.Screen name="OtpVerify" component={Otp} />
      <Drawer.Screen name="Tab">
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
              // component={StackScreen}
              component={HomeStck}
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
              // component={Rental}
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
              // component={Chat}
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
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DashBoard;
