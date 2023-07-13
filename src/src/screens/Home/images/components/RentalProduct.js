import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import Like from '../../../../assets/Images/Like';
import ChatIcon from '../../../../assets/Images/ChatIcon';
import Constants from '../../../../utils/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Post} from '../../../../utils/Api';
import Toaster from '../../../../../Component/Toaster';
import {useNavigation} from '@react-navigation/native';

const RentalProduct = props => {
  const navigation = useNavigation();

  const product = props.data;

  const handleChat = async product => {
    console.log(product);
    const userInfo = await AsyncStorage.getItem('userInfo');
    const data = {
      current_user_id: JSON.parse(userInfo).user_id,
      receiver_id: product.user_id,
    };
    if (JSON.parse(userInfo).user_id == product.user_id) {
      Toaster('This is your product');
    } else {
      Post('chatClick', data).then(
        async res => {
          if (res.status == 200) {
            navigation.navigate('Chat', {
              screen: 'ChatInbox',
              params: {
                user_id: product.user_id,
                // user_image: productDetail.user_image,
                user_name: product.first_name,
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

  return (
    <TouchableOpacity
      style={{
        width: 150,
        marginTop: 10,
      }}
      onPress={props.onPress}>
      <View style={{position: 'relative', marginBottom: 0}}>
        <Image
          source={{
            uri: `${Constants.imageUrl}category-image/${props.source}`,
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
            backgroundColor: props.chatBackground || '#33AD66',
            borderRadius: 100,
          }}
          onPress={() => handleChat(product)}>
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
          onPress={props.handleLike}>
          <Like color={props.like !== 'insert' ? '#B3B3B3' : '#FF0000'} />
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
        {props.title}
      </Text>
      <Text
        style={{
          color: '#000000',
          fontSize: 10,
          fontFamily: 'Poppins-Medium',
          marginLeft: 5,
        }}>
        $ {props.price} / month
      </Text>
    </TouchableOpacity>
  );
};

export default RentalProduct;
