import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CameraIcon from '../../assets/Images/ProfileIcons/CameraIcon';
import PassWordIcon from '../../assets/Images/ProfileIcons/PassWordIcon';
import Location from '../../assets/Images/ProfileIcons/LocationIcon';
import PhoneIcon from '../../assets/Images/ProfileIcons/PhoneIcon';
import EmailIcon from '../../assets/Images/ProfileIcons/EmailIcon';

import Pen from '../../assets/Images/ProfileIcons/Pen';
import Paper from '../../assets/Images/ProfileIcons/Paper';
import Privacy from '../../assets/Images/ProfileIcons/Privacy';
import Info from '../../assets/Images/ProfileIcons/Info';
import Help from '../../assets/Images/ProfileIcons/Help';
import WishList from '../../assets/Images/ProfileIcons/WishList';
import Header from '../../components/Header';

const Account = () => {
  const navigation = useNavigation();
  const data = [
    {
      icon: <EmailIcon />,
      title: 'Email',
      value: 'angelina@gmail.com',
    },
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      value: '+123-123-1234',
    },
    {
      icon: <Location />,
      title: 'Address',
      value: '1301 Lamy Ln, Monroe, Louisiana...',
    },
    {
      icon: <PassWordIcon />,
      title: 'Password',
      value: '**********',
    },
  ];

  const Menu = [
    {
      icon: <Pen />,
      title: 'Manage Products',
    },
    {
      icon: <WishList />,
      title: 'My Wishlist',
    },
    {
      icon: <Paper />,
      title: 'Term & Conditions',
    },
    {
      icon: <Privacy />,
      title: 'Privacy Policy',
    },
    {
      icon: <Info />,
      title: 'About Us',
    },
    {
      icon: <Help />,
      title: 'Help (Support)',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />

      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 70}}>
        {/* header */}
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={20} color="#159DEA" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: '#159DEA',
              borderRadius: 13,
              paddingHorizontal: 12,
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={() => navigation.navigate('Edit Profile')}>
            <Icon name="edit" size={10} color="#fff" style={{marginRight: 5}} />
            <Text
              style={{
                fontSize: 11,
                fontFamily: 'Poppins-Regular',
                color: '#fff',
              }}>
              Edit profile
            </Text>
          </TouchableOpacity>
        </View>
        {/* profile pic */}
        <View style={{position: 'relative', alignSelf: 'center'}}>
          <View
            style={{
              borderRadius: 100,
              borderWidth: 4,
              borderColor: 'white',
              overflow: 'hidden',
              elevation: 5,
            }}>
            <Image
              source={require('../../assets/Images/img/user.jpg')}
              style={{
                height: 100,
                width: 100,
              }}
            />
          </View>
        </View>
        <Text
          style={{
            color: '#000000',
            fontStyle: 'Poppins-SemiBold',
            textAlign: 'center',
            marginVertical: 15,
            fontSize: 17,
            fontWeight: 'bold',
          }}>
          Angelina Jolie
        </Text>

        {/* fields */}
        <View style={{marginHorizontal: 20, paddingBottom: 20}}>
          {data.map(item => {
            return (
              <View
                style={{
                  padding: 8,
                  paddingHorizontal: 10,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#EBEBEB',
                  borderRadius: 100,
                  marginBottom: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {item.icon}
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: 'Poppins-Regular',
                      marginLeft: 10,
                      // fontWeight: 500,
                    }}>
                    {item.title}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#8E8E8E',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 11,
                  }}>
                  {item.value}
                </Text>
              </View>
            );
          })}

          {/* menu-list */}
          <View
            style={{
              padding: 8,
              marginTop: 20,
              backgroundColor: '#EAF1F5',
              borderRadius: 25,
            }}>
            {Menu.map(item => {
              return (
                <TouchableOpacity
                  style={{
                    padding: 8,
                    backgroundColor: '#fff',
                    borderRadius: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                  onPress={() => navigation.navigate(item.title)}>
                  {item.icon}
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: 'Poppins-SemiBold',
                      marginLeft: 12,
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
