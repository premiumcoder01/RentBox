import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Spinner from '../../Component/Spinner';
import {Post, GetApi} from '../../Helpers/Service';
import Constants from '../../Helpers/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actions-sheet';
import moment from 'moment';
const actionSheetRef = createRef();
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReadMore from 'react-native-read-more-text';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SharePost from '../../Component/SharePost';

const images = [
  {
    img: require('../../assets/img/shop-banner1.png'),
    name: 'Product Image',
  },
  {
    img: require('../../assets/img/shop-banner2.png'),
    name: 'Product Image',
  },
  {
    img: require('../../assets/img/shop-banner3.png'),
    name: 'Product Image',
  },
  {
    img: require('../../assets/img/shop-banner4.png'),
    name: 'Product Image',
  },
  {
    img: require('../../assets/img/shop-banner5.png'),
    name: 'Product Image',
  },
];

// const { width } = Dimensions.get("window");
//     const height = width * 0.4;
const KanpidShop = props => {
  const navigation = useNavigation();
  const [category, setCategory] = useState([]);
  const [dealOfDay, setDealOfDay] = useState([]);
  const [bestKanpid, setBestKanpid] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [brandSlashedPrice, setBrandSlashedPrice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user_id, setUserID] = useState();
  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      console.log('111111111');

      getHomeDetail();
    });
    return () => {
      willFocusSubscription;
    };
  }, []);
  const getHomeDetail = () => {
    //setLoading(true);
    GetApi('kanpid-home-page').then(
      async res => {
        setLoading(false);
        if (res.status == 200) {
          console.log('res.data');
          setCategory(res.data.shop_item_category);
          setDealOfDay(res.data.deal_of_day);
          setBestKanpid(res.data.best_kanpid);
          setTopPicks(res.data.top_picks);
          setBrandSlashedPrice(res.data.brand_slashed_price);
          const user = await AsyncStorage.getItem('userDetail');
          if (user === null) {
            setUserID(0);
          } else {
            setUserID(JSON.parse(user).user_id);
          }
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };

  return (
    <View style={{marginBottom: 0}}>
      <Spinner color={'#ffc000'} visible={loading} />

      <ScrollView>
        <ScrollView
          horizontal
          style={{width: 352, height: 135}}
          showsHorizontalScrollIndicator={false}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={image.img}
              style={{
                width: 352,
                height: 135,
                resizeMode: 'contain',
                margin: 4,
                borderRadius: 10,
              }}
            />
          ))}
        </ScrollView>
        <View style={styles.firstView}>
          <Text style={styles.firstHeading}>DEAL OF THE DAY</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dealOfDay.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ProductViewDetail', {
                    itemId: item.product_name,
                  });
                }}>
                <View style={styles.secondView}>
                  <Image
                    resizeMode="contain"
                    source={{
                      uri:
                        Constants.imageUrl +
                        'category-image/' +
                        item.product_image,
                    }}
                    style={styles.flatImg}
                  />
                  <ReadMore
                    numberOfLines={1}
                    renderTruncatedFooter={handlePress => {
                      return;
                    }}
                    renderRevealedFooter={handlePress => {
                      return;
                    }}>
                    <Text style={styles.productHeading}>
                      {item.product_name}
                    </Text>
                  </ReadMore>
                  <View style={styles.thirdView}>
                    <Text style={styles.price}>${item.product_price}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('ProductViewDetail', {
                          itemId: item.product_name,
                        });
                      }}>
                      <Text style={styles.btn}>View Item</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[styles.iconView, {marginLeft: 5}]}
                    onPress={() => {
                      SharePost({
                        post_id: item.id,
                        description: item.description,
                        title: item.item_name,
                        image: Constants.imageUrl + 'images/' + item.image,
                      }).then(res => {
                        console.log(res);
                      });
                    }}>
                    <Ionicons
                      name="arrow-redo-outline"
                      size={18}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* category section */}
        <View style={styles.categoryView}>
          <Text style={styles.firstHeading}>CATEGORY</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {category.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Shop', {
                    categoryName: item.name,
                    user_id: user_id,
                  });
                }}>
                <View style={styles.fourthView}>
                  <Image
                    resizeMode="contain"
                    source={{
                      uri: Constants.imageUrl + 'category-image/' + item.image,
                    }}
                    style={styles.flatImg}
                  />
                  <Text style={styles.categoryHeading}>{item.name}</Text>
                  {/* <View style={styles.categorySecondView}>
                                    <Text style={styles.total}>Total Product</Text>
                                    <Text style={styles.totalNumber}>4</Text>
                                </View> */}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* exclusive brand section */}
        <View style={styles.categoryView}>
          <Text style={styles.firstHeading}>
            BEST OF KANPID EXCLUSIVE BRANDS
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {bestKanpid.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ProductViewDetail', {
                    itemId: item.product_name,
                  });
                }}>
                <View style={styles.secondViewOne}>
                  <Image
                    resizeMode="contain"
                    source={{
                      uri:
                        Constants.imageUrl +
                        'category-image/' +
                        item.product_image,
                    }}
                    style={styles.flatImg}
                  />
                  <ReadMore
                    numberOfLines={1}
                    renderTruncatedFooter={handlePress => {
                      return;
                    }}
                    renderRevealedFooter={handlePress => {
                      return;
                    }}>
                    <Text style={styles.productHeading}>
                      {item.product_name}
                    </Text>
                  </ReadMore>
                  <View style={styles.thirdView}>
                    <Text style={styles.price}>${item.product_price}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('ProductViewDetail', {
                          itemId: item.product_name,
                        });
                      }}>
                      <Text style={styles.btn}>View Item</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[styles.iconView, {marginLeft: 5}]}
                    onPress={() => {
                      SharePost({
                        post_id: item.id,
                        description: item.description,
                        title: item.item_name,
                        image: Constants.imageUrl + 'images/' + item.image,
                      }).then(res => {
                        console.log(res);
                      });
                    }}>
                    <Ionicons
                      name="arrow-redo-outline"
                      size={18}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* SLASHED PRICES section */}
        <View style={styles.categoryView}>
          <Text style={styles.firstHeading}>BRANDS AT SLASHED PRICES</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {brandSlashedPrice.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ProductViewDetail', {
                    itemId: item.product_name,
                  });
                }}>
                <View style={styles.secondView}>
                  <Image
                    resizeMode="contain"
                    source={{
                      uri:
                        Constants.imageUrl +
                        'category-image/' +
                        item.product_image,
                    }}
                    style={styles.flatImg}
                  />
                  <ReadMore
                    numberOfLines={1}
                    renderTruncatedFooter={handlePress => {
                      return;
                    }}
                    renderRevealedFooter={handlePress => {
                      return;
                    }}>
                    <Text style={styles.productHeading}>
                      {item.product_name}
                    </Text>
                  </ReadMore>
                  <View style={styles.thirdView}>
                    <Text style={styles.price}>${item.product_price}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('ProductViewDetail', {
                          itemId: item.product_name,
                        });
                      }}>
                      <Text style={styles.btn}>View Item</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[styles.iconView, {marginLeft: 5}]}
                    onPress={() => {
                      SharePost({
                        post_id: item.id,
                        description: item.description,
                        title: item.item_name,
                        image: Constants.imageUrl + 'images/' + item.image,
                      }).then(res => {
                        console.log(res);
                      });
                    }}>
                    <Ionicons
                      name="arrow-redo-outline"
                      size={18}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* TOP PICKSsection */}
        <View style={styles.categoryView}>
          <Text style={styles.firstHeading}>TOP PICKS</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {topPicks.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ProductViewDetail', {
                    itemId: item.product_name,
                  });
                }}>
                <View style={styles.secondView}>
                  <Image
                    resizeMode="contain"
                    source={{
                      uri:
                        Constants.imageUrl +
                        'category-image/' +
                        item.product_image,
                    }}
                    style={styles.flatImg}
                  />
                  <ReadMore
                    numberOfLines={1}
                    renderTruncatedFooter={handlePress => {
                      return;
                    }}
                    renderRevealedFooter={handlePress => {
                      return;
                    }}>
                    <Text style={styles.productHeading}>
                      {item.product_name}
                    </Text>
                  </ReadMore>
                  <View style={styles.thirdView}>
                    <Text style={styles.price}>${item.product_price}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('ProductViewDetail', {
                          itemId: item.product_name,
                        });
                      }}>
                      <Text style={styles.btn}>View Item</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[styles.iconView, {marginLeft: 5}]}
                    onPress={() => {
                      SharePost({
                        post_id: item.id,
                        description: item.description,
                        title: item.item_name,
                        image: Constants.imageUrl + 'images/' + item.image,
                      }).then(res => {
                        console.log(res);
                      });
                    }}>
                    <Ionicons
                      name="arrow-redo-outline"
                      size={18}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default KanpidShop;

