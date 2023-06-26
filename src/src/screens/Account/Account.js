import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
import FollowIcon from '../../assets/Images/ProfileIcons/FollowIcon';
import Faq from '../../assets/Images/ProfileIcons/Faq';
import LogoutIcon from '../../assets/Images/ProfileIcons/LogoutIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../constant/Loader';
import {GetApi} from '../../utils/Api';

const Account = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const getProfile = id => {
    setLoading(true);
    GetApi(`getProfileById?id=${id}`).then(
     async res => {
        setLoading(false);
        if (res.status == 200) {
          console.log(res.data);
          setUserDetail(res.data);
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };

  const getuserDetail = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    console.log('USER : ', JSON.parse(user).user_id);
    console.log(user.length);
    if (user && user.length > 0) {
      // setShowDetail(true);
      getProfile(JSON.parse(user).user_id);
    } else {
      // setShowDetail(false);
    }
  };

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      getuserDetail();
    });
    return () => {
      willFocusSubscription;
      setUserDetail({});
    };
  }, []);

  console.log('+++++++', userDetail);

  const data = [
    {
      icon: <EmailIcon />,
      title: 'Email',
      value: `${userDetail.email}`,
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
    {
      icon: <FollowIcon />,
      title: 'FollowUs',
    },
    {
      icon: <Faq />,
      title: 'FAQ',
    },
  ];

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userInfo');
    console.log('user logout');
    navigation.navigate('OnBoarding');
  };

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
              source={
                userDetail?.image !== null
                  ? {
                      uri: `https://dev.codesmile.in/rentbox/public/assets/admin_assets/images/${userDetail.image}`,
                    }
                  : require('../../assets/Images/img/user.jpg')
              }
              style={{
                height: 100,
                width: 100,
              }}
            />
          </View>
        </View>

        {/* profile pic */}

        <Text
          style={{
            color: '#000000',
            fontStyle: 'Poppins-SemiBold',
            textAlign: 'center',
            marginVertical: 15,
            fontSize: 17,
            fontWeight: 'bold',
          }}>
          {userDetail?.first_name}
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
                    paddingLeft: 10,
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
            <TouchableOpacity
              style={{
                padding: 8,
                paddingLeft: 10,
                backgroundColor: '#fff',
                borderRadius: 25,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}
              onPress={() => handleLogout()}>
              <LogoutIcon />
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  marginLeft: 12,
                }}>
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Loader modalVisible={loading} setModalVisible={setLoading} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
