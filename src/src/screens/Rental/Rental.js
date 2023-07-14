import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {createRef, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import SubHeading from '../../constant/SubHeading';
import Filter from '../../assets/Images/Filter';
import ActionSheet from 'react-native-actions-sheet';
import ViewAll from '../Home/images/components/ViewAll';
import CategoryDropDown from '../Wholesale/component/CategoryDropDown';
import Range from '../Wholesale/component/Range';
import Header from '../../components/Header';
import {RadioButton} from 'react-native-paper';
import {GetApi, Post} from '../../utils/Api';
import Loader from '../../constant/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatIcon from '../../assets/Images/ChatIcon';
import Like from '../../assets/Images/Like';
import Constants from '../../utils/Constant';
import Toaster from '../../../Component/Toaster';
import PInput from '../../constant/PInput';
import CheckBox from '@react-native-community/checkbox';
const actionSheetRef = createRef();
const actionSheetShortByRef = createRef();
const Rental = () => {
  const MIN_DEFAULT = 0;
  const data = useRoute();
  const MAX_DEFAULT = 10000;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [categoryList, setCategoryList] = useState(null);
  const [category, setCategory] = useState('');
  const [subCategoryList, setSubCategoryList] = useState(null);
  const [subCategory, setSubCategory] = useState('');

  const [sort, setSort] = useState('');

  const [rentalProduct, setRentalProduct] = useState([]);

  const [selectBoxNewdata, setSelectBoxNewdata] = useState([]);
  const [radioBoxNewdata, setRadioBoxNewdata] = useState([]);
  const [checkBoxNewdata, setCheckBoxNewdata] = useState([]);
  const [textBoxNewdata, setTextBoxNewdata] = useState([]);
  const [fileBoxNewdata, setFileBoxNewdata] = useState([]);
  const [textareaBoxNewdata, setTextareaBoxNewdata] = useState([]);

  const getRentalProductData = async () => {
    setLoading(true);
    const userInfo = await AsyncStorage.getItem('userInfo');
    GetApi(
      `item-search-page?category_type=Rental&current_user_id=${
        JSON.parse(userInfo).user_id
      }&order_by=${sort}`,
    ).then(
      async res => {
        if (res.status == 200) {
          setRentalProduct(res.data.all_item);
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
  const elementRef = useRef();
  useEffect(() => {
    getRentalProductData();
  }, [sort]);

  const handleLike = async id => {
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
            getRentalProductData();
          } else {
            Toaster('Remove from wishList');
            getRentalProductData();
          }
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
    if (JSON.parse(userInfo).user_id == item.user_id) {
      Toaster('This is your product');
    } else {
      Post('chatClick', data).then(
        async res => {
          if (res.status == 200) {
            navigation.navigate('Chat', {
              screen: 'ChatInbox',
              params: {
                user_id: item.user_id,
                user_image: item.image,
                user_name: item.first_name,
              },
            });
          }
        },
        err => {
          console.log(err);
        },
      );
    }
  };

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

  const getAttribute = async id => {
    try {
      const attribute = await fetch(
        `https://dev.codesmile.in/rentbox/public/api/get-category-attribute-data/${id}`,
      );
      const filterAttribute = await attribute.json();
      setSelectBoxNewdata(filterAttribute.data.select);
      setRadioBoxNewdata(filterAttribute.data.radio);
      setCheckBoxNewdata(filterAttribute.data.checkbox);
      setTextBoxNewdata(filterAttribute.data.text);
      setFileBoxNewdata(filterAttribute.data.file);
      setTextareaBoxNewdata(filterAttribute.data.textarea);
    } catch (error) {
      console.log('error');
    }
  };

  const applYFilter = () => {
    /// textfield data
    let selectTextdata = [];
    for (let i = 0; i < textBoxNewdata.length; i++) {
      selectTextdata.push({
        label: textBoxNewdata[i].field_name,
        value: textBoxNewdata[i].field_value,
      });
    }
    console.log(selectTextdata);
    //select dropdown attribute
    let selectDropDowndata = [];
    for (let i = 0; i < selectBoxNewdata.length; i++) {
      for (let j = 0; j < selectBoxNewdata[i].arrayData.length; j++) {
        if (selectBoxNewdata[i].arrayData[j].selected == true) {
          selectDropDowndata.push({
            label: selectBoxNewdata[i].arrayData[j].field_name,
            value: selectBoxNewdata[i].arrayData[j].value,
          });
        }
      }
    }
    console.log(selectDropDowndata);
    //checkbox data select
    let selCheckBoxdata = [];
    for (let i = 0; i < checkBoxNewdata.length; i++) {
      for (let j = 0; j < checkBoxNewdata[i].arrayData.length; j++) {
        if (checkBoxNewdata[i].arrayData[j].selected == true) {
          selCheckBoxdata.push({
            label: checkBoxNewdata[i].field_name,
            value: checkBoxNewdata[i].arrayData[j].value,
          });
        }
      }
    }
    console.log(selCheckBoxdata);
    // radio data
    let selRadioBoxdata = [];
    for (let i = 0; i < radioBoxNewdata.length; i++) {
      for (let j = 0; j < radioBoxNewdata[i].arrayData.length; j++) {
        if (radioBoxNewdata[i].arrayData[j].selected == true) {
          selRadioBoxdata.push({
            label: radioBoxNewdata[i].arrayData[j].field_name,
            value: radioBoxNewdata[i].arrayData[j].value,
          });
        }
      }
    }
    console.log(selRadioBoxdata);
    GetApi(
      `item-search-page?category_type=Rental&category=${category}&sub_category=${subCategory}&min_price=${minValue}&max_price=${maxValue}&${
        (selCheckBoxdata.value, selCheckBoxdata.label)
      }=on`,
    ).then(
      async res => {
        if (res.status == 200) {
          // console.log(res.data.all_item);
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
    setMinValue(MIN_DEFAULT);
    setMaxValue(MAX_DEFAULT);
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

  const textFieldDataInsert = (label, value, field_name) => {
    {
      let newcheckdata = textBoxNewdata.map((mainitem, index) => {
        if (mainitem.field_name == field_name) {
          return {...mainitem, field_value: value};
        } else {
          return mainitem;
        }
      });
      setTextBoxNewdata(newcheckdata);
    }
  };
  const textAreaFieldDataInsert = (label, value, field_name) => {
    {
      let newcheckdata = textareaBoxNewdata.map((mainitem, index) => {
        if (mainitem.field_name == field_name) {
          return {...mainitem, field_value: value};
        } else {
          return mainitem;
        }
      });
      setTextareaBoxNewdata(newcheckdata);
    }
  };
  const selectHandler = (label, value, field_name) => {
    {
      let newcheckdata = selectBoxNewdata.map((mainitem, index) => {
        if (mainitem.field_name == field_name) {
          let insideArray = mainitem.arrayData.map((item, index) => {
            if (item.value === value) {
              return {...item, selected: true};
            } else {
              return {...item, selected: false};
            }
          });

          mainitem.arrayData = insideArray;
          return mainitem;
        } else {
          return mainitem;
        }
      });
      setSelectBoxNewdata(newcheckdata);
    }
  };
  const radioHandler = (label, value, field_name) => {
    {
      let newcheckdata = radioBoxNewdata.map((mainitem, index) => {
        if (mainitem.field_name == field_name) {
          let insideArray = mainitem.arrayData.map((item, index) => {
            if (item.value === value) {
              return {...item, selected: true};
            } else {
              return {...item, selected: false};
            }
          });

          mainitem.arrayData = insideArray;
          return mainitem;
        } else {
          return mainitem;
        }
      });
      setRadioBoxNewdata(newcheckdata);
    }
  };
  const checkBoxHandler = (label, value, field_name) => {
    {
      let newcheckdata = checkBoxNewdata.map((mainitem, index) => {
        if (mainitem.field_name == field_name) {
          let insideArray = mainitem.arrayData.map((item, index) => {
            if (item.value === value) {
              if (item.selected == false) {
                return {...item, selected: true};
              } else if (item.selected == true) {
                return {...item, selected: false};
              }
            } else {
              return item;
            }
          });

          mainitem.arrayData = insideArray;
          return mainitem;
        } else {
          return mainitem;
        }
      });
      setCheckBoxNewdata(newcheckdata);
    }
  };
  const checkSelectedProduct = products => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].selected === true) {
        return products[i].value;
      }
    }
  };

  const options = [
    {id: 1, value: 'date-asc', name: 'Newest First'},
    {id: 1, value: 'name-asc', name: 'Sort By Name'},
    {id: 1, value: 'price-asc', name: 'Price -- Low to High'},
    {id: 1, value: 'price-desc', name: 'Price -- High to Low'},
  ];

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

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <ActivityIndicator color="#33AD66" />
        </View>
      ) : (
        <View
          style={{
            padding: 20,
            paddingTop: 0,
            paddingBottom: 50,
            flex: 1,
            backgroundColor: '#fff',
          }}>
          {rentalProduct ? (
            <FlatList
              data={rentalProduct}
              numColumns={2}
              keyExtractor={item => `${item.id}`}
              contentContainerStyle={{paddingBottom: 50}}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginTop: 10,
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProductDetail', {
                        item: item.product_name,
                      })
                    }>
                    <View style={{position: 'relative', marginBottom: 0}}>
                      <Image
                        source={{
                          uri: `${Constants.imageUrl}category-image/${item.product_image}`,
                        }}
                        resizeMode="contain"
                        style={{
                          marginBottom: 10,
                          height: 150,
                          minWidth: '47%',
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
                          elevation: 3,
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
                          elevation: 3,
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
                        maxWidth: '50%',
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
          ) : (
            <View>
              <Text>no product found</Text>
            </View>
          )}
        </View>
      )}

      {/* filter */}
      <ActionSheet
        ref={actionSheetRef}
        elevation={10}
        gestureEnabled={false}
        initialOffsetFromBottom={5}
        indicatorColor="#33AD66"
        indicatorStyle={{marginTop: 10, height: 5}}
        containerStyle={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 50,
          paddingTop: 20,
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
                clearFilter();
              }}
              text="Clear All Filter"
              style={{
                paddingHorizontal: 10,
                backgroundColor: '#FF0000',
                marginVertical: 0,
                alignSelf: 'flex-end',
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
                  getAttribute(item.id);
                }}
                placeholder="Sub Category"
              />
            )}
            {subCategory !== '' &&
              textBoxNewdata.map((item, index) => {
                return (
                  <View>
                    <Text style={styles.inputHeading}>
                      {item ? item.label : ''}
                    </Text>
                    <PInput
                      value={item ? item.field_value : ''}
                      onChangeText={actualData =>
                        textFieldDataInsert(
                          item.label,
                          actualData,
                          item.field_name,
                        )
                      }
                      extraStyle={{
                        marginHorizontal: 0,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        height: 37,
                        marginTop: 10,
                        borderColor: '#EBEBEB',
                      }}
                    />
                  </View>
                );
              })}
            {subCategory !== '' &&
              textareaBoxNewdata.map((item, index) => {
                return (
                  <View>
                    <Text style={styles.inputHeading}>
                      {item ? item.label : ''}
                    </Text>
                    <PInput
                      value={item ? item.field_value : ''}
                      onChangeText={actualData =>
                        textAreaFieldDataInsert(
                          item.label,
                          actualData,
                          item.field_name,
                        )
                      }
                      extraStyle={{
                        marginHorizontal: 0,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        height: 37,
                        marginTop: 10,
                        borderColor: '#EBEBEB',
                      }}
                    />
                  </View>
                );
              })}
            {subCategory !== '' &&
              selectBoxNewdata.map((item, index) => {
                return (
                  <View>
                    <Text style={styles.inputHeading}>
                      {item ? item.label : ''}
                    </Text>
                    <CategoryDropDown
                      placeholder="Select"
                      maxHeight={300}
                      data={item.arrayData}
                      labelField="label"
                      valueField="value"
                      value={checkSelectedProduct(item.arrayData)}
                      onChange={itemval => {
                        selectHandler(
                          item.label,
                          itemval.value,
                          item.field_name,
                        );
                        // setMonthValue(item.value);
                      }}
                      // dropdownStyle={{
                      //   backgroundColor: '#E6E6E6',
                      //   height: 48,
                      //   paddingHorizontal: 15,
                      // }}
                      // textStyle={{
                      //   fontSize: 12,
                      //   color: '#787878',
                      // }}
                    />
                  </View>
                );
              })}
            {subCategory !== '' &&
              radioBoxNewdata.map((item, index) => {
                return (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.inputHeading}>
                      {item ? item.label : ''} :
                    </Text>
                    {item.arrayData.map((newItem, index) => {
                      return (
                        <View style={{flexDirection: 'row'}}>
                          <RadioButton
                            value={newItem.value}
                            color="green"
                            status={
                              newItem.selected === true
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() =>
                              radioHandler(
                                newItem.label,
                                newItem.value,
                                newItem.field_name,
                              )
                            }
                          />
                          <Text
                            onPress={() =>
                              radioHandler(
                                newItem.label,
                                newItem.value,
                                newItem.field_name,
                              )
                            }
                            style={{marginTop: 6}}>
                            {newItem.label}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            {subCategory !== '' &&
              checkBoxNewdata.map((item, index) => {
                return (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.inputHeading}>
                      {item ? item.label : ''}
                    </Text>
                    {item.arrayData.map((checkval, index) => {
                      return (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <CheckBox
                            style={styles.checkbox}
                            id={'kan_' + checkval.value}
                            name={'kan_' + checkval.value}
                            data-name={'kan_' + checkval.value}
                            ref={elementRef}
                            className={'box'}
                            onValueChange={() =>
                              checkBoxHandler(
                                item.label,
                                checkval.value,
                                item.field_name,
                              )
                            }
                            value={checkval.selected}
                          />
                          <Text style={styles.label}>{checkval.label}</Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
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
                applYFilter();
              }}
              text="Apply"
              style={{
                paddingHorizontal: 10,
                marginRight: 20,
                backgroundColor: '#33AD66',
                marginVertical: 0,
                marginBottom: 20,
                alignSelf:"flex-end"
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
              textTransform: 'uppercase',
            }}>
            Sort By
          </Text>
          {options.map(item => {
            return (
              <TouchableOpacity
                style={{
                  padding: 5,
                  borderWidth: 0.5,
                  borderRadius: 15,
                  borderColor: '#33AD66',
                  marginVertical: 5,
                }}
                onPress={() => {
                  setSort(item.value);
                  // getRentalProductData();
                  actionSheetShortByRef.current?.hide();
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#33AD66',
                    fontFamily: 'Poppins-SemiBold',
                    textAlign: 'center',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ActionSheet>
      {/* <Loader modalVisible={loading} setModalVisible={setLoading} /> */}
    </View>
  );
};

export default Rental;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#9e9e9eb8',
  },
  inputHeading: {
    fontSize: 13,
    marginTop: 10,
    marginHorizontal: 10,
  },
});