const styles = StyleSheet.create({
  firstView: {
    padding: 20,
    paddingBottom: 5,
    paddingRight: 0,
  },
  iconView: {
    height: 30,
    width: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4AAB7E',
    position: 'absolute',
    left: 10,
    top: 15,
  },
  categoryView: {
    padding: 20,
    paddingBottom: 5,
    paddingRight: 0,
    paddingTop: 5,
  },

  firstHeading: {
    fontSize: 15,
  },
  flatImg: {
    width: 145,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },

  secondViewOne: {
    marginTop: 20,
    margin: 10,
    marginLeft: 0,
    padding: 20,
    borderRadius: 10,
    paddingBottom: 20,
    elevation: 4,
    shadowColor: '#28a745',
    width: 180,
  },
  secondView: {
    marginTop: 20,
    margin: 15,
    marginLeft: 0,
    borderWidth: 2,
    borderColor: '#28a745',
    padding: 10,
    borderRadius: 10,
    paddingBottom: 10,
    height: 220,
    width: 175,
  },
  productHeading: {
    fontSize: 13,
    width: 145,
    padding: 4,
    height: 40,
  },
  thirdView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 15,
  },
  categorySecondView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  price: {
    fontSize: 12,
    color: 'gray',
  },
  btn: {
    fontSize: 12,
    color: 'gray',
    textDecorationLine: 'underline',
  },
  total: {
    fontSize: 14,
    color: '#fff',
  },
  totalNumber: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#000',
    width: 25,
    height: 25,
    borderRadius: 50,
    paddingLeft: 8,
    paddingTop: 2,
  },
  fourthView: {
    marginTop: 20,
    margin: 15,
    marginLeft: 0,
    borderWidth: 2,
    backgroundColor: '#9AC96D',
    borderColor: '#9AC96D',
    padding: 10,
    borderRadius: 10,
    paddingBottom: 10,
  },
  categoryHeading: {
    fontSize: 13,
    width: 145,
    color: '#fff',
    padding: 4,
  },
});
