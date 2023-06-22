import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import UploadIcon from './icons/UploadIcon';
import RemoveIcon from './icons/RemoveIcon';
import Header from '../../components/Header';

const UploadImage = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading title="Upload Image" onPress={() => navigation.goBack()} />
      <View
        style={{alignSelf: 'flex-end', marginVertical: 20, paddingRight: 20}}>
        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: '#159DEA',
            borderRadius: 13,
            paddingHorizontal: 12,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 11,
              fontFamily: 'Poppins-Regular',
              color: '#fff',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          padding: 20,
          backgroundColor: '#fff',
          elevation: 4,
          borderRadius: 15,
          width: 250,
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <UploadIcon />
        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: '#33AD66',
            borderRadius: 100,
            marginTop: 30,
            paddingHorizontal: 80,
          }}>
          <Text
            style={{color: '#fff', fontSize: 11, fontFamily: 'Poppins-Medium'}}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginVertical: 20,
        }}>
        <View
          style={{
            position: 'relative',
            alignSelf: 'flex-start',
          }}>
          <Image source={require('./imgaes/img1.png')} />
          <TouchableOpacity style={{position: 'absolute', top: 10, right: 10}}>
            <RemoveIcon />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'relative',
            alignSelf: 'flex-start',
          }}>
          <Image source={require('./imgaes/img2.png')} />
          <TouchableOpacity style={{position: 'absolute', top: 10, right: 10}}>
            <RemoveIcon />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'relative',
            alignSelf: 'flex-start',
          }}>
          <Image source={require('./imgaes/img3.png')} />
          <TouchableOpacity style={{position: 'absolute', top: 10, right: 10}}>
            <RemoveIcon />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'relative',
            alignSelf: 'flex-start',
          }}>
          <Image source={require('./imgaes/img4.png')} />
          <TouchableOpacity style={{position: 'absolute', top: 10, right: 10}}>
            <RemoveIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({});
