import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetApi, Post} from '../../utils/Api';
import Loader from '../../constant/Loader';
import Toaster from '../../../Component/Toaster';
import Constants from '../../utils/Constant';
import ChatIcon from '../../assets/Images/ChatIcon';
import Like from '../../assets/Images/Like';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const WishList = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  const [like, setLike] = useState('');

  const getFavouriteProduct = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    GetApi(`favourite-list?user_id=${JSON.parse(userInfo).user_id}`).then(
      async res => {
        if (res.status == 200) {
          setProductData(res.data.product);
        }
      },
      err => {
        console.log(err);
      },
    );
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
          setLike(res.data.data);
          if (res.data.data === 'insert') {
            Toaster('Added To wishList');
            getFavouriteProduct();
          } else {
            Toaster('Remove from wishList');
            getFavouriteProduct();
          }
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    getFavouriteProduct();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getFavouriteProduct();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading title="WishList" onPress={() => navigation.goBack()} />
      <View
        style={{padding: 20, paddingTop: 0, flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={productData}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={2}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{paddingBottom: 50}}
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
                      backgroundColor: '#33AD66',
                      borderRadius: 100,
                    }}
                    onPress={() => handleChat()}>
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
                    onPress={() => handleLike(item.id)}>
                    {productData.fav_id !== null ? (
                      <Like color={like !== 'insert' ? '#FF0000' : '#B3B3B3'} />
                    ) : (
                      <Like color={like !== 'insert' ? '#B3B3B3' : '#FF0000'} />
                    )}
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
      {/* <Loader modalVisible={loading} setModalVisible={setLoading} /> */}
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({});
