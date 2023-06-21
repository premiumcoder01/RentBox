import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Flatlist,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Carasouel from './images/components/Carasouel';
import Category from './images/components/Category';
import TitleText from './images/components/TitleText';
import RentalProduct from './images/components/RentalProduct';
import ViewAll from './images/components/ViewAll';
import product from './images/product/product';
import Loader from '../../constant/Loader';

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const data = product.slice(0, 4);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      contentContainerStyle={{paddingBottom: 80}}
      showsVerticalScrollIndicator={false}>
      {/* carasouel */}
      <Carasouel />
      {/* category */}
      <Category
        title="Browse Our Rental Category"
        textColor="white"
        backgroundColor="#33AD66"
      />

      {/* product */}
      <View style={{marginHorizontal: 20, flex: 1}}>
        <TitleText title="Rental Products" color="#33AD66" />
        <FlatList
          data={data}
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
                source={item.img}
                title={item.title}
                price={item.price}
                onPress={() =>
                  navigation.navigate('ProductDetail', {item: item})
                }
              />
            );
          }}
        />
        <ViewAll onPress={() => navigation.navigate('Rental')} />
      </View>

      {/* wholesale category */}
      <Category
        title="Browse Wholesale Category"
        textColor="white"
        backgroundColor="#159DEA"
      />

      {/* wholesale product */}
      <View style={{marginHorizontal: 20, flex: 1}}>
        <TitleText title="Wholesale Products" color="#159DEA" />
        <FlatList
          data={data}
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
                source={item.img}
                title={item.title}
                price={item.price}
                chatBackground="#159DEA"
                onPress={() =>
                  navigation.navigate('ProductDetail', {item: item})
                }
              />
            );
          }}
        />
        <ViewAll
          onPress={() => navigation.navigate('Wholesale')}
          style={{
            backgroundColor: '#159DEA',
          }}
        />
      </View>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </ScrollView>
  );
};

export default Home;
