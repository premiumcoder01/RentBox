import {View, Text} from 'react-native';
import React from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

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
      <View>
        
      </View>
    </View>
  );
};

export default FAQ;
