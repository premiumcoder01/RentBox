import {ScrollView, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Carasouel from './images/components/Carasouel';
import Category from './images/components/Category';
import TitleText from './images/components/TitleText';
import RentalProduct from './images/components/RentalProduct';
import ViewAll from './images/components/ViewAll';
import Loader from '../../constant/Loader';
import Header from '../../components/Header';
import {GetApi} from '../../utils/Api';

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [rentalCategory, setRentalCategory] = useState([]);
  const [rentalProduct, setRentalProduct] = useState([]);
  const [wholeSaleCategory, setWholeSaleCategory] = useState([]);
  const [wholeSaleProduct, setWholeSaleProduct] = useState([]);

  const getProductData = () => {
    setLoading(true);
    GetApi('home-page-data').then(
      async res => {
        if (res.status == 200) {
          setRentalCategory(res.data.rental_category_data);
          setRentalProduct(res.data.rental_products);
          setWholeSaleCategory(res.data.whole_sale_category_data);
          setWholeSaleProduct(res.data.whole_sale_products);
          setLoading(false);
        }
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}>
        <Carasouel />
        {/* carasouel */}

        {/* category */}

        <Category
          title="Browse Our Rental Category"
          textColor="white"
          backgroundColor="#33AD66"
          Category={rentalCategory}
          type="Rental"
        />

        {/* product */}
        <View style={{marginHorizontal: 20, flex: 1}}>
          <TitleText title="Rental Products" color="#33AD66" />
          <FlatList
            data={rentalProduct.slice(0, 4)}
            numColumns={2}
            keyExtractor={item => `${item.id}`}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <RentalProduct
                  key={index}
                  id={item.id}
                  source={item.product_image}
                  title={item.product_name}
                  price={item.product_price}
                  onPress={() =>
                    navigation.navigate('ProductDetail', {item: item})
                  }
                />
              );
            }}
          />
          <ViewAll
            onPress={() => navigation.navigate('Rental', {item: rentalProduct})}
          />
        </View>
        <Category
          title="Browse Wholesale Category"
          textColor="white"
          backgroundColor="#159DEA"
          Category={wholeSaleCategory}
          type="Wholesale"
        />

        {/* wholesale product */}
        <View style={{marginHorizontal: 20, flex: 1}}>
          <TitleText title="Wholesale Products" color="#159DEA" />
          <FlatList
            data={wholeSaleProduct.slice(0, 4)}
            numColumns={2}
            keyExtractor={item => `${item.id}`}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <RentalProduct
                  key={index}
                  id={item.id}
                  source={item.product_image}
                  title={item.product_name}
                  price={item.product_price}
                  chatBackground="#159DEA"
                  onPress={() =>
                    navigation.navigate('ProductDetail', {item: item})
                  }
                />
              );
            }}
          />
          <ViewAll
            onPress={() =>
              navigation.navigate('Wholesale', {items: wholeSaleProduct})
            }
            style={{
              backgroundColor: '#159DEA',
            }}
          />
        </View>

        <Loader modalVisible={loading} setModalVisible={setLoading} />
      </ScrollView>
    </View>
  );
};

export default Home;
