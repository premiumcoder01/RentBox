import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import Edit from './icons/Edit';
import Delete from './icons/Delete';
import AddIcon from './icons/AddIcon';
import Gallery from './icons/Gallery';
import product from '../Home/images/product/product';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetApi} from '../../utils/Api';
import Loader from '../../constant/Loader';
import Constants from '../../utils/Constant';

const ManageProduct = () => {
  const navigation = useNavigation();
  const [productData, setProductData] = useState();
  const [loading, setLoading] = useState(false);

  const getUserDetail = async () => {
    setLoading(true);
    const userInfo = await AsyncStorage.getItem('userInfo');
    getMyProduct(JSON.parse(userInfo).user_id);
  };

  const getMyProduct = id => {
    GetApi(`my-items?user_id=${id}`).then(
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
    getUserDetail();
  }, []);

  const deleteProduct = id => {
    GetApi(`delete-item/${id}`).then(
      async res => {
        if (res.status == 200) {
          console.log(res);
        }
      },
      err => {
        console.log(err);
      },
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading title="Manage Products" onPress={() => navigation.goBack()} />
      <View style={{marginHorizontal: 10, flex: 1, position: 'relative'}}>
        <FlatList
          data={productData}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{paddingBottom: 80}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                  elevation: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 10,
                  marginBottom: 5,
                }}>
                <Image
                  source={{
                    uri: `${Constants.imageUrl}category-image/${item.product_image}`,
                  }}
                  resizeMode="contain"
                  style={{
                    height: 70,
                    width: 70,
                    borderWidth: 1,
                    borderRadius: 15,
                  }}
                />
                <View style={{width: 180, marginLeft: 15}}>
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
                    {item.product_price}/ month
                  </Text>
                </View>
                <View
                  style={{
                    padding: 8,
                    elevation: 4,
                    backgroundColor: '#fff',
                    borderRadius: 22,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EditProduct')}>
                    <Edit />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UploadImage', {item: item.id})
                    }>
                    <Gallery style={{marginVertical: 10}} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteProduct(item.id)}>
                    <Delete />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: '45%',
            bottom: 80,
          }}
          onPress={() => navigation.navigate('AddProduct')}>
          <AddIcon />
        </TouchableOpacity>
      </View>
      <Loader modalVisible={loading} setModalVisible={setLoading} />
    </View>
  );
};

export default ManageProduct;
