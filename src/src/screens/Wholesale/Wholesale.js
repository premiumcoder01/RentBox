import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import SubHeading from '../../constant/SubHeading';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
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
  const MIN_DEFAULT = 0;
  const MAX_DEFAULT = 100000;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState(null);
  const [category, setCategory] = useState('');
  const [subCategoryList, setSubCategoryList] = useState(null);
  const [subCategory, setSubCategory] = useState('');
  const [wholeSaleProduct, setWholeSaleProduct] = useState([]);

  const getWholeSaleProductData = () => {
    setLoading(true);
    GetApi('item-search-page?category_type=Wholesale').then(
      async res => {
        if (res.status == 200) {
          setWholeSaleProduct(res.data.all_item);
          setCategoryList(res.data.all_category);
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
    getWholeSaleProductData();
  }, []);

  const getSubCateory = async name => {
    GetApi(`item-search-page?category_type=Wholesale&category=${name}`).then(
      async res => {
        if (res.status == 200) {
          setSubCategoryList(res.data.all_sub_category);
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  const applYFilter = () => {
    GetApi(
      `item-search-page?category_type=Wholesale&category=${category}&sub_category=${subCategory}&min_price=${minValue}&max_price=${maxValue}`,
    ).then(
      async res => {
        if (res.status == 200) {
          setWholeSaleProduct(res.data.all_item);
          actionSheetRef.current?.hide();
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  const clearFilter = () => {
    setCategory('');
    setSubCategory('');
    setMinValue(' ');
    setMaxValue('');
    setLoading(true);
    GetApi(`item-search-page?category_type=Wholesale`).then(
      async res => {
        if (res.status == 200) {
          setWholeSaleProduct(res.data.all_item);
          setLoading(false);
          actionSheetRef.current?.hide();
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <SubHeading
        title="Browse Wholesale Products"
        onPress={() => navigation.goBack()}
        backgroundColor="#159DEA"
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
            Filter
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
            console.log(item)
            return (
              <RentalProduct
                key={index}
                id={item.id}
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

      {/* filter */}
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
              onPress={() => {
                applYFilter();
              }}
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
              data={categoryList}
              value={category}
              onChange={item => {
                setCategory(item.name);
                getSubCateory(item.name);
              }}
              placeholder="Category"
            />
            {subCategoryList && (
              <CategoryDropDown
                data={subCategoryList}
                value={subCategory}
                onChange={item => {
                  setSubCategory(item.name);
                }}
                placeholder="Sub Category"
              />
            )}
          </View>
          <View style={{marginTop: 10}}>
            <View
              style={{
                paddingLeft: 30,
              }}>
              <Text
                style={{
                  color: '#159DEA',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Price Range
              </Text>
            </View>
            <View style={{padding: 20, paddingTop: 0, paddingBottom: 0}}>
              <Range
                extraSliderStyle={{backgroundColor: '#159DEA'}}
                extraThumbstyle={{borderColor: '#159DEA'}}
                setMaxValue={setMaxValue}
                setMinValue={setMinValue}
                maxValue={maxValue}
                minValue={minValue}
              />
            </View>
            <ViewAll
              onPress={() => {
                clearFilter();
              }}
              text="Clear All Filter"
              style={{
                paddingHorizontal: 10,
                marginRight: 20,
                backgroundColor: '#159DEA',
                marginVertical: 0,
                marginBottom: 20,
                alignSelf: 'flex-end',
              }}
            />
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
    backgroundColor: '#fff',
    borderTopRightRadius: 50,
    marginBottom: 10,
    borderTopLeftRadius: 50,
  },
});
