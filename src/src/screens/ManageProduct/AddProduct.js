import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import PInput from '../../constant/PInput';
import Header from '../../components/Header';
import CategoryDropDown from '../Wholesale/component/CategoryDropDown';
import Button from '../../constant/Button';
import SmallUploadIcon from './icons/SmallUploadIcon';
import RemoveIcon from './icons/RemoveIcon';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import {RadioButton} from 'react-native-paper';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../../../Component/Toaster';

const AddProduct = () => {
  const navigation = useNavigation();

  const [category, setCategory] = useState();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState(null);
  const [subCategory, setSubCategory] = useState();
  const [selCatName, setSelCatName] = useState('');
  const [setMainCatId, selSetMainCatId] = useState('');
  const [setSubMainCatId, selSetSubMainCatId] = useState('');
  const [selSubCatName, setSelSubCatName] = useState('');
  const [arrayImage, setArrayImage] = useState('');
  const [arrayImageFieldName, setArrayImageFieldName] = useState('');
  ///////  New const
  const [selectBoxNewdata, setSelectBoxNewdata] = useState([]);
  const [radioBoxNewdata, setRadioBoxNewdata] = useState([]);
  const [checkBoxNewdata, setCheckBoxNewdata] = useState([]);
  const [textBoxNewdata, setTextBoxNewdata] = useState([]);
  const [fileBoxNewdata, setFileBoxNewdata] = useState([]);
  const [textareaBoxNewdata, setTextareaBoxNewdata] = useState([]);

  const data = [
    {label: 'GBP', value: 'GBP'},
    {label: 'USD', value: 'USD'},
    {label: 'INR', value: 'INR'},
  ];

  const getCategoryData = async () => {
    try {
      const data = await fetch(
        'https://dev.codesmile.in/rentbox/public/api/get-all-category',
      );
      const response = await data.json();
      setCategory(response.data.category_data_list);
    } catch (error) {
      console.error(error);
    }
  };

  const elementRef = useRef();
  useEffect(() => {
    getCategoryData();
  }, []);

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      const docFinal = {
        uri: doc[0].uri,
        type: doc[0].type,
        name: doc[0].name,
      };
      setImage(docFinal);
      console.log('document select', docFinal);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User Cancelled the upload', err);
      } else {
        console.log(err);
      }
    }
  };
  const selectArrayDoc = async field_name => {
    try {
      const docc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      const docFinalNew = {
        uri: docc[0].uri,
        type: docc[0].type,
        name: docc[0].name,
      };
      setArrayImage(docFinalNew);
      setArrayImageFieldName(field_name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User Cancelled the upload', err);
      } else {
        console.log(err);
      }
    }
  };

  const getSubCateory = async id => {
    try {
      const subFilterCategory = await fetch(
        `https://dev.codesmile.in/rentbox/public/api/get-all-sub-category/${id}`,
      );
      const filterResponse = await subFilterCategory.json();
      setSubCategory(filterResponse.data.sub_category);
    } catch (error) {
      console.log('error');
    }
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

  const uploadItem = async () => {
    console.log('submit click');
    if (!name) {
      Toaster('Enter name please..');
    } else if (!price) {
      Toaster('Price not be empty');
    } else if (!description) {
      Toaster('Description not be null');
    } else if (!currency) {
      Toaster('Currency should be selected ');
    } else {
      const user = await AsyncStorage.getItem('userInfo');
      const userId = JSON.parse(user).user_id;
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('product_name', name);
      formData.append('currency', currency);
      formData.append('product_price', price);
      formData.append('product_description', description);
      formData.append('category', setMainCatId);
      formData.append('sub_category', setSubMainCatId);
      formData.append('product_image', image);
      if (arrayImage != '') {
        formData.append(arrayImageFieldName, arrayImage);
      }

      /// textfield data
      for (let i = 0; i < textBoxNewdata.length; i++) {
        formData.append(
          textBoxNewdata[i].field_name,
          textBoxNewdata[i].field_value,
        );
      }
      for (let i = 0; i < selectBoxNewdata.length; i++) {
        for (let j = 0; j < selectBoxNewdata[i].arrayData.length; j++) {
          if (selectBoxNewdata[i].arrayData[j].selected == true) {
            formData.append(
              selectBoxNewdata[i].arrayData[j].field_name,
              selectBoxNewdata[i].arrayData[j].value,
            );
          }
        }
      }
      //////  radio data
      for (let i = 0; i < radioBoxNewdata.length; i++) {
        for (let j = 0; j < radioBoxNewdata[i].arrayData.length; j++) {
          if (radioBoxNewdata[i].arrayData[j].selected == true) {
            console.log(radioBoxNewdata[i].arrayData[j].value);
            formData.append(
              radioBoxNewdata[i].arrayData[j].field_name,
              radioBoxNewdata[i].arrayData[j].value,
            );
          }
        }
      }
      //////// CheckBox Data
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
      formData.append('checkBoxData', JSON.stringify(selCheckBoxdata));
      axios({
        method: 'post',
        url: 'https://dev.codesmile.in/rentbox/public/api/upload-used-item',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          //handle success
          Toaster('You have successfully uploaded item');
          navigation.navigate('Manage Products');
          console.log(response.data);
        })
        .catch(function (response) {
          //handle error
          Toaster('Something went wrong');
        });
    }
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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}>
        <SubHeading
          title="Add Product Details"
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 10,
            backgroundColor: '#fff',
            borderRadius: 25,
            margin: 20,
            elevation: 4,
          }}>
          <PInput
            value={name}
            onChangeText={e => setName(e)}
            placeholder="Name"
            extraStyle={{marginHorizontal: 0}}
          />
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: '#E6E6E6',
              borderRadius: 100,
              flexDirection: 'row',
              marginTop: 15,
            }}
            onPress={() => {
              selectDoc();
            }}>
            <SmallUploadIcon />
            <Text
              style={{
                fontSize: 12,
                color: '#787878',
                fontFamily: 'Poppins-Regular',
                marginLeft: 12,
              }}>
              ChooseImage
            </Text>
          </TouchableOpacity>
          <CategoryDropDown
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={currency}
            onChange={item => {
              setCurrency(item.value);
            }}
            placeholder="Currency"
            dropdownStyle={{
              backgroundColor: '#E6E6E6',
              height: 48,
              paddingHorizontal: 15,
            }}
            textStyle={{
              fontSize: 12,
              color: '#787878',
            }}
          />

          <PInput
            value={price}
            onChangeText={e => setPrice(e)}
            placeholder="Price"
            extraStyle={{marginHorizontal: 0}}
          />

          {/* <View
            style={{
              position: 'relative',
              alignSelf: 'flex-start',
              marginTop: 10,
            }}>
            <Image source={require('./imgaes/img2.png')} />
            <TouchableOpacity
              style={{position: 'absolute', top: 10, right: 10}}>
              <RemoveIcon />
            </TouchableOpacity>
          </View> */}

          <PInput
            value={description}
            onChangeText={e => setDescription(e)}
            placeholder="Add Description"
            extraStyle={{
              marginHorizontal: 0,
              width: '100%',
              borderRadius: 20,
            }}
            extraTextStyle={{
              fontSize: 13,
              height: 200,
              paddingTop: 10,
              textAlignVertical: 'top',
            }}
            multiline={true}
          />
          <CategoryDropDown
            placeholder="Select Category"
            data={category}
            value={selCatName}
            onChange={item => {
              setSelCatName(item.name);
              getSubCateory(item.id);
              selSetMainCatId(item.id);
            }}
            maxHeight={300}
            labelField="name"
            valueField="name"
            dropdownStyle={{
              backgroundColor: '#E6E6E6',
              height: 48,
              paddingHorizontal: 15,
            }}
            textStyle={{
              fontSize: 12,
              color: '#787878',
            }}
          />
          {subCategory && (
            <CategoryDropDown
              placeholder="Select Sub Category"
              data={subCategory}
              value={selSubCatName}
              maxHeight={300}
              labelField="name"
              valueField="name"
              onChange={item => {
                setSelSubCatName(item.name);
                getAttribute(item.id);
                selSetSubMainCatId(item.id);
              }}
              dropdownStyle={{
                backgroundColor: '#E6E6E6',
                height: 48,
                paddingHorizontal: 15,
              }}
              textStyle={{
                fontSize: 12,
                color: '#787878',
              }}
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
                    textFieldDataInsert(item.label, actualData, item.field_name)
                  }
                  extraStyle={{marginHorizontal: 0}}
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
                />
              </View>
            );
          })}
          {fileBoxNewdata.map((item, index) => {
            return (
              <View>
                <Text style={styles.inputHeading}>
                  {item ? item.label : ''}
                </Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    selectArrayDoc(item.field_name);
                  }}>
                  <Text style={{fontSize: 13}}>Upload Image</Text>
                </TouchableOpacity>
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
                    // setMonthValue(item.value);
                  }}
                  dropdownStyle={{
                    backgroundColor: '#E6E6E6',
                    height: 48,
                    paddingHorizontal: 15,
                  }}
                  textStyle={{
                    fontSize: 12,
                    color: '#787878',
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
                    <View style={{flexDirection: 'row'}}>
                      <RadioButton
                        value={newItem.value}
                        color="green"
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

          <Button
            value="Submit"
            textStyle={{fontSize: 11}}
            containerStyle={{marginHorizontal: 0, marginVertical: 10}}
            onPress={() => {
              uploadItem();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddProduct;

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
