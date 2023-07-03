import {Image, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RentalProduct from '../Home/images/components/RentalProduct';
import {useNavigation} from '@react-navigation/native';

import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GetApi} from '../../utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');

  const [filterProductList, setFilterProductList] = useState([]);
  const [userId, setUserID] = useState('');

  const navigation = useNavigation();

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
    const user = await AsyncStorage.getItem('userInfo');
    if (user === null) {
      setUserID(0);
    } else {
      setUserID(JSON.parse(user).user_id);
    }
    
    GetApi(`item-search-page?current_user_id=${userId}`).then(
      async res => {
        if (res.status == 200) {
          console.log(res);
          setproductList(res.data.all_item);
          setFilterProductList(res.data.all_item);
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    getProductData();
  }, []);

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
            width: '100%',
            zIndex: 2,
          },
          actionBarStyle,
        ]}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 3,
            backgroundColor: '#F3F3F3',
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{padding: 5, backgroundColor: '#fff', borderRadius: 50}}>
            <Image source={require('../../assets/Images/img/search.png')} />
          </View>
          <TextInput
            value={searchText}
            // onChangeText={e => setSearchText(e)}
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
        </View>
      </Animated.View>

      {/* product-list */}
      <View style={{margin: 20, marginTop: 0, flex: 1}}>
        <Animated.FlatList
          data={filterProductList}
          numColumns={2}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{paddingBottom: 60, paddingTop: 40}}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <RentalProduct
                key={index}
               data={item}
                source={item.product_image}
                title={item.product_name}
                price={item.product_price}
                onPress={() =>
                  navigation.navigate('ProductDetail', {item: item})
                }
              />
            );
          }}
        />
      </View>
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
