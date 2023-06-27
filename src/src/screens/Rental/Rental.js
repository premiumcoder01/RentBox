import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import SubHeading from '../../constant/SubHeading';
import RentalProduct from '../Home/images/components/RentalProduct';
import Filter from '../../assets/Images/Filter';
import ActionSheet from 'react-native-actions-sheet';
import ViewAll from '../Home/images/components/ViewAll';
import CategoryDropDown from '../Wholesale/component/CategoryDropDown';
import Range from '../Wholesale/component/Range';
import Header from '../../components/Header';
import {GetApi} from '../../utils/Api';
import Loader from '../../constant/Loader';

const actionSheetRef = createRef();

const Rental = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  const [rentalProduct, setRentalProduct] = useState([]);

  const [select, setSelect] = useState(0);

  const getProductData = () => {
    setLoading(true);
    GetApi('home-page-data').then(
      async res => {
        if (res.status == 200) {
          setRentalProduct(res.data.rental_products);
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
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <SubHeading
        title="Browse Rental Products"
        onPress={() => navigation.goBack()}
        backgroundColor="#33AD66"
      />
      <View
        style={{
          padding: 16,
          backgroundColor: '#DFF9EA',
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
              color: '#33AD66',
              fontFamily: 'Poppins-Regular',
              lineHeight: 15,
            }}>
            Short by
          </Text>
          <Icon name="keyboard-arrow-down" size={20} color="#33AD66" />
        </TouchableOpacity>
      </View>

      <View
        style={{padding: 20, paddingTop: 0, flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={rentalProduct}
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
                onPress={() =>
                  navigation.navigate('ProductDetail', {item: item})
                }
              />
            );
          }}
        />
      </View>

      {/* filter */}
      <ActionSheet
        ref={actionSheetRef}
        elevation={10}
        gestureEnabled={true}
        initialOffsetFromBottom={5}
        indicatorColor="#33AD66"
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
                Filter(0)
              </Text>
            </View>
            <ViewAll
              onPress={() => actionSheetRef.current?.hide()}
              text="Apply"
              style={{
                paddingHorizontal: 10,
                backgroundColor: '#33AD66',
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
              <FlatList
                data={Options}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      backgroundColor: '#DEDEDE',
                      height: 0.5,
                      marginTop: 10,
                    }}
                  />
                )}
                renderItem={({item, index}) => {
                  return (
                    <Pressable
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      onPress={() => handleSelect(index)}>
                      <Text
                        style={{
                          color: select === index ? '#33AD66' : '#000000',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        {item.title}
                      </Text>
                      <Icon
                        name="arrow-forward-ios"
                        size={10}
                        color={select === index ? '#33AD66' : '#000000'}
                      />
                    </Pressable>
                  );
                }}
              />
            </View>
            <View style={{paddingTop: 20, width: '50%'}}>
              <Range
                extraSliderStyle={{backgroundColor: '#33AD66'}}
                extraThumbstyle={{borderColor: '#33AD66'}}
              />
            </View>
          </View>
        </View>
      </ActionSheet>
      <Loader modalVisible={loading} setModalVisible={setLoading} />
    </View>
  );
};

export default Rental;

const styles = StyleSheet.create({});
