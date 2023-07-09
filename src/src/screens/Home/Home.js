import {
  ScrollView,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Carasouel from './images/components/Carasouel';
import Category from './images/components/Category';
import TitleText from './images/components/TitleText';
import ViewAll from './images/components/ViewAll';
import Loader from '../../constant/Loader';
import Header from '../../components/Header';
import {GetApi, Post} from '../../utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../../../Component/Toaster';
import ChatIcon from '../../assets/Images/ChatIcon';
import Like from '../../assets/Images/Like';
import Constants from '../../utils/Constant';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [rentalCategory, setRentalCategory] = useState([]);
  const [rentalProduct, setRentalProduct] = useState([]);
  const [wholeSaleCategory, setWholeSaleCategory] = useState([]);
  const [wholeSaleProduct, setWholeSaleProduct] = useState([]);
  const [productUserDetail, setProductUserDetail] = useState([]);

  const getProductData = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    setLoading(true);
    GetApi(
      `home-page-data?current_user_id=${JSON.parse(userInfo).user_id}`,
    ).then(
      async res => {
        if (res.status == 200) {
          setRentalCategory(res.data.rental_category_data);
          setRentalProduct(res.data.rental_products);
          setWholeSaleCategory(res.data.whole_sale_category_data);
          setWholeSaleProduct(res.data.whole_sale_products);
          setLoading(false);
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };

  useEffect(() => {
    getProductData();
    return () => {
      setRentalCategory([]);
    };
  }, []);

  const handleLike = async id => {
    console.log('clicked');
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

  const getProductUserDetail = id => {
    GetApi(`getProfileById?id=${id}`).then(
      async res => {
        if (res.status == 200) {
          setProductUserDetail(res.data);
          console.log(productUserDetail, '++++++++++++++++++');
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
    getProductUserDetail(item.user_id);

    Post('chatClick', data).then(
      async res => {
        if (res.status == 200) {
          if (productUserDetail) {
            navigation.navigate('Chat', {
              screen: 'ChatInbox',
              params: {
                user_id: item.user_id,
                user_image: productUserDetail.image,
                user_name: productUserDetail.first_name,
              },
            });
          }
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getProductData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const data2 = [
    {
      image: require('./images/carasouel/g1.png'),
    },
    {
      image: require('./images/carasouel/g2.png'),
    },
    {
      image: require('./images/carasouel/g3.png'),
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: 80}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Carasouel data={data2} autoPlay={true} pagination={true} />
          {/* carasouel */}

          {/* category */}
          {rentalCategory ? (
            <Category
              title="Browse Our Rental Category"
              textColor="white"
              backgroundColor="#33AD66"
              Category={rentalCategory}
              type="Rental"
            />
          ) : null}

          {/* product */}
          <View style={{marginHorizontal: 20, flex: 1}}>
            <TitleText title="Rental Products" color="#33AD66" />
            <FlatList
              data={rentalProduct.slice(0, 4)}
              numColumns={2}
              keyExtractor={item => `${item.id}`}
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
                      navigation.navigate('ProductDetail', {item: item.product_name})
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
                          backgroundColor: '#33AD66',
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
            <ViewAll
              onPress={() =>
                navigation.navigate('Rental', {item: rentalProduct})
              }
            />
          </View>
          <Category
            title="Browse Wholesale Category"
            textColor="white"
            backgroundColor="#159DEA"
            Category={wholeSaleCategory}
            type="Wholesale"
          />

          {/* wholesale product */}
          <View style={{marginHorizontal: 20, flex: 1}}>
            <TitleText title="Wholesale Products" color="#159DEA" />
            <FlatList
              data={wholeSaleProduct.slice(0, 4)}
              numColumns={2}
              keyExtractor={item => `${item.id}`}
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
                      navigation.navigate('ProductDetail', {item: item.product_name})
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
                          backgroundColor: '#159DEA',
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
            <ViewAll
              onPress={() =>
                navigation.navigate('Wholesale', {items: wholeSaleProduct})
              }
              style={{
                backgroundColor: '#159DEA',
              }}
            />
          </View>

          {/* <Loader modalVisible={loading} setModalVisible={setLoading} /> */}
        </ScrollView>
      )}
    </View>
  );
};

export default Home;
