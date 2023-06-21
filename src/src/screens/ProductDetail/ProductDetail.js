import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import ChatIcon from '../../assets/Images/ChatIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductDetail = () => {
  const navigation = useNavigation();
  const data = useRoute();
  const item = data.params.item;
  console.log(item);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* header */}
      <View
        style={{
          padding: 5,
          backgroundColor: '#F0F0F0',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 25,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={15} color="#000" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Poppins-SemiBold',
              color: '#000000',
              lineHeight: 22,
              marginLeft: 10,
            }}>
            {item.title}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            padding: 7,
            backgroundColor: '#159DEA',
            borderRadius: 100,
          }}>
          <ChatIcon color="#fff" width={10} height={9} />
        </TouchableOpacity>
      </View>

      {/* images */}
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
