import {View, Text} from 'react-native';
import React from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Add from '../ManageProduct/icons/Add';

const FAQ = () => {
  const navigation = useNavigation();
  const FaqData = [
    {id: 1, text: 'What is Bright Dealers'},
    {id: 2, text: 'How to use Bright Dealers app'},
    {id: 3, text: 'How to upload items'},
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading title="FAQ" onPress={() => navigation.goBack()} />
      <View style={{margin: 20}}>
        {FaqData.map(item => {
          return (
            <View
              style={{
                padding: 10,
                backgroundColor: '#fff',
                borderRadius: 30,
                borderColor: '#EBEBEB',
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Add />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'Poppins-Regular',
                    marginLeft: 10,
                  }}>
                  {item.text}
                </Text>
              </View>
              <Icon name="keyboard-arrow-down" color={'#B6B6B6'} size={18} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FAQ;
