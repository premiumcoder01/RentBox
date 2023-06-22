import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import SubHeading from '../../constant/SubHeading';
import Header from '../../components/Header';

const TermsConditions = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />

      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}>
        <SubHeading
          title="Terms & Conditions"
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            flex: 1,
            marginBottom: 30,
            marginTop: 20,
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
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            Rentbox is operated by (corporation name) ("Rentbox," "we," or
            "us"). This page sets forth the terms and conditions ("Terms") under
            which you may use our website and services (the "Services"). Please
            read these Terms carefully before using the Services. By using the
            Services, you agree to be bound by these Terms. If you do not agree
            to these Terms, do not use the Services.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            We may modify these Terms at any time and will post the revised
            Terms on this page. By continuing to use the Services after we post
            any such changes, you accept the revised Terms.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            The Services are intended for use by individuals of any age. Any
            person can use our services globally.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            We reserve the right to discontinue or change the Services at any
            time.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            Rentbox is not responsible for any loss or damage that you may
            suffer as a result of using the Services.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsConditions;
