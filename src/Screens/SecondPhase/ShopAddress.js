import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import Spinner from '../../Component/Spinner';
import {GetApi} from '../../Helpers/Service';
import Toaster from '../../Component/Toaster';
import {useStripe} from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopAddress = props => {
  const navigation = useNavigation();

  const [billing_first_name, setFirstName] = useState('');
  const [billing_last_name, setLastName] = useState('');
  const [billing_country, setCountry] = useState('');
  const [billing_city, setCity] = useState('');
  const [billing_phone, setPhone] = useState('');
  const [billing_pincode, setPincode] = useState('');
  const [billing_email, setEmail] = useState('');
  const [billing_company_name, setCompanyName] = useState('');
  const [billing_house_no, setHouse] = useState('');
  const [currency, setCurrency] = React.useState('INR');
  const [payment_type, setPaymentType] = React.useState('cod');

  const [loading, setLoading] = useState(false);
  const [user_id, setUserID] = useState();
  const [amount, setAmount] = useState();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  useEffect(() => {
    shippingAddress();
    setUserID(props?.route?.params?.user_id);
    setAmount(props?.route?.params?.amount);
    initializePaymentSheet();
    if (user_id != undefined) {
      //getCartItem();
    }
  }, [user_id]);

  const fetchPaymentSheetParams = async () => {
    const user = await AsyncStorage.getItem('userDetail');
    const userId = JSON.parse(user).user_id;
    console.log(userId, 'user id h ');
    const response = await fetch(
      `https://dev.codesmile.in/kanpid/public/api/payment?user_id=${userId}&currency=${currency}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('oyeeee', response);

    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      console.log('there is no error all is good');
      //setLoading(true);
    }
  };
  const openPaymentSheet = async () => {
    console.log('first');
    const {error} = await presentPaymentSheet();

    if (error) {
      //Alert.alert(`Error code: ${error.code}`, error.message);
      Alert.alert(`${error.code}`, error.message);
    } else {
      const user = await AsyncStorage.getItem('userDetail');
      const userId = JSON.parse(user).user_id;
      setLoading(true);
      GetApi(
        `shop-order-success?user_id=${userId}&transaction_id=12345&billing_first_name=${billing_first_name}&billing_last_name=${billing_last_name}&billing_country=${billing_country}&billing_city=${billing_city}&billing_phone=${billing_phone}&billing_pincode=${billing_pincode}&billing_email=${billing_email}&billing_company_name=${billing_company_name}&billing_house_no=${billing_house_no}&currency=${currency}`,
      ).then(
        async res => {
          setLoading(false);
          if (res.status == 200) {
            console.log('res.data');
            props.navigation.navigate('Thankyou');
          } else {
            Toaster('Something went wrong');
            return;
          }
        },
        err => {
          setLoading(false);
          Toaster('Something went wrong');
          console.log(err);
          return;
        },
      );
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  // const submit = () => {
  //   if (
  //     !billing_first_name &&
  //     !billing_last_name &&
  //     !billing_country &&
  //     !billing_city &&
  //     !billing_phone &&
  //     !billing_pincode
  //   ) {
  //     Alert.alert('please fill all the feilds');
  //   } else {
  //     navigation.navigate('Thankyou');
  //   }
  // };

  const shippingAddress = async () => {
    const user = await AsyncStorage.getItem('userDetail');
    const userId = JSON.parse(user).user_id;

    GetApi(`get-shipping-data?user_id=${userId}`).then(
      async res => {
        if (res.status == 200) {
          setFirstName(
            res.data.shipping_detail && res.data.shipping_detail.first_name
              ? res.data.shipping_detail.first_name
              : '',
          );
          setLastName(
            res.data.shipping_detail && res.data.shipping_detail.first_name
              ? res.data.shipping_detail.first_name
              : '',
          );
          setCountry(
            res.data.shipping_detail && res.data.shipping_detail.country
              ? res.data.shipping_detail.country
              : '',
          );
          setCity(
            res.data.shipping_detail && res.data.shipping_detail.city
              ? res.data.shipping_detail.city
              : '',
          );
          setPhone(
            res.data.shipping_detail && res.data.shipping_detail.phone
              ? res.data.shipping_detail.phone
              : '',
          );
          setPincode(
            res.data.shipping_detail && res.data.shipping_detail.pincode
              ? res.data.shipping_detail.pincode
              : '',
          );
          setEmail(
            res.data.shipping_detail && res.data.shipping_detail.email
              ? res.data.shipping_detail.email
              : '',
          );
          setCompanyName(
            res.data.shipping_detail && res.data.shipping_detail.company_name
              ? res.data.shipping_detail.company_name
              : '',
          );
          setHouse(
            res.data.shipping_detail && res.data.shipping_detail.house_no
              ? res.data.shipping_detail.house_no
              : '',
          );
        }
      },
      err => {
        console.log(err);
      },
    );
  };
  const postOrder = () => {
    setLoading(true);
    GetApi(
      `post-order?billing_first_name=${billing_first_name}&billing_last_name=${billing_last_name}&billing_country=${billing_country}&billing_city=${billing_city}&billing_phone=${billing_phone}&billing_pincode=${billing_pincode}&billing_email=${billing_email}&billing_company_name=${billing_company_name}&billing_house_no=${billing_house_no}&currency=${currency}&payment_type=${payment_type}&user_id=${user_id}&amount=${amount}`,
    ).then(
      async res => {
        setLoading(false);
        if (res.status == 200) {
          console.log('res.data');
          props.navigation.navigate('Thankyou');
        } else {
          Toaster('Something went wrong');
          return;
        }
      },
      err => {
        setLoading(false);
        Toaster('Something went wrong');
        console.log(err);
        return;
      },
    );
  };

  return (
    <View style={{backgroundColor: '#fff'}}>
      <Spinner color={'#fff'} visible={loading} />
      <ScrollView>
        <View style={{padding: 20}}>
          <Text style={{color: '#9AC96D'}}>Shipping Address</Text>
          <Text style={[styles.inputHeading1]}>First Name</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            value={billing_first_name}
            onChangeText={actualData => setFirstName(actualData)}
          />

          <Text style={[styles.inputHeading1]}>Last Name</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            value={billing_last_name}
            onChangeText={actualData => setLastName(actualData)}
          />
          <Text style={[styles.inputHeading1]}>Country</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            value={billing_country}
            onChangeText={actualData => setCountry(actualData)}
          />

          <Text style={[styles.inputHeading1]}>City</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            value={billing_city}
            onChangeText={actualData => setCity(actualData)}
          />
          <Text style={styles.inputHeading}>Phone</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType={'numeric'}
            autoCorrect={false}
            style={styles.input}
            value={billing_phone}
            onChangeText={actualData => setPhone(actualData)}
          />
          <Text style={styles.inputHeading}>Pincode</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            value={billing_pincode}
            onChangeText={actualData => setPincode(actualData)}
          />

          <Text style={styles.inputHeading}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            value={billing_email}
            onChangeText={actualData => setEmail(actualData)}
          />

          <Text style={styles.inputHeading}>Company Name</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            value={billing_company_name}
            onChangeText={actualData => setCompanyName(actualData)}
          />
          <Text style={styles.inputHeading}>Address (Area and Street)</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputLarge}
            value={billing_house_no}
            onChangeText={actualData => setHouse(actualData)}
          />

          <Text style={styles.inputHeading}>Currency</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="INR"
                color="#9AC96D"
                status={currency === 'INR' ? 'checked' : 'unchecked'}
                onPress={() => setCurrency('INR')}
              />
              <Text onPress={() => setCurrency('INR')} style={{marginTop: 6}}>
                INR
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="GBP"
                color="#9AC96D"
                status={currency === 'GBP' ? 'checked' : 'unchecked'}
                onPress={() => setCurrency('GBP')}
              />
              <Text onPress={() => setCurrency('GBP')} style={{marginTop: 6}}>
                GBP
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="USD"
                color="#9AC96D"
                status={currency === 'USD' ? 'checked' : 'unchecked'}
                onPress={() => setCurrency('USD')}
              />
              <Text onPress={() => setCurrency('USD')} style={{marginTop: 6}}>
                USD
              </Text>
            </View>
          </View>

          <Text style={styles.inputHeading}>Payment Type</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="cod"
                color="#9AC96D"
                status={payment_type === 'cod' ? 'checked' : 'unchecked'}
                onPress={() => setPaymentType('cod')}
              />
              <Text
                onPress={() => setPaymentType('cod')}
                style={{marginTop: 6}}>
                COD
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="upi"
                color="#9AC96D"
                status={payment_type === 'upi' ? 'checked' : 'unchecked'}
                onPress={() => setPaymentType('upi')}
              />
              <Text
                onPress={() => setPaymentType('upi')}
                style={{marginTop: 6}}>
                Credit / Debit Card
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            // onPress={() => {
            //     props.navigation.navigate('PaymentPage');
            // }}
            onPress={() => {
              if (
                !billing_first_name ||
                !billing_last_name ||
                !billing_country ||
                !billing_city ||
                !billing_phone ||
                !billing_pincode ||
                !billing_email ||
                !currency ||
                !billing_house_no ||
                !payment_type ||
                !user_id ||
                !amount
              ) {
                Toaster('Please fill all the required fields');
                return;
              } else {
                if (payment_type == 'cod') {
                  postOrder();
                } else {
                  openPaymentSheet();
                  // props.navigation.navigate('PaymentPage', { billing_first_name: billing_first_name, billing_last_name: billing_last_name, billing_country: billing_country, billing_state: billing_state, billing_city: billing_city, billing_phone: billing_phone, billing_pincode: billing_pincode, billing_email: billing_email, billing_company_name: billing_company_name, billing_house_no: billing_house_no, currency: currency, payment_type: payment_type, user_id: user_id, amount: amount });
                }
              }
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              Save And Delivery Here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopAddress;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#f7f7f7',
  },
  inputLarge: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#f7f7f7',
    justifyContent: 'flex-start',
    minHeight: 100,
  },
  inputHeading: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 6,
  },
  inputHeading1: {
    fontSize: 13,
    marginTop: 20,
    marginBottom: 6,
  },
  addBtn: {
    backgroundColor: '#9AC96D',
    paddingTop: 12,
    paddingBottom: 15,
    borderColor: '#9AC96D',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 130,
  },
  mainContainer: {
    backgroundColor: '#103524',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  firstContainer: {
    flexDirection: 'row',
  },
  secondContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingRight: 9,
  },
  arrowHeading: {
    color: '#fff',
    fontSize: 16,
    marginTop: 9,
    marginLeft: 9,
  },

  menuIcon: {
    color: '#fff',
    fontSize: 26,
    backgroundColor: '#9AC96D',
    width: 44,
    height: 44,
    paddingTop: 8,
    paddingLeft: 10,
    borderRadius: 30,
  },
});
