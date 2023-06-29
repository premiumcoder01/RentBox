import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import Edit from './icons/Edit';
import Delete from './icons/Delete';
import AddIcon from './icons/AddIcon';
import Gallery from './icons/Gallery';
import product from '../Home/images/product/product';
import Header from '../../components/Header';

const ManageProduct = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading title="Manage Products" onPress={() => navigation.goBack()} />
      <View style={{marginHorizontal: 10, flex: 1, position: 'relative'}}>
        <FlatList
          data={product}
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
                  source={item.img}
                  resizeMode="contain"
                  style={{height: 70, width: 70}}
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
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 10,
                      fontFamily: 'Poppins-Medium',
                      marginLeft: 5,
                    }}>
                    {item.price}
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
                    onPress={() => navigation.navigate('UploadImage')}>
                    <Gallery style={{marginVertical: 10}} />
                  </TouchableOpacity>
                  <TouchableOpacity>
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
    </View>
  );
};

export default ManageProduct;
