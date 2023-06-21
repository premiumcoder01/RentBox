import {
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import product from '../Home/images/product/product';
import RentalProduct from '../Home/images/components/RentalProduct';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {/* search bar */}

      <View
        style={{
          padding: 5,
          backgroundColor: '#fff',
          elevation: 5,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 3,
            backgroundColor: '#F3F3F3',
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{padding: 5, backgroundColor: '#fff', borderRadius: 50}}>
            <Image source={require('../../assets/Images/img/search.png')} />
          </View>
          <TextInput
            value={searchText}
            onChangeText={e => setSearchText(e)}
            placeholder="search"
            placeholderTextColor="#787878"
            style={{
              color: '#787878',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 18,
              flex: 1,
              marginHorizontal: 10,
              padding:0
            }}
          />
        </View>
      </View>

      {/* product-list */}
      <View style={{margin: 20, marginTop: 0, flex: 1}}>
        <FlatList
          data={product}
          numColumns={2}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{paddingBottom: 60}}
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
                source={item.img}
                title={item.title}
                price={item.price}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
