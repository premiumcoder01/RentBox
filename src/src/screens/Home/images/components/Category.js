import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import TitleText from './TitleText';
import Constants from '../../../../utils/Constant';
import {useNavigation} from '@react-navigation/native';

const Category = props => {
  const navigation = useNavigation();

  return (
    <View style={{marginHorizontal: 20, marginBottom: 25}}>
      <View
        style={{
          paddingVertical: 15,
          backgroundColor: props.backgroundColor,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <TitleText title={props.title} color="#fff" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {props.Category?.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  marginHorizontal: 8,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                key={index}
                onPress={() =>
                  navigation.navigate(props.type, {catName: item.name})
                }>
                <View
                  style={{
                    padding: 12,
                    backgroundColor: '#fff',
                    borderRadius: 100,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 6,
                    },
                    shadowOpacity: 0.39,
                    shadowRadius: 8.3,
                    elevation: 3,
                    marginBottom: 5,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={{
                      uri: `${Constants.imageUrl}category-image/${item.image}`,
                    }}
                    style={{height: 40, width: 40}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: 'Poppins-Medium',
                    color: props.textColor,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Category;
