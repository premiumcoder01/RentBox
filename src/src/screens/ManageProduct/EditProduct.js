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
import React, {useEffect, useState} from 'react';
import PInput from '../../constant/PInput';
import Header from '../../components/Header';
import CategoryDropDown from '../Wholesale/component/CategoryDropDown';
import Button from '../../constant/Button';
import SmallUploadIcon from './icons/SmallUploadIcon';
import RemoveIcon from './icons/RemoveIcon';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import {GetApi} from '../../utils/Api';
import {RadioButton} from 'react-native-paper';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../../../Component/Toaster';

const EditProduct = props => {
  const navigation = useNavigation();

  const product = props.route.params.product;
  const [image, setImage] = useState('');

  const [list, setList] = useState('');
  const [listCategory, setListCategory] = useState([]);
  const [listSubCategory, setListSubCategory] = useState([]);
  const [selCatName, setSelCatName] = useState('');
  const [selSubCatName, setSelSubCatName] = useState('');
  const [setMainCatId, selSetMainCatId] = useState('');
  const [subMainCatId, setSubMainCatId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState(null);
  const [productId, setProductId] = useState('');
  const [type, setType] = useState('');
  const [arrayImage, setArrayImage] = useState('');
  const [arrayImageFieldName, setArrayImageFieldName] = useState('');
  const [selectBoxNewdata, setSelectBoxNewdata] = React.useState([]);
  const [radioBoxNewdata, setRadioBoxNewdata] = React.useState([]);
  const [checkBoxNewdata, setCheckBoxNewdata] = React.useState([]);
  const [textBoxNewdata, setTextBoxNewdata] = React.useState([]);
  const [fileBoxNewdata, setFileBoxNewdata] = React.useState([]);
  const [textareaBoxNewdata, setTextareaBoxNewdata] = React.useState([]);

  useEffect(() => {
    getEditItem();
    return () => {
      setList([]);
    };
  }, []);

  const types = [
    {
      id: 1,
      value: 'Rental',
    },
    {
      id: 1,
      value: 'Wholesale',
    },
  ];
  const getEditItem = async () => {
    GetApi(`edit-product/${product}`).then(
      async res => {
        if (res.status == 200) {
          console.log(res.data)
          setList(res.data.attribute_field);
          setListCategory(res.data.category_data);
          setListSubCategory(res.data.sub_category_data);
          setSelCatName(res.data.sel_cat_name.name);
          setSelSubCatName(res.data.sel_sub_cat_name.name);
          selSetMainCatId(res.data.sel_cat_name.id);
          setSubMainCatId(res.data.sel_sub_cat_name.id);
          getAttributeEdit(res.data.sel_sub_cat_name.id, product);
          setName(res.data.attribute_field.product_name);
          setPrice(res.data.attribute_field.product_price);
          setType(res.data.attribute_field.product_type)
          setDescription(res.data.attribute_field.product_description);
          setCurrency(res.data.attribute_field.currency);
          setProductId(product);
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  const getAttributeEdit = async (id, product_id) => {
    try {
      const attribute = await fetch(
        `https://dev.codesmile.in/rentbox/public/api/get-category-attribute-data-edit/${id}/${product_id}`,
      );
      const filterAttribute = await attribute.json();
      setSelectBoxNewdata(filterAttribute.data.select);
      setRadioBoxNewdata(filterAttribute.data.radio);
      setCheckBoxNewdata(filterAttribute.data.checkbox);
      setTextBoxNewdata(filterAttribute.data.text);
      setFileBoxNewdata(filterAttribute.data.file);
      setTextareaBoxNewdata(filterAttribute.data.textarea);
    } catch (error) {
      console.log('error', error);
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
      console.log('error', error);
    }
  };

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
      console.log(image);
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
              // if (item.selected == false) {
              //     return { ...item, selected: true };
              // } else if (item.selected == true) {
              //     return { ...item, selected: false };
              // }
            } else {
              return {...item, selected: false};
              //return item;
            }
          });

          mainitem.arrayData = insideArray;
          return mainitem;
        } else {
          return mainitem;
        }
      });
      setSelectBoxNewdata(newcheckdata);
      // console.log('selectBoxNewdata---------');
      // console.log(newcheckdata[0].arrayData);
    }
  };
  const radioHandler = (label, value, field_name) => {
    {
      let newcheckdata = radioBoxNewdata.map((mainitem, index) => {
        if (mainitem.field_name == field_name) {
          let insideArray = mainitem.arrayData.map((item, index) => {
            if (item.value === value) {
              return {...item, selected: true};
              // if (item.selected == false) {
              //     return { ...item, selected: true };
              // } else if (item.selected == true) {
              //     return { ...item, selected: false };
              // }
            } else {
              return {...item, selected: false};
              //return item;
            }
          });

          mainitem.arrayData = insideArray;
          return mainitem;
        } else {
          return mainitem;
        }
      });

      setRadioBoxNewdata(newcheckdata);
      //console.log('radioBoxNewdata');
      //console.log(radioBoxNewdata);
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

  const getSubCateory = async id => {
    try {
      const subFilterCategory = await fetch(
        `https://dev.codesmile.in/rentbox/public/api/get-all-sub-category/${id}`,
      );
      const filterResponse = await subFilterCategory.json();
      setListSubCategory(filterResponse.data.sub_category);
      setArrayImage('');
      setArrayImageFieldName('');
      setSelectBoxNewdata([]);
      setRadioBoxNewdata([]);
      setCheckBoxNewdata([]);
      setTextBoxNewdata([]);
      setFileBoxNewdata([]);
      setTextareaBoxNewdata([]);
      setSelSubCatName('');
      setSubMainCatId('');
    } catch (error) {
      console.log('error');
    }
  };

  const checkSelectedProduct = products => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].selected === true) {
        return products[i].value;
      }
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
      formData.append('id', productId);
      formData.append('user_id', userId);
      formData.append('product_name', name);
      formData.append('currency', currency);
      formData.append('product_price', price);
      formData.append('product_type', type);
      formData.append('product_description', description);
      formData.append('category', setMainCatId);
      formData.append('sub_category', subMainCatId);
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
      console.log('---------------------------');
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
        url: 'https://dev.codesmile.in/rentbox/public/api/update-product',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          //handle success
          Toaster('successfully updated item');
          // navigation.navigate('Myuseditem');
          navigation.navigate('Manage Products');
          console.log(response.data);
        })
        .catch(function (response) {
          //handle error
          Toaster('Something went wrong');
          console.log(response.data);
        });
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
          title="Edit Product Details"
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
          <PInput
            value={price}
            onChangeText={e => setPrice(e)}
            placeholder="Price"
            extraStyle={{marginHorizontal: 0}}
          />

          <CategoryDropDown
            data={types}
            maxHeight={300}
            labelField="value"
            valueField="value"
            value={type}
            onChange={item => {
              setType(item.value);
            }}
            placeholder="Type"
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
            data={listCategory}
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
          <CategoryDropDown
            placeholder="Select Sub Category"
            data={listSubCategory}
            value={selSubCatName}
            onChange={item => {
              setSelSubCatName(item.name);
              setSubMainCatId(item.id);
              getAttribute(item.id);
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
          {textBoxNewdata.map((item, index) => {
            return (
              <View>
                <Text style={styles.inputHeading}>
                  {item ? item.label : ''} :
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={actualData =>
                    textFieldDataInsert(item.label, actualData, item.field_name)
                  }>
                  <Text style={styles.inputHeading}>
                    {item ? item.field_value : ''}
                  </Text>
                </TextInput>
              </View>
            );
          })}
          {textareaBoxNewdata.map((item, index) => {
            return (
              <View>
                <Text style={styles.inputHeading}>
                  {item ? item.label : ''} :
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={actualData =>
                    textAreaFieldDataInsert(
                      item.label,
                      actualData,
                      item.field_name,
                    )
                  }>
                  <Text style={styles.inputHeading}>
                    {item ? item.field_value : ''}
                  </Text>
                </TextInput>
              </View>
            );
          })}
          {fileBoxNewdata.map((item, index) => {
            return (
              <View>
                <Text style={styles.inputHeading}>
                  {item ? item.label : ''} :
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
                  {item ? item.label : ''} :
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
                  {item ? item.label : ''} :
                </Text>
                {item.arrayData.map((checkval, index) => {
                  return (
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <CheckBox
                        style={styles.checkbox}
                        id={'kan_' + checkval.value}
                        name={'kan_' + checkval.value}
                        data-name={'kan_' + checkval.value}
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
                      <Text style={{paddingTop: 5}}>{checkval.label}</Text>
                    </View>
                  );
                })}
              </View>
            );
          })}

          <Button
            value="Save Changes"
            textStyle={{fontSize: 11}}
            containerStyle={{marginHorizontal: 0, marginVertical: 10}}
            onPress={() => uploadItem()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProduct;

const styles = StyleSheet.create({});
