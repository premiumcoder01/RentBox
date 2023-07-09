import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {GetApi, Post} from '../../utils/Api';
import RenderHTML from 'react-native-render-html';
import Loader from '../../constant/Loader';
import Constants from '../../utils/Constant';
import SharePost from '../../../Component/SharePost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../../../Component/Toaster';
import Like from '../../assets/Images/Like';

const ProductDetail = props => {
  const navigation = useNavigation();
  const data = useRoute();
  const [loading, setLoading] = useState(false);
  const item = data.params.item;
  const width = Dimensions.get('window').width;
  const [currentindex, setCurrentIndex] = useState(0);
  const [userid, setUserId] = useState('');
  const [productDetail, setProductDetail] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [imageList, setImageList] = useState();
  const [show, setShow] = useState(false);
  const [showLike, setShowLike] = useState([]);

  const getProductData = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    setUserId(JSON.parse(userInfo).user_id);
    setLoading(true);
    GetApi(`item-detail-page/${item.product_name}?user_id=${userid}`).then(
      async res => {
        if (res.status == 200) {
          setShowLike(res.data.favourate_check);
          setProductDetail(res.data.product);
          setImageList(res.data.multiple_image);
          setRelatedProducts(res.data.related_product);
          setLoading(false);
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };


  const selectImage = index => {
    setCurrentIndex(index);
  };
  const preNext = type => {
    if (type === 'pre') {
      if (currentindex !== 0) {
        setCurrentIndex(currentindex - 1);
      } else {
        setCurrentIndex(imageList.length - 1);
      }
    } else {
      if (currentindex !== imageList.length - 1) {
        setCurrentIndex(currentindex + 1);
      } else {
        setCurrentIndex(0);
      }
    }
  };

  useEffect(() => {
    getProductData();
  }, [showLike]);

  const html = `${productDetail.product_description}`;

  const handleLike = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    const data = {
      user_id: JSON.parse(userInfo).user_id,
      product_id: productDetail.id,
    };
    Post(`add-favourite`, data).then(
      async res => {
        if (res.status == 200) {
          if (res.data.data === 'insert') {
            Toaster('Added To wishList');
            getProductData();
          } else {
            Toaster('Remove from wishList');
            getProductData();
          }
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  const relatedhandleLike = async id => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    const data = {
      user_id: JSON.parse(userInfo).user_id,
      product_id: id,
    };
    Post(`add-favourite`, data).then(
      async res => {
        if (res.status == 200) {
          if (res.data.data === 'insert') {
            Toaster('Added To wishList');
            getProductData();
          } else {
            Toaster('Remove from wishList');
            getProductData();
          }
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  const handleChat = chatId => {
    const data = {
      current_user_id: userid,
      receiver_id: chatId,
    };
    if (userid == chatId) {
      Toaster('This is your product');
    } else {
      Post(`chatClick`, data).then(
        async res => {
          if (res.status == 200) {
            navigation.navigate('Chat', {
              screen: 'ChatInbox',
              params: {
                user_id: productDetail.user_id,
                user_image: productDetail.user_image,
                user_name: productDetail.user_name,
              },
            });
          }
        },
        err => {
          console.log(err);
        },
      );
    }
  };

  const relatedhandleChat = async item => {
    console.log(item);
    const userInfo = await AsyncStorage.getItem('userInfo');
    const data = {
      current_user_id: JSON.parse(userInfo).user_id,
      receiver_id: item.user_id,
    };
    Post('chatClick', data).then(
      async res => {
        if (res.status == 200) {
          navigation.navigate('Chat', {
            screen: 'ChatInbox',
            params: {
              user_id: item.user_id,
              user_image: item.image,
              user_name: item.first_name,
            },
          });
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView
          style={{flex: 1, backgroundColor: '#fff'}}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          contentContainerStyle={{paddingBottom: 70}}>
          <Pressable
            style={{
              padding: 5,
              backgroundColor: '#F0F0F0',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 25,
              justifyContent: 'space-between',
            }}
            onPress={() => props.navigation.goBack()}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="arrow-back-ios" size={15} color="#000" />

              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'Poppins-SemiBold',
                  color: '#000000',
                  lineHeight: 22,
                  marginLeft: 10,
                }}>
                {item.product_name}
              </Text>
            </View>
          </Pressable>

          <View
            style={{
              width: width - 40,
              height: 200,
              position: 'relative',
              margin: 20,

              backgroundColor: 'white',
            }}>
            <ImageBackground
              resizeMode="contain"
              source={{
                uri:
                  imageList?.length > 1
                    ? Constants.imageUrl +
                      'category-image/' +
                      imageList[currentindex].image
                    : Constants.imageUrl +
                      'category-image/' +
                      productDetail.product_image,
              }}
              style={{
                height: 180,
                marginTop: 10,
              }}>
              {imageList?.length > 1 && (
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
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 5,
                  padding: 10,
                }}
                onPress={() => {
                  SharePost({
                    post_id: productDetail.id,
                    description: productDetail.product_description,
                    title: productDetail.product_name,
                    image:
                      Constants.imageUrl +
                      'category-image/' +
                      productDetail.product_image,
                  }).then(res => {
                    console.log('share responces', res);
                  });
                }}>
                <ShareIcon />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={styles.mainImage}>
            <FlatList
              data={imageList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[{marginRight: 8}]}
                    onPress={() => {
                      selectImage(index);
                    }}>
                    <View
                      style={[
                        styles.imageView,
                        index === currentindex && styles.imageShadow,
                      ]}>
                      <Image
                        source={{
                          uri:
                            Constants.imageUrl + 'category-image/' + item.image,
                        }}
                        style={[styles.imageListView]}
                        resizeMode="cover"
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: '#F0F0F0',
              marginVertical: 20,
            }}
          />
          <View style={{marginHorizontal: 20}}>
            <Text
              style={{
                color: '#818181',
                fontFamily: 'Poppins-Light',
                fontSize: 14,
                width: 300,
              }}>
              {productDetail.product_name}
            </Text>

            <RenderHTML
              contentWidth={100}
              source={{html}}
              tagsStyles={{
                body: {
                  whiteSpace: 'normal',
                  color: 'gray',
                  width: 300,
                },
                p: {
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Poppins-Light',
                  lineHeight: 'normal',
                },
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#818181',
                  fontFamily: 'Poppins-Light',
                  fontSize: 14,
                }}>
                Seller Contact Info :
              </Text>

              <Pressable onPress={() => setShow(!show)}>
                {!show ? (
                  <Text
                    style={{
                      color: '#159DEA',
                      fontSize: 12,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {`${productDetail?.user_phone
                      ?.slice(0, 5)
                      .concat('*******')}`}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: '#159DEA',
                      fontSize: 12,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {`${productDetail?.user_phone}`}
                  </Text>
                )}
              </Pressable>
            </View>
            <Text
              style={{
                color: '#FF0000',
                fontFamily: 'Poppins-Medium',
                fontSize: 12,
                textAlign: 'right',
                marginBottom: 10,
              }}>
              Click to show contact
            </Text>
          </View>
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
              title={showLike !== true ? 'Add to favorite' : 'Remove favorite'}
              onPress={() => handleLike()}
              backgroundColor={showLike !== true ? '#33AD66' : '#FF0000'}
            />

            <ProductButton
              icon={<ChatIcon color="#fff" width={10} height={9} />}
              title="Chat"
              backgroundColor="#159DEA"
              onPress={() => handleChat(productDetail.user_id)}
            />
          </View>
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
          <View
            style={{
              margin: 20,
              marginLeft: 0,
              flex: 1,
              marginTop: 0,
              paddingLeft: 20,
            }}>
            <FlatList
              data={relatedProducts}
              horizontal
              keyExtractor={item => `${item.id}`}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      height: '100%',
                      width: 15,
                    }}
                  />
                );
              }}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: 150,
                      marginTop: 10,
                    }}
                    onPress={() =>
                      navigation.push('ProductDetail', {item: item})
                    }>
                    <View style={{position: 'relative', marginBottom: 0}}>
                      <Image
                        source={{
                          uri: `${Constants.imageUrl}category-image/${item.product_image}`,
                        }}
                        resizeMode="contain"
                        style={{
                          marginBottom: 10,
                          height: 113,
                          width: 150,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: 14,
                          top: 14,
                          padding: 10,
                          backgroundColor:
                            item.product_type !== 'Rental'
                              ? '#159DEA'
                              : '#33AD66',
                          borderRadius: 100,
                        }}
                        onPress={() => relatedhandleChat(item)}>
                        <ChatIcon color="#fff" width={10} height={9} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: 14,
                          bottom: 0,
                          padding: 10,
                          backgroundColor: '#fff',
                          borderRadius: 100,
                        }}
                        onPress={() => relatedhandleLike(item.id)}>
                        <Like
                          color={
                            item.is_favorite === 'null' ||
                            item.is_favorite == null
                              ? '#B3B3B3'
                              : '#FF0000'
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Poppins-SemiBold',
                        color: '#000',
                        marginLeft: 5,
                        marginBottom: 5,
                      }}>
                      {item.product_name}
                    </Text>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 10,
                        fontFamily: 'Poppins-Medium',
                        marginLeft: 5,
                      }}>
                      $ {item.product_price} / month
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
      )}

      {/* <Loader modalVisible={loading} setModalVisible={setLoading} /> */}
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  mainImage: {
    flexDirection: 'row',
    paddingHorizontal: 20,
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
