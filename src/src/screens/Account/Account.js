import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
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

const App_ID = '79c7741c-ffe1-4e25-a382-fad62cd1c585';
const OneSignal_Key = 'YTVlNzQzZjctMzBmYi00ZDM3LWFmNmItZjVlOWUyZjVhNWVh';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Account = props => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    getuserDetail();
    return () => {
      setUserData([]);
    };
  }, [isFocused]);

  const getuserDetail = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    if (user === null) {
    } else {
      getProfile(JSON.parse(user).user_id);
    }
  };

  const getProfile = id => {
    setLoading(true);
    GetApi(`getProfileById?id=${id}`).then(
      async res => {
        setLoading(false);
        if (res.status == 200) {
          setUserData(res.data);
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const user = await AsyncStorage.getItem('userInfo');
    getProfile(JSON.parse(user).user_id);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
  const removeNotification = async token => {
    console.log(token)
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: `Basic ${OneSignal_Key}`,
      },
    };

    fetch(
      `https://onesignal.com/api/v1/players/${token}?app_id=${App_ID}`,
      options,
    )
      .then(response => response.json())
      .then(async response => {
        await AsyncStorage.removeItem('userInfo');
        props.navigation.navigate('OnBoarding');
      })
      .catch(err => console.error(err));
  };
  const handleLogout = async () => {
    removeNotification(userData.device_token);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView
          style={{flex: 1, backgroundColor: '#fff'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 70}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* header */}
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
              onPress={() =>
                props.navigation.navigate('Edit Profile', {data: userData})
              }>
              <Icon
                name="edit"
                size={10}
                color="#fff"
                style={{marginRight: 5}}
              />
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
                  userData?.image !== null
                    ? {
                        uri: `https://dev.codesmile.in/rentbox/public/assets/admin_assets/images/${userData.image}`,
                      }
                    : require('../../assets/Images/img/images.png')
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
            {userData?.first_name}
          </Text>

          {/* fields */}
          <View style={{marginHorizontal: 20, paddingBottom: 20}}>
            {/* email */}
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
                <EmailIcon />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Poppins-Regular',
                    marginLeft: 10,
                    // fontWeight: 500,
                  }}>
                  Email
                </Text>
              </View>
              <Text
                style={{
                  color: '#8E8E8E',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 11,
                }}>
                {userData.email}
              </Text>
            </View>
            {/* phone */}
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
                <PhoneIcon />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Poppins-Regular',
                    marginLeft: 10,
                    // fontWeight: 500,
                  }}>
                  Phone
                </Text>
              </View>
              <Text
                style={{
                  color: '#8E8E8E',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 11,
                }}>
                {userData.phone}
              </Text>
            </View>
            {/* address */}
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
                <Location />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Poppins-Regular',
                    marginLeft: 10,
                    // fontWeight: 500,
                  }}>
                  Address
                </Text>
              </View>
              <Text
                style={{
                  color: '#8E8E8E',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 11,
                }}>
                {userData?.address?.length > 20
                  ? userData.address.slice(0, 30).concat('....')
                  : userData.address}
              </Text>
            </View>
            {/* passsword */}
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
                <PassWordIcon />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Poppins-Regular',
                    marginLeft: 10,
                    // fontWeight: 500,
                  }}>
                  Password
                </Text>
              </View>
              <Text
                style={{
                  color: '#8E8E8E',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 11,
                }}>
                ********
              </Text>
            </View>

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
      )}
      {/* <Loader modalVisible={loading} setModalVisible={setLoading} /> */}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
