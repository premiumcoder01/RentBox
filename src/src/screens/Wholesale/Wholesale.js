import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import SubHeading from '../../constant/SubHeading';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';
import RentalProduct from '../Home/images/components/RentalProduct';

import Filter from '../../assets/Images/Filter';
import ActionSheet from 'react-native-actions-sheet';
import ViewAll from '../Home/images/components/ViewAll';
import CategoryDropDown from './component/CategoryDropDown';

import Range from './component/Range';
import Header from '../../components/Header';
import {GetApi} from '../../utils/Api';
import Loader from '../../constant/Loader';

const actionSheetRef = createRef();
const Wholesale = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [wholeSaleProduct, setWholeSaleProduct] = useState([]);
  const [select, setSelect] = useState(0);

  const getProductData = () => {
    setLoading(true);
    GetApi('home-page-data').then(
      async res => {
        if (res.status == 200) {
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
  }, []);

  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  const handleSelect = index => {
    setSelect(index);
    console.log(select);
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <SubHeading
        title="Browse Wholesale Products"
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          padding: 10,
          backgroundColor: '#E0F3FD',
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => actionSheetRef.current?.setModalVisible()}>
          <Filter />
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
              fontFamily: 'Poppins-SemiBold',
              lineHeight: 18,
              marginLeft: 10,
            }}>
            Filter(0)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 10,
              color: '#159DEA',
              fontFamily: 'Poppins-Regular',
              lineHeight: 15,
            }}>
            Short by
          </Text>
          <Icon name="keyboard-arrow-down" size={20} color="#159DEA" />
        </TouchableOpacity>
      </View>
      <View
        style={{padding: 20, paddingTop: 0, flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={wholeSaleProduct}
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
                source={item.product_image}
                title={item.product_name}
                price={item.product_price}
                chatBackground="#159DEA"
                onPress={() =>
                  navigation.navigate('ProductDetail', {item: item})
                }
              />
            );
          }}
        />
      </View>
      {/* filter modal */}
      <ActionSheet
        ref={actionSheetRef}
        elevation={10}
        gestureEnabled={true}
        initialOffsetFromBottom={5}
        indicatorColor="#159DEA"
        indicatorStyle={{marginTop: 10, height: 5}}
        containerStyle={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>
        <View style={styles.actionMainView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Filter />
              <Text
                style={{
                  fontSize: 12,
                  color: '#000000',
                  fontFamily: 'Poppins-SemiBold',
                  lineHeight: 18,
                  marginLeft: 10,
                }}>
                Filter
              </Text>
            </View>
            <ViewAll
              onPress={() => actionSheetRef.current?.hide()}
              text="Apply"
              style={{
                paddingHorizontal: 10,
                backgroundColor: '#159DEA',
                marginVertical: 0,
              }}
            />
          </View>
          <View style={{paddingHorizontal: 20}}>
            <CategoryDropDown
              data={data}
              setValue={setCategory}
              value={category}
              placeholder="Category"
            />
            <CategoryDropDown
              data={data}
              setValue={setSubCategory}
              value={subCategory}
              placeholder="Sub Category"
            />
          </View>
          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <View
              style={{
                padding: 20,
                backgroundColor: '#F1F1F1',
                width: '45%',
                paddingLeft: 30,
                borderTopRightRadius: 25,
                borderBottomRightRadius: 25,
                paddingBottom: 150,
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: '#159DEA',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Price
                </Text>
                <Icon name="arrow-forward-ios" size={10} color={'#159DEA'} />
              </Pressable>
            </View>
            <View style={{paddingTop: 20, width: '50%'}}>
              <Range
                extraSliderStyle={{backgroundColor: '#159DEA'}}
                extraThumbstyle={{borderColor: '#159DEA'}}
              />
            </View>
          </View>
        </View>
      </ActionSheet>
      <Loader modalVisible={loading} setModalVisible={setLoading} />
    </View>
  );
};

export default Wholesale;

const styles = StyleSheet.create({
  actionMainView: {
    // padding: 20,
    backgroundColor: '#fff',
    borderTopRightRadius: 50,
    marginBottom: 10,
    borderTopLeftRadius: 50,
  },
});
