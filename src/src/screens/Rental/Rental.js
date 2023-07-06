import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
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
import {GetApi, Post} from '../../utils/Api';
import Loader from '../../constant/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatIcon from '../../assets/Images/ChatIcon';
import Like from '../../assets/Images/Like';
import Constants from '../../utils/Constant';
import Toaster from '../../../Component/Toaster';
const actionSheetRef = createRef();
const actionSheetShortByRef = createRef();
const Rental = () => {
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
  const [rentalProduct, setRentalProduct] = useState([]);

  const [like, setLike] = useState('');
  const [showLike, setShowLike] = useState(false);

  const getRentalProductData = async () => {
    // setLoading(true);
    const userInfo = await AsyncStorage.getItem('userInfo');
    console.log(JSON.parse(userInfo).user_id);
    GetApi(
      `item-search-page?category_type=Rental&user_id=${
        JSON.parse(userInfo).user_id
      }`,
    ).then(
      async res => {
        if (res.status == 200) {
          console.log(res.data.all_item[0]);
          setRentalProduct(res.data.all_item);
          setCategoryList(res.data.all_category);
          // setLoading(false);
        }
      },
      err => {
        // setLoading(false);
        console.log(err);
      },
    );
  };

  useEffect(() => {
    getRentalProductData();
  }, []);

  const getSubCateory = async name => {
    GetApi(`item-search-page?category_type=Rental&category=${name}`).then(
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
      `item-search-page?category_type=Rental&category=${category}&sub_category=${subCategory}&min_price=${minValue}&max_price=${maxValue}`,
    ).then(
      async res => {
        if (res.status == 200) {
          setRentalProduct(res.data.all_item);
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
    // setLoading(true);
    GetApi(`item-search-page?category_type=Rental`).then(
      async res => {
        if (res.status == 200) {
          setRentalProduct(res.data.all_item);
          // setLoading(false);
          actionSheetRef.current?.hide();
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  const handleLike = async (id, index) => {
    setShowLike(index);
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
          } else {
            Toaster('Remove from wishList');
          }
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
        title="Browse Rental Products"
        onPress={() => navigation.goBack()}
        backgroundColor="#33AD66"
      />
      <View
        style={{
          padding: 10,
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
            Filter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => actionSheetShortByRef.current?.setModalVisible()}>
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
              <TouchableOpacity
                style={{
                  width: 150,
                  marginTop: 10,
                }}
                key={index}
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
                    onPress={() => handleLike(item.id, index)}>
                    <Like
                      color={
                        like !== 'insert' || showLike !== index
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
                backgroundColor: '#33AD66',
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
                  color: '#33AD66',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Price Range
              </Text>
            </View>
            <View style={{padding: 20, paddingTop: 0, paddingBottom: 0}}>
              <Range
                extraSliderStyle={{backgroundColor: '#33AD66'}}
                extraThumbstyle={{borderColor: '#33AD66'}}
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
                backgroundColor: '#33AD66',
                marginVertical: 0,
                marginBottom: 20,
                alignSelf: 'flex-end',
              }}
            />
          </View>
        </View>
      </ActionSheet>

      {/* sortby */}
      <ActionSheet
        ref={actionSheetShortByRef}
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
        <View
          style={{
            backgroundColor: '#fff',
            borderTopRightRadius: 50,
            margin: 10,
            borderTopLeftRadius: 50,
          }}>
          <Text
            style={{
              color: '#33AD66',
              fontFamily: 'Poppins-SemiBold',
              textAlign: 'center',
            }}>
            Sort By
          </Text>

          <TouchableOpacity
            style={{
              padding: 5,
              borderWidth: 0.5,
              borderRadius: 15,
              borderColor: '#33AD66',
              marginVertical: 5,
            }}
            onPress={() => {
              let tempData = rentalProduct.sort((a, b) =>
                a.product_name > b.product_name ? 1 : -1,
              );
              console.log(tempData);
              setRentalProduct(tempData);
              actionSheetShortByRef.current?.hide();
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#B3B3B3',
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
              }}>
              Sort By Name
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              borderWidth: 0.5,
              borderRadius: 15,
              borderColor: '#33AD66',
              marginVertical: 5,
            }}
            onPress={() => {
              setRentalProduct(
                rentalProduct.sort((a, b) => b.product_price - a.product_price),
              );
              actionSheetShortByRef.current?.hide();
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#B3B3B3',
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
              }}>
              High To Low
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              borderWidth: 0.5,
              borderRadius: 15,
              borderColor: '#33AD66',
              marginVertical: 5,
            }}
            onPress={() => {
              setRentalProduct(
                rentalProduct.sort((a, b) => a.product_price - b.product_price),
              );
              actionSheetShortByRef.current?.hide();
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#B3B3B3',
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
              }}>
              Low To High
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      <Loader modalVisible={loading} setModalVisible={setLoading} />
    </View>
  );
};

export default Rental;

const styles = StyleSheet.create({});
