import {View, Image, Dimensions} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';

const data = [
  {id: 1, img: require('../carasouel/g1.png')},
  {id: 2, img: require('../carasouel/g2.png')},
  {id: 3, img: require('../carasouel/g3.png')},
];

const Carasouel = () => {
  const width = Dimensions.get('window').width;
  return (
    <Carousel
      loop
      width={width}
      mode={'parallax'}
      height={width / 2}
      autoPlay={true}
      data={data}
      scrollAnimationDuration={2000}
      renderItem={item => {
        return (
          <View>
            <Image
              source={item.item.img}
              resizeMode="contain"
              style={{width: 400, height: '100%', alignSelf: 'center'}}
            />
          </View>
        );
      }}
    />
  );
};

export default Carasouel;
