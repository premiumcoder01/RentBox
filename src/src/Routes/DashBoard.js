import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Account,
  Chat,
  ForgetPassword,
  Home,
  Login,
  Notification,
  OnBoarding,
  Rental,
  SignUp,
  Wholesale,
} from '../screens';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeIcon from 'react-native-vector-icons/Entypo';
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import CustomDrawer from './CustomDrawer';
import Logo from '../assets/Images/Logo';
import WholeSaleIcon from '../assets/Images/WholeSaleIcon';
import RentalIcon from '../assets/Images/RentalIcon';
import SearchIcon from '../assets/Images/SearchIcon';
import ChatIcon from '../assets/Images/ChatIcon';
import StackScreen from './StackScreen';
import Otp from '../screens/Otp/Otp';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const DashBoard = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="OnBoarding"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: 'transparent',
        drawerStyle: {
          width: '0%',
        },
        swipeEnabled: false,
        keyboardDismissMode: 'none',
        headerShown: false,
      }}>
      <Drawer.Screen name="OnBoarding" component={OnBoarding} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="SignUp" component={SignUp} />
      <Drawer.Screen name="ForgetPassword" component={ForgetPassword} />
      <Drawer.Screen name="OtpVerify" component={Otp} />
      <Drawer.Screen name="Tab">
        {() => (
          <Tab.Navigator
            initialRouteName="Main"
            screenOptions={{
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
                height: 70,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              },
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <View>
                  <TouchableOpacity
                    style={{marginLeft: 15}}
                    onPress={() => {
                      navigation.navigate('SearchScreen');
                    }}>
                    <SearchIcon />
                  </TouchableOpacity>
                </View>
              ),
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: 20,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Notification')}>
                    <Icon name="notifications" color={'#159DEA'} size={25} />
                  </TouchableOpacity>
                </View>
              ),
              headerTitle: () => {
                return <Logo />;
              },
              tabBarBackground: () => {
                {
                  <View
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 12,
                      },
                      shadowOpacity: 0.58,
                      shadowRadius: 16.0,
                      elevation: 24,
                    }}
                  />;
                }
              },
            }}>
            <Tab.Screen
              name="Home"
              component={StackScreen}
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
              component={Rental}
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
              component={Chat}
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
              }}
            />
            <Tab.Screen
              name="Account"
              component={Account}
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
