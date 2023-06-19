import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';

const Help = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      contentContainerStyle={{paddingBottom: 80}}
      showsVerticalScrollIndicator={false}>
      <SubHeading title="Need Help ?" onPress={() => navigation.goBack()} />
      <View style={{position: 'relative', marginBottom: 20}}>
        <Image source={require('./img/Help.png')} />
        <Text
          style={{
            position: 'absolute',
            fontSize: 15,
            lineHeight: 19,
            fontFamily: 'Poppins-SemiBold',
            color: '#159DEA',
            left: 20,
            top: 40,
          }}>
          Need Some Help
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 12,
            fontFamily: 'Poppins-Regular',
            position: 'absolute',
            left: 20,
            top: 70,
          }}>
          Lorem ipsum dolor si...
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: 30,
          paddingVertical: 12,
          paddingHorizontal: 20,
          marginHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 25,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Text
          style={{
            color: '#666666',
            fontSize: 12,
            fontFamily: 'Poppins-Regular',
            lineHeight: 16,
            marginBottom: 20,
          }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book,{' '}
          <TouchableOpacity>
            <Text style={{color: '#159DEA'}}>support@brightdealers.com</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Help;
