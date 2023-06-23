import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import SubHeading from '../../constant/SubHeading';
import Header from '../../components/Header';
import Logo from '../../assets/Images/Logo';
import FaceBook from './icon/FaceBook';
import Instagram from './icon/Instagram';
import Twitter from './icon/Twitter';
import Linkdein from './icon/Linkdein';
import {useNavigation} from '@react-navigation/native';

const FollowUs = () => {
  const navigation = useNavigation();
  const social = [
    {
      id: 1,
      icon: <FaceBook />,
    },
    {
      id: 2,
      icon: <Twitter />,
    },
    {
      id: 3,
      icon: <Linkdein />,
    },
    {
      id: 4,
      icon: <Instagram />,
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading title="Follow" onPress={() => navigation.goBack()} />
      <View style={{margin: 20, alignItems: 'center', marginBottom: 10}}>
        <Logo width={118} />
        <Text
          style={{
            color: '#666666',
            fontSize: 12,
            fontFamily: 'Poppins-SemiBold',
            marginTop: 8,
            textAlign: 'center',
          }}>
          Follow us to connect Bright Dealers, Lorem Ipsum is simply dummy text
          of the printing and typesetting industry.
        </Text>
      </View>
      <View style={{height: 2, backgroundColor: '#F0F0F0'}} />
      <View style={{marginVertical: 10, alignItems: 'center'}}>
        <Text
          style={{color: '#000', fontSize: 16, fontFamily: 'Poppins-SemiBold'}}>
          Share to your friend by using this
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {social.map(item => {
            return (
              <TouchableOpacity
                style={{
                  padding: 8,
                  backgroundColor: '#fff',
                  borderRadius: 100,
                  elevation: 5,
                  marginHorizontal: 5,
                }}>
                {item.icon}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default FollowUs;
