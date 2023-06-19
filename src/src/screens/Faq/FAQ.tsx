import {View, Text} from 'react-native';
import React from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';

const FAQ = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <SubHeading title="Need Help ?" onPress={() => navigation.goBack()} />
      <Text>FAQ</Text>
    </View>
  );
};

export default FAQ;
