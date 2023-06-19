import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';

const AboutUs = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      contentContainerStyle={{paddingBottom: 80}}
      showsVerticalScrollIndicator={false}>
      <SubHeading title="About Us" onPress={() => navigation.goBack()} />
      <View style={{position: 'relative', marginBottom: 20}}>
        <Image source={require('./img/base.png')} />
        <Image
          source={require('./img/vector.png')}
          style={{position: 'absolute', bottom: 0}}
        />
        <Image
          source={require('./img/user.png')}
          style={{position: 'absolute', bottom: 0}}
        />
        <Text
          style={{
            color: '#159DEA',
            fontSize: 15,
            fontFamily: 'Poppins-SemiBold',
            position: 'absolute',
            left: '45%',
            top: '30%',
          }}>
          About Bright Dealers
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 12,
            fontFamily: 'Poppins-Regular',
            position: 'absolute',
            left: '45%',
            top: '50%',
            right: 10,
            flexWrap: 'wrap',
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
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
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            lineHeight: 24,
            color: '#159DEA',
            marginBottom: 3,
          }}>
          About us
        </Text>
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
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing.
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            lineHeight: 24,
            color: '#159DEA',
            marginBottom: 3,
          }}>
          Our Story
        </Text>
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
          scrambled it to make a type specimen book. It has survived... Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived...
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutUs;
