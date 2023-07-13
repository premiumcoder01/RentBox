import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Add from '../ManageProduct/icons/Add';

const FAQ = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(null);
  const FaqData = [
    {
      id: 1,
      text: 'What is Bright Dealers',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 2,
      text: 'How to use Bright Dealers app',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 3,
      text: 'How to upload items',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading title="FAQ" onPress={() => navigation.goBack()} />
      <View style={{margin: 20}}>
        {FaqData.map((item, index) => {
          return (
            <Pressable
              style={{
                padding: 10,
                backgroundColor: '#fff',
                borderRadius: 30,
                borderColor: '#EBEBEB',
                borderWidth: 1,
                marginBottom: 10,
              }}
              key={index}
              onPress={() => setShow(index)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Add />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'Poppins-Regular',
                    marginLeft: 10,
                    flex: 1,
                  }}>
                  {item.text}
                </Text>
                {show !== index ? (
                  <Icon
                    name="keyboard-arrow-down"
                    color={'#B6B6B6'}
                    size={18}
                  />
                ) : (
                  <Icon name="keyboard-arrow-up" color={'#B6B6B6'} size={18} />
                )}
              </View>
              {show !== index ? null : (
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {item.description}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default FAQ;
