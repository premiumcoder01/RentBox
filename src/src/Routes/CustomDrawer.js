import {View, TouchableOpacity, Image, Platform, Text} from 'react-native';
import React from 'react';
import Logo from '../assets/Images/Logo';
import CloseIcon from '../assets/Images/CloseIcon';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Pen from '../assets/Images/ProfileIcons/Pen';
import User from '../assets/Images/ProfileIcons/User';
import Info from '../assets/Images/ProfileIcons/Info';
import Privacy from '../assets/Images/ProfileIcons/Privacy';
import Paper from '../assets/Images/ProfileIcons/Paper';
import Help from '../assets/Images/ProfileIcons/Help';
import EditIcon from '../assets/Images/EditIcon';

const CustomDrawer = props => {
  const navigation = useNavigation();

  const data = [
    {
      icon: <User />,
      title: 'Account',
    },
    {
      icon: <Pen />,
      title: 'Manage Products',
    },
    {
      icon: <Info />,
      title: 'About Us',
    },
    {
      icon: <Privacy />,
      title: 'Privacy Policy',
    },
    {
      icon: <Paper />,
      title: 'Term & Conditions',
    },
    {
      icon: <Help />,
      title: 'Help',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <DrawerContentScrollView {...props} style={{paddingVertical: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <Logo style={{marginLeft: 20}} />
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={
              Platform.OS === 'android'
                ? {elevation: 10, shadowColor: '#000000'}
                : {
                    shadowColor: '#000000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.5,
                  }
            }>
            <Image
              source={require('../assets/Images/img/user.jpg')}
              style={{
                height: 132,
                width: 132,
                borderRadius: 100,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}
            onPress={() => navigation.navigate('Edit Profile')}>
            <EditIcon />
            <Text
              style={{
                color: '#159DEA',
                fontSize: 15,
                fontFamily: 'Poppins-SemiBold',
                marginLeft: 5,
                lineHeight: 22,
                includeFontPadding: true,
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  padding: 8,
                  paddingLeft: 16,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                  borderRadius: 100,
                }}
                key={index}
                onPress={() => navigation.navigate(item.title)}>
                {item.icon}
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 15,
                    fontFamily: 'Poppins-SemiBold',
                    lineHeight: 22,
                    includeFontPadding: true,
                    marginLeft: 15,
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            marginHorizontal: 25,
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
            <Text
              style={{
                color: '#159DEA',
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
              }}>
              FAQ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FollowUs')}>
            <Text
              style={{
                color: '#159DEA',
                fontSize: 14,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Follow Us
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
