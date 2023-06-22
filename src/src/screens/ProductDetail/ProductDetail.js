import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import ChatIcon from '../../assets/Images/ChatIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ImageBackground} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
import ShareIcon from '../../assets/Images/ShareIcon';
import Wish from '../../assets/Images/ProfileIcons/WishList';
import ProductButton from './ProductButton';
import product from '../Home/images/product/product';
import RentalProduct from '../Home/images/components/RentalProduct';
import Header from '../../components/Header';

const ProductDetail = () => {
  const img = [
    require('../../assets/Images/img/p1.png'),
    require('../../assets/Images/img/p2.png'),
    require('../../assets/Images/img/p3.png'),
    require('../../assets/Images/img/p4.png'),
    require('../../assets/Images/img/p5.png'),
  ];
  const navigation = useNavigation();
  const data = useRoute();
  const item = data.params.item;
  const width = Dimensions.get('window').width;
  const [currentindex, setCurrentIndex] = useState(0);

  const selectImage = index => {
    setCurrentIndex(index);
  };
  const preNext = type => {
    if (type === 'pre') {
      if (currentindex !== 0) {
        setCurrentIndex(currentindex - 1);
      } else {
        setCurrentIndex(img.length - 1);
      }
    } else {
      if (currentindex !== img.length - 1) {
        setCurrentIndex(currentindex + 1);
      } else {
        setCurrentIndex(0);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />

      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 70}}>
        {/* header */}
        <View
          style={{
            padding: 5,
            backgroundColor: '#F0F0F0',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 25,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-ios" size={15} color="#000" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Poppins-SemiBold',
                color: '#000000',
                lineHeight: 22,
                marginLeft: 10,
              }}>
              {item.title}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              padding: 7,
              backgroundColor: '#159DEA',
              borderRadius: 100,
            }}>
            <ChatIcon color="#fff" width={10} height={9} />
          </TouchableOpacity>
        </View>

        {/* images */}
        <View
          style={{
            width: width - 40,
            height: 200,
            position: 'relative',
            margin: 20,
            // borderRadius: 20,
            // borderWidth: 0.5,
            backgroundColor: 'white',
          }}>
          <ImageBackground
            resizeMode="contain"
            source={img[currentindex]}
            style={{
              height: 180,
              marginTop: 10,
            }}>
            {img.length > 1 && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingRight: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity>
                  <Ionicons
                    name="chevron-back"
                    color={'black'}
                    size={20}
                    onPress={() => {
                      preNext('pre');
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="chevron-forward"
                    color={'black'}
                    size={20}
                    onPress={() => preNext('next')}
                  />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity style={{position: 'absolute', right: 10}}>
              <ShareIcon />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        {/* rest-images */}
        <View style={styles.mainImage}>
          {img.length > 0 &&
            img.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[{marginRight: 5}]}
                onPress={() => {
                  selectImage(index);
                }}>
                <View
                  style={[
                    styles.imageView,
                    index === currentindex && styles.imageShadow,
                  ]}>
                  <Image
                    source={item}
                    style={[styles.imageListView]}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            ))}
        </View>
        {/* seprator */}
        <View
          style={{height: 2, backgroundColor: '#F0F0F0', marginVertical: 20}}
        />
        {/* product-description */}
        <View style={{marginHorizontal: 20}}>
          <Text
            style={{
              color: '#818181',
              fontFamily: 'Poppins-Light',
              fontSize: 14,
              marginBottom: 15,
            }}>
            iPhone 13. boasts an advanced dual-camera system that allows you to
            click mesmerising...
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 14,
              fontFamily: 'Poppins-Light',
            }}>
            128 GB ROM {'\n'}15.49 cm (6.1 inch) Super Retina XDR Display 12MP +
            12MP | 12MP Front Camera A15 Bionic Chip Processor
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text
              style={{
                color: '#159DEA',
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
              }}>
              View full details
            </Text>
            <Icon
              name="keyboard-arrow-down"
              color={'#159DEA'}
              size={18}
              style={{marginBottom: 2}}
            />
          </View>
        </View>
        {/* warning */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 17,
            marginBottom: 20,
            backgroundColor: '#F4F4F4',
          }}>
          <Text
            style={{
              color: '#FF0000',
              fontFamily: 'Poppins-Medium',
              fontSize: 12,
            }}>
            Warning:{'\n'}
            <Text style={{color: '#000000', lineHeight: 18}}>
              1. Lorem ipsum, dolor sit amet consectetur.
              {'\n'}
              2. Quibusdam numquam accusantium obcaecati {'\n'}
              3. expedita, dignissimos amet qui, suscipi
              {'\n'}
              4. squam ea corrupti soluta. Enim rerum quasi sed.
            </Text>
          </Text>
        </View>

        {/* buttons */}
        <View
          style={{
            padding: 15,
            paddingTop: 0,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <ProductButton
            icon={<Wish color="#fff" width={10} height={9} />}
            title="Add to favorite"
          />
          <ProductButton
            icon={<ChatIcon color="#fff" width={10} height={9} />}
            title="Chat to vender"
            backgroundColor="#159DEA"
          />
        </View>
        {/* RELATED PRODUCTS */}
        <View
          style={{
            padding: 5,
            paddingHorizontal: 20,
            backgroundColor: '#159DEA',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Related products
          </Text>
        </View>
        {/* product-list */}
        <View
          style={{
            margin: 20,
            marginLeft: 0,
            flex: 1,
            marginTop: 0,
            paddingLeft: 20,
          }}>
          <FlatList
            data={product}
            horizontal
            keyExtractor={item => `${item.id}`}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <RentalProduct
                  key={index}
                  source={item.img}
                  title={item.title}
                  price={item.price}
                  onPress={() => navigation.push('ProductDetail', {item: item})}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  mainImage: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 5,
  },
  imageView: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  imageListView: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B0B0B0',
  },
  imageShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
});
