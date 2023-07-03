import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import SubHeading from '../../constant/SubHeading';
import Header from '../../components/Header';

const PrivacyPolicy = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />

      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}>
        <SubHeading
          title="Privacy Policy"
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
            At "Bright dealers", we are committed to protecting your privacy. We
            use the information we collect about you to help us provide a better
            service. We will never sell or give away your personal information
            to anyone.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            We may change our Privacy Policy from time to time, so please check
            back periodically. By using our website, you agree to our Privacy
            Policy.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            If you have any questions about our Privacy Policy, please contact
            us.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            At "Bright dealers", we are committed to protecting your privacy. We
            use the information we collect about you to help us provide a better
            service. We will never sell or give away your personal information
            to anyone.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            We may change our Privacy Policy from time to time, so please check
            back periodically. By using our website, you agree to our Privacy
            Policy.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            If you have any questions about our Privacy Policy, please contact
            us.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            At "Bright dealers", we are committed to protecting your privacy. We
            use the information we collect about you to help us provide a better
            service. We will never sell or give away your personal information
            to anyone.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            We may change our Privacy Policy from time to time, so please check
            back periodically. By using our website, you agree to our Privacy
            Policy.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            If you have any questions about our Privacy Policy, please contact
            us.
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              lineHeight: 16,
              marginBottom: 20,
            }}>
            Thank you for using "Bright dealers"!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
