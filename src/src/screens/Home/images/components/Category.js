import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import TitleText from './TitleText';

const Category = (props) => {
  const data = [
    {
      id: 1,
      image: require('../category/Appliances.png'),
      title: 'Appliances',
    },
    {
      id: 2,
      image: require('../category/Electronics.png'),
      title: 'Electronics',
    },
    {
      id: 3,
      image: require('../category/Fitness.png'),
      title: 'Fitness',
    },
    {
      id: 4,
      image: require('../category/Furniture.png'),
      title: 'Furniture',
    },
    {
      id: 5,
      image: require('../category/Appliances.png'),
      title: 'Appliances',
    },
    {
      id: 6,
      image: require('../category/Electronics.png'),
      title: 'Electronics',
    },
    {
      id: 7,
      image: require('../category/Fitness.png'),
      title: 'Fitness',
    },
    {
      id: 8,
      image: require('../category/Furniture.png'),
      title: 'Furniture',
    },
  ];

  return (
    <View style={{marginHorizontal: 20, marginBottom: 25}}>
      <View
        style={{
          padding: 15,
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
          {data.map((item,index) => {
            return (
              <View
                style={{
                  marginHorizontal: 5,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                key={index}>
                <View
                  style={{
                    padding: 15,
                    height: 60,
                    width: 60,
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
                    source={item.image}
                    style={{height: 30, width: 30}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: 'Poppins-Medium',
                    color: props.textColor,
                  }}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Category;
