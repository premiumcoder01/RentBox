import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const Slider = () => {
  const carouselData = [
    {
      image: require('../carasouel/g1.png'),
    },
    {
      image: require('../carasouel/g2.png'),
    },
    {
      image: require('../carasouel/g3.png'),
    },
  ];
  const {width} = Dimensions.get('window');

  return (
    <View style={{paddingBottom: 20}}>
      <GestureHandlerRootView>
        <Carousel
          loop
          width={width}
          height={width / 2}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.8,
            parallaxScrollingOffset: 90,
          }}
          autoPlay={true}
          data={carouselData}
          scrollAnimationDuration={1000}
          renderItem={({item}) => {
            return (
              <View style={{flex: 1}}>
                <Image
                  style={{width: '100%', height: 200}}
                  resizeMode="contain"
                  source={item.image}
                />
              </View>
            );
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 30,
    // aspectRatio: 16 / 9,
  },
});
