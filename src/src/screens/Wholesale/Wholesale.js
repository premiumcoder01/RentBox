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
import CheckBox from '@react-native-community/checkbox';
import {RadioButton} from 'react-native-paper';
import PInput from '../../constant/PInput';
const actionSheetRef = createRef();
const actionSheetShortByRef = createRef();
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

  const [selectBoxNewdata, setSelectBoxNewdata] = useState([]);
  const [radioBoxNewdata, setRadioBoxNewdata] = useState([]);
  const [checkBoxNewdata, setCheckBoxNewdata] = useState([]);
  const [textBoxNewdata, setTextBoxNewdata] = useState([]);
  const [fileBoxNewdata, setFileBoxNewdata] = useState([]);
  const [textareaBoxNewdata, setTextareaBoxNewdata] = useState([]);

  const [sortedData, setSortedData] = useState([]);

  const getWholeSaleProductData = () => {
    // setLoading(true);
    GetApi('item-search-page?category_type=Wholesale').then(
      async res => {
        if (res.status == 200) {
          setWholeSaleProduct(res.data.all_item);
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
    getWholeSaleProductData();
  }, []);

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
    // setLoading(true);
    GetApi(`item-search-page?category_type=Wholesale`).then(
      async res => {
        if (res.status == 200) {
          setWholeSaleProduct(res.data.all_item);
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
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => actionSheetShortByRef.current?.setModalVisible()}>
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
                data={item}
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
                  getAttribute(item.id);
                }}
                placeholder="Sub Category"
              />
            )}
            {textBoxNewdata.map((item, index) => {
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
            {textareaBoxNewdata.map((item, index) => {
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
            {selectBoxNewdata.map((item, index) => {
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
                      selectHandler(item.label, itemval.value, item.field_name);
                    }}
                  />
                </View>
              );
            })}
            {radioBoxNewdata.map((item, index) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.inputHeading}>
                    {item ? item.label : ''} :
                  </Text>
                  {item.arrayData.map((newItem, index) => {
                    return (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton
                          value={newItem.value}
                          color="#159DEA"
                          status={
                            newItem.selected === true ? 'checked' : 'unchecked'
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
            {checkBoxNewdata.map((item, index) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.inputHeading}>
                    {item ? item.label : ''}
                  </Text>
                  {item.arrayData.map((checkval, index) => {
                    return (
                      <View style={{display: 'flex', flexDirection: 'row'}}>
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

      {/* sortby */}
      <ActionSheet
        ref={actionSheetShortByRef}
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
        <View
          style={{
            backgroundColor: '#fff',
            borderTopRightRadius: 50,
            margin: 10,
            borderTopLeftRadius: 50,
          }}>
          <Text
            style={{
              color: '#159DEA',
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
              borderColor: '#159DEA',
              marginVertical: 5,
            }}
            onPress={() => { 
              let tempData = wholeSaleProduct.sort((a, b) =>
                a.product_name > b.product_name ? 1 : -1,
              ); 
              console.log(tempData);
              setWholeSaleProduct(tempData);
              actionSheetShortByRef.current?.hide();
            }}>
            <Text
              style={{
                fontSize: 13,
                color: '#159DEA',
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
              borderColor: '#159DEA',
              marginVertical: 5,
            }}
            onPress={() => {
              setWholeSaleProduct(
                wholeSaleProduct.sort(
                  (a, b) => b.product_price - a.product_price,
                ),
              );
              actionSheetShortByRef.current?.hide();
            }}>
            <Text
              style={{
                fontSize: 13,
                color: '#159DEA',
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
              borderColor: '#159DEA',
              marginVertical: 5,
            }}
            onPress={() => {
              setWholeSaleProduct(
                wholeSaleProduct.sort(
                  (a, b) => a.product_price - b.product_price,
                ),
              );
              actionSheetShortByRef.current?.hide();
            }}>
            <Text
              style={{
                fontSize: 13,
                color: '#159DEA',
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

export default Wholesale;

const styles = StyleSheet.create({
  actionMainView: {
    backgroundColor: '#fff',
    borderTopRightRadius: 50,
    marginBottom: 10,
    borderTopLeftRadius: 50,
  },
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
