import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GetApi, Post} from '../../utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryDropDown from '../Wholesale/component/CategoryDropDown';
import Toaster from '../../../Component/Toaster';
import Like from '../../assets/Images/Like';
import ChatIcon from '../../assets/Images/ChatIcon';
import Constants from '../../utils/Constant';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');

  const [filterProductList, setFilterProductList] = useState([]);
  const [userId, setUserID] = useState('');

  const navigation = useNavigation();

  const [category, setCategory] = useState('Rental');

  const [loading, setLoading] = useState(false);

  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);
  const [productList, setproductList] = useState([]);

  const actionBarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 750,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (
        lastContentOffset.value > event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 0;
      } else if (
        lastContentOffset.value < event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = -100;
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: e => {
      isScrolling.value = true;
    },
    onEndDrag: e => {
      isScrolling.value = false;
    },
  });

  const getProductData = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('userInfo');
    if (user === null) {
      setUserID(0);
    } else {
      setUserID(JSON.parse(user).user_id);
    }

    GetApi(
      `item-search-page?category_type=${category}&current_user_id=${userId}`,
    ).then(
      async res => {
        if (res.status == 200) {
          setproductList(res.data.all_item);
          setFilterProductList(res.data.all_item);
          setLoading(false);
        }
      },
      err => {
        console.log(err);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    getProductData();
  }, [category]);

  const categoryList = [
    {id: 1, name: 'Rental'},
    {id: 2, name: 'Wholesale'},
  ];

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      const newData = productList.filter(function (item) {
        const itemData = item.product_name
          ? item.product_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterProductList(newData);
      setSearchText(text);
    } else {
      // Inserted text is blank
      // Update filterProductList with productList
      setFilterProductList(productList);
      setSearchText(text);
    }
  };

  const handleLike = async id => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    const data = {
      user_id: JSON.parse(userInfo).user_id,
      product_id: id,
    };
    Post(`add-favourite`, data).then(
      async res => {
        if (res.status == 200) {
          if (res.data.data === 'insert') {
            Toaster('Added To wishList');
            getProductData();
          } else {
            Toaster('Remove from wishList');
            getProductData();
          }
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  const handleChat = async item => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    const data = {
      current_user_id: JSON.parse(userInfo).user_id,
      receiver_id: item.user_id,
    };
    Post('chatClick', data).then(
      async res => {
        if (res.status == 200) {
          navigation.navigate('Chat', {
            screen: 'ChatInbox',
            params: {
              user_id: item.user_id,
              user_image: item.image,
              user_name: item.first_name,
            },
          });
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {/* search bar */}

      <Animated.View
        style={[
          {
            padding: 5,
            backgroundColor: '#fff',
            elevation: 5,
            paddingHorizontal: 15,
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            zIndex: 2,
          },
          actionBarStyle,
        ]}>
        <Icon
          name="arrow-back-ios"
          size={15}
          color="#B3B3B3"
          onPress={() => navigation.goBack()}
          style={{marginRight: 5}}
        />

        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 3,
            backgroundColor: '#F3F3F3',
            borderRadius: 100,
            flexDirection: 'row',
            width: '70%',
            alignItems: 'center',
          }}>
          <View style={{padding: 5, backgroundColor: '#fff', borderRadius: 50}}>
            <Image source={require('../../assets/Images/img/search.png')} />
          </View>
          <TextInput
            value={searchText}
            onChangeText={text => searchFilterFunction(text)}
            placeholder="search"
            placeholderTextColor="#787878"
            style={{
              color: '#787878',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 18,
              flex: 1,
              marginHorizontal: 10,
              padding: 0,
            }}
          />
          {searchText.length > 0 ? (
            <Pressable
              style={{padding: 5, backgroundColor: '#fff', borderRadius: 50}}
              onPress={() => {
                setSearchText('');
                getProductData();
              }}>
              <Image
                source={require('../../assets/Images/img/cross.png')}
                style={{height: 15, width: 15}}
              />
            </Pressable>
          ) : null}
        </View>
        <CategoryDropDown
          data={categoryList}
          value={category}
          onChange={item => {
            setCategory(item.name);
            // getProductData();
          }}
          placeholder="Type"
          dropdownStyle={{
            minWidth: 80,
            marginTop: 0,
            flex: 1,
            marginLeft: 5,
            backgroundColor: category === 'Rental' ? '#33AD66' : '#159DEA',
            borderColor: category === 'Rental' ? '#33AD66' : '#159DEA',
          }}
          textStyle={{fontSize: 10}}
          iconSStyle={{height: 0, width: 0}}
          maintext={{color: '#fff', textAlign: 'center'}}
        />
      </Animated.View>

      {/* product-list */}
      {loading ? (
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{margin: 20, marginTop: 0, flex: 1}}>
          <Animated.FlatList
            data={filterProductList}
            numColumns={2}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            keyExtractor={item => `${item.id}`}
            contentContainerStyle={{paddingBottom: 60, paddingTop: 50}}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: 150,
                    marginTop: 10,
                  }}
                  onPress={() =>
                    navigation.navigate('ProductDetail', {item: item})
                  }>
                  <View style={{position: 'relative', marginBottom: 0}}>
                    <Image
                      source={{
                        uri: `${Constants.imageUrl}category-image/${item.product_image}`,
                      }}
                      resizeMode="contain"
                      style={{
                        marginBottom: 10,
                        height: 113,
                        width: 150,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 14,
                        top: 14,
                        padding: 10,
                        backgroundColor:
                          item.product_type !== 'Wholesale'
                            ? '#33AD66'
                            : '#159DEA',
                        borderRadius: 100,
                      }}
                      onPress={() => handleChat(item)}>
                      <ChatIcon color="#fff" width={10} height={9} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 14,
                        bottom: 0,
                        padding: 10,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                      }}
                      onPress={() => {
                        handleLike(item.id);
                      }}>
                      <Like
                        color={
                          item.is_favorite === 'null' ||
                          item.is_favorite == null
                            ? '#B3B3B3'
                            : '#FF0000'
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#000',
                      marginLeft: 5,
                      marginBottom: 5,
                    }}>
                    {item.product_name}
                  </Text>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 10,
                      fontFamily: 'Poppins-Medium',
                      marginLeft: 5,
                    }}>
                    $ {item.product_price} / month
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
    backgroundColor: '#000',
    width: '50%',
    justifyContent: 'space-around',
  },
  actionItem: {
    color: '#fff',
  },
});
