import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetApi} from '../../utils/Api';
import Loader from '../../constant/Loader';
import RentalProduct from '../Home/images/components/RentalProduct';

const WishList = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const getFavouriteProduct = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    setLoading(true);
    GetApi(`favourite-list?user_id=${JSON.parse(userInfo).user_id}`).then(
      async res => {
        if (res.status == 200) {
          setProductData(res.data.product);
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
    getFavouriteProduct();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading title="WishList" onPress={() => navigation.goBack()} />
      <View
        style={{padding: 20, paddingTop: 0, flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={productData}
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
      <Loader modalVisible={loading} setModalVisible={setLoading} />
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({});
