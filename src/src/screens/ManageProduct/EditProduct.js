import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import PInput from '../../constant/PInput';
import Header from '../../components/Header';
import CategoryDropDown from '../Wholesale/component/CategoryDropDown';
import Button from '../../constant/Button';
import SmallUploadIcon from './icons/SmallUploadIcon';
import RemoveIcon from './icons/RemoveIcon';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';

const EditProduct = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [color, setColor] = useState(null);

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

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}>
        <SubHeading title="Edit Product Details" onPress={() => navigation.goBack()} />
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
          <PInput
            value={price}
            onChangeText={e => setPrice(e)}
            placeholder="Price"
            extraStyle={{marginHorizontal: 0}}
          />
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: '#E6E6E6',
              borderRadius: 100,
              flexDirection: 'row',
              marginTop: 15,
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
          <View
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
          </View>

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
            data={data}
            setValue={setSubCategory}
            value={subCategory}
            placeholder="Sub Category"
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
            data={data}
            setValue={setCategory}
            value={category}
            placeholder="Category"
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
            data={data}
            setValue={setColor}
            value={color}
            placeholder="Color"
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
          <Button
            value="Save Changes"
            textStyle={{fontSize: 11}}
            containerStyle={{marginHorizontal: 0, marginVertical: 10}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProduct;

const styles = StyleSheet.create({});
