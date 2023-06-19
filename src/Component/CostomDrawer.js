import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';
import Constants from '../Helpers/constant';
import {Post} from '../Helpers/Service';
import Toaster from '../Component/Toaster';
import Spinner from '../Component/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import MyUsedItem from '../Screens/SecondPhase/MyUsedItem';
import {ScrollView} from 'react-native-gesture-handler';

const CostomDrawer = props => {
  // console.log(props);
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getuserDetail();
    // }, [props.navigation.state?.isDrawerOpen]);
  }, [props.navigation.getState()]);

  const getuserDetail = async () => {
    const user = await AsyncStorage.getItem('userDetail');
    // console.log(JSON.parse(user));
    setUserDetail(JSON.parse(user));
  };
  const userMembership = () => {
    navigation.navigate('Membership');
  };
  const userWishlist = () => {
    navigation.navigate('Wishlist');
  };
  const shopWishlist = () => {
    navigation.navigate('Shopwishlist');
  };
  const myUsedItem = () => {
    navigation.navigate('Myuseditem');
  };
  const postAdd = () => {
    navigation.navigate('UploadUsedItem');
  };
  const promotedItems = () => {
    navigation.navigate('PromotedItems');
  };
  const navigation = useNavigation();

  const logoutUser = () => {
    const d = {
      user_id: userDetail.user_id,
    };
    Post('logout', d).then(
      async res => {
        setLoading(false);
        if (res.status == 200) {
          await AsyncStorage.removeItem('userDetail');
          // Toaster(res.message);
          props.navigation.push('main');
          props.navigation.closeDrawer();
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };

  const sideBardata = [
    {
      key: 'About Kanpid',
      nav: 'AboutKanpid',
    },
    {
      key: 'Support',
      nav: 'Support',
    },
    {
      key: 'Privacy Policy',
      url: 'https://kanpid.com/kanpid/public/privacy',
    },
    {
      key: 'Legal',
      url: 'https://kanpid.com/kanpid/public/terms',
    },
    {
      key: 'NewsLetter',
      nav: 'NewsLetter',
    },
    {
      key: 'Delete Account',
      nav: 'DeleteAccount',
    },
  ];

  const onPressMenu = item => {
    props.navigation.closeDrawer();
    // console.log(item.url);
    if (item.url !== undefined) {
      Linking.openURL(item.url);
    } else if (item.nav !== undefined) {
      props.navigation.navigate(item.nav);
    }
  };

  const myShopcart = async () => {
    const user = await AsyncStorage.getItem('userDetail');
    const userId = JSON.parse(user).user_id;
    navigation.navigate('ShopCart', {user_id: userId});
  };
  return (
    <ScrollView>
      <View style={{flex: 1, marginTop: 0}}>
        <Spinner color={'#fff'} visible={loading} />
        <DrawerContentScrollView
          {...props}
          style={{paddingTop: 0, paddingBottom: 30}}>
          <View style={{position: 'relative', paddingTop: 60}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 10,
                marginLeft: 20,
              }}>
              <Avatar.Image
                size={60}
                source={
                  userDetail?.image != null
                    ? {uri: `${Constants.imageUrl}images/${userDetail.image}`}
                    : require('../assets/Images/images.png')
                }
              />
              <View style={{justifyContent: 'center', paddingHorizontal: 15}}>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Mulish-SemiBold',
                    fontSize: 10,
                  }}>
                  Hi Welcome
                </Text>
                {userDetail?.user_id === undefined ? (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.closeDrawer();
                      props.navigation.navigate('Signin');
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontFamily: 'Mulish-Bold',
                        fontSize: 16,
                      }}>
                      {/* {userDetail?.user_id} */}
                      Login
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <Text
                      style={{
                        color: '#000',
                        fontFamily: 'Mulish-Bold',
                        fontSize: 16,
                      }}>
                      {userDetail?.first_name}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={{position: 'absolute', right: 20, top: 60}}
              onPress={() => {
                props.navigation.closeDrawer();
              }}>
              <Avatar.Text
                size={30}
                label="X"
                color="#000"
                style={{backgroundColor: '#E1E1E1'}}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 30}}>
            {userDetail?.user_id !== undefined && (
              <View
                style={{
                  borderbottomWidth: 1,
                  borderColor: '#d6d6d6',
                  borderTopWidth: 1,
                }}>
                <Text
                  style={{
                    marginLeft: 25,
                    fontSize: 16,
                    color: '#000',
                    fontFamily: 'Mulish-Bold',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  Lost & Found
                </Text>
                <TouchableOpacity
                  style={Styles.menuBtn}
                  onPress={() => {
                    navigation.navigate('SerarchResult');
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 13,
                      color: '#000',
                      fontFamily: 'Mulish-Bold',
                    }}>
                    My Items
                  </Text>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <FontAwesome5 name="angle-right" color={'#000'} size={20} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.menuBtn}
                  onPress={() => {
                    navigation.navigate('PostYourItem');
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 13,
                      color: '#000',
                      fontFamily: 'Mulish-Bold',
                    }}>
                    Upload Lost Item
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <FontAwesome5 name="angle-right" color={'#000'} size={20} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.menuBtn}
                  onPress={() => {
                    navigation.navigate('PostYourItem');
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 13,
                      color: '#000',
                      fontFamily: 'Mulish-Bold',
                    }}>
                    Upload Found Item
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <FontAwesome5 name="angle-right" color={'#000'} size={20} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {userDetail?.user_id !== undefined && (
              <View
                style={{
                  borderbottomWidth: 1,
                  borderColor: '#d6d6d6',
                  borderTopWidth: 1,
                }}>
                <Text
                  style={{
                    marginLeft: 25,
                    fontSize: 16,
                    color: '#000',
                    fontFamily: 'Mulish-Bold',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  Kanpid Shop
                </Text>
                <TouchableOpacity
                  style={Styles.menuBtn}
                  onPress={() => {
                    myShopcart();
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 13,
                      color: '#000',
                      fontFamily: 'Mulish-Bold',
                    }}>
                    My Cart
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <FontAwesome5 name="angle-right" color={'#000'} size={20} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.menuBtn}
                  onPress={() => {
                    shopWishlist();
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 13,
                      color: '#000',
                      fontFamily: 'Mulish-Bold',
                    }}>
                    My Wishlist
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <FontAwesome5 name="angle-right" color={'#000'} size={20} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.menuBtn}
                  onPress={() => {
                    navigation.navigate('YourOrders');
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 13,
                      color: '#000',
                      fontFamily: 'Mulish-Bold',
                    }}>
                    My Orders
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <FontAwesome5 name="angle-right" color={'#000'} size={20} />
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {userDetail?.user_id !== undefined && (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#d6d6d6',
                  borderTopWidth: 1,
                }}>
                <Text
                  style={{
                    marginLeft: 25,
                    fontSize: 16,
                    color: '#000',
                    fontFamily: 'Mulish-Bold',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  Used Item
                </Text>

                <TouchableOpacity
                  style={Styles.menuBtn}
                  onPress={() => {
                    postAdd();
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 13,
                      color: '#000',
                      fontFamily: 'Mulish-Bold',
                    }}>
                    Post Your Add
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <FontAwesome5 name="angle-right" color={'#000'} size={20} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.menuBtn}
                  onPress={() => {
                    userWishlist();
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 13,
                      color: '#000',
                      fontFamily: 'Mulish-Bold',
                    }}>
                    My Wishlist
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <FontAwesome5 name="angle-right" color={'#000'} size={20} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.menuBtn}
                  onPress={() => {
                    myUsedItem();
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 13,
                      color: '#000',
                      fontFamily: 'Mulish-Bold',
                    }}>
                    My Items
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <FontAwesome5 name="angle-right" color={'#000'} size={20} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.menuBtn}
                  onPress={() => {
                    promotedItems();
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 13,
                      color: '#000',
                      fontFamily: 'Mulish-Bold',
                    }}>
                    My Promoted Items
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <FontAwesome5 name="angle-right" color={'#000'} size={20} />
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {userDetail?.user_id !== undefined && (
              <TouchableOpacity
                style={Styles.menuBtn}
                onPress={() => {
                  userMembership();
                }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 13,
                    color: '#000',
                    fontFamily: 'Mulish-Bold',
                  }}>
                  Membership
                </Text>
              </TouchableOpacity>
            )}
            {sideBardata.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={Styles.menuBtn}
                onPress={() => {
                  onPressMenu(item);
                }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 13,
                    color: '#000',
                    fontFamily: 'Mulish-Bold',
                  }}>
                  {item.key}
                </Text>
              </TouchableOpacity>
            ))}
            {userDetail?.user_id !== undefined && (
              <TouchableOpacity
                style={Styles.menuBtn}
                onPress={() => {
                  logoutUser();
                }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 13,
                    color: '#000',
                    fontFamily: 'Mulish-Bold',
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* <DrawerItemList {...props} /> */}

          <View style={Styles.folow}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate('FollowUs');
              }}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  color: '#000',
                  fontFamily: 'Mulish-Bold',
                }}>
                Follow Us
              </Text>
            </TouchableOpacity>
            <View
              style={[
                {
                  alignItems: 'center',
                  // paddingLeft: '20%',
                  flexDirection: 'row',
                },
              ]}>
              <TouchableOpacity
                style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={async () => {
                  await Linking.openURL('https://www.facebook.com/kanpidd/');
                }}>
                <FontAwesome5 name="facebook-f" size={20} color="#3C3C3C" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={async () => {
                  await Linking.openURL(
                    'https://twitter.com/Kanpid_?t=qYwxN9hphE8XT5hub9CTyA&s=09',
                  );
                }}>
                <Ionicons name="logo-twitter" size={22} color="#3C3C3C" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={async () => {
                  await Linking.openURL(
                    // 'https://www.instagram.com/kanpid_/ '
                    'https://www.instagram.com/kanpid_limited/',
                  );
                }}>
                <Ionicons name="logo-instagram" size={22} color="#3C3C3C" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={async () => {
                  await Linking.openURL(
                    'https://www.linkedin.com/company/kanpid-limited',
                  );
                }}>
                <FontAwesome5 name="linkedin-in" size={22} color="#3C3C3C" />
              </TouchableOpacity>
            </View>
          </View>
        </DrawerContentScrollView>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  folow: {
    backgroundColor: '#CFE9D9',
    paddingTop: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 45,
    paddingHorizontal: 10,
  },
  submit: {
    marginTop: 20,
    textAlign: 'center',
    width: 90,
  },
  submitText: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    fontSize: 14,
  },
  menuBtn: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    opacity: 0.8,
  },
});

export default CostomDrawer;