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
  const [like, setLike] = useState('');

  const product = props.data;
  

  const handleChat = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    const data = {
      current_user_id: JSON.parse(userInfo).user_id,
      receiver_id: product.user_id,
    };
    Post('chatClick', data).then(
      async res => {
        if (res.status == 200) {
          console.log(res, '+++++..>>>>');
          navigation.navigate('Chat', {screen: 'ChatList'});
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  const handleLike = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    const data = {
      user_id: JSON.parse(userInfo).user_id,
      product_id: product.id,
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
          onPress={() => handleLike()}>
          <Like color={like !== 'insert' ? '#B3B3B3' : '#FF0000'} />
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
