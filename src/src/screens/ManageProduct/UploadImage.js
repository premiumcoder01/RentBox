import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeading from '../../constant/SubHeading';
import {useNavigation} from '@react-navigation/native';
import UploadIcon from './icons/UploadIcon';
import RemoveIcon from './icons/RemoveIcon';
import Header from '../../components/Header';
import Loader from '../../constant/Loader';
import {GetApi} from '../../utils/Api';
import DocumentPicker from 'react-native-document-picker';
import Constants from '../../utils/Constant';
import Toaster from '../../../Component/Toaster';
import axios from 'axios';

const UploadImage = props => {
  const navigation = useNavigation();
  const data = props.route.params.item;
  const [loading, setLoading] = useState(false);
  const [allImage, setAllImage] = useState([]);
  const [image, setImage] = useState('');

  const getAllImage = async () => {
    setLoading(true);
    GetApi(`get-upload-image/${data}`).then(
      async res => {
        if (res.status == 200) {
          console.log(res.data);
          setAllImage(res.data.product_image);
          setLoading(false);
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    getAllImage();
  }, []);
  const uploadImage = async () => {
    setLoading(true);

    if (image == '') {
      Toaster('Please select a image');
      setLoading(false);
      return false;
    }
    const formData = new FormData();
    formData.append('item_id', data);
    formData.append('product_image', image);
    axios({
      method: 'post',
      url: 'https://dev.codesmile.in/rentbox/public/api/post-upload-image',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        setLoading(false);
        Toaster('You have successfully uploaded image');
        setImage('');
        getAllImage();
      })
      .catch(function (response) {
        setLoading(false);
        console.log('got an error');
      });
  };

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      const docFinal = {
        uri: doc[0].uri,
        type: doc[0].type,
        name: doc[0].name,
      };
      console.log(docFinal);
      setImage(docFinal);
      Toaster('Submit to view uploaded image');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User Cancelled the upload', err);
      } else {
        console.log(err);
      }
    }
  };

  const deleteImage = async item_id => {
    setLoading(true);
    GetApi(`delete-upload-image/${item_id}`).then(
      async res => {
        Toaster('You have successfully deleted image');
        setLoading(false);
        getAllImage();
      },
      err => {
        setLoading(false);
        console.log(err);
      },
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <SubHeading title="Upload Image" onPress={() => navigation.goBack()} />
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#159DEA',
            borderRadius: 100,
            paddingHorizontal: 50,
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => uploadImage()}>
          <Text
            style={{
              fontSize: 11,
              fontFamily: 'Poppins-Regular',
              color: '#fff',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          padding: 20,
          backgroundColor: '#fff',
          elevation: 4,
          borderRadius: 15,
          width: 250,
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <UploadIcon />
        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: '#33AD66',
            borderRadius: 100,
            marginTop: 30,
            paddingHorizontal: 80,
          }}
          onPress={() => selectDoc()}>
          <Text
            style={{color: '#fff', fontSize: 11, fontFamily: 'Poppins-Medium'}}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          flex: 1,
        }}>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            numColumns={3}
            data={allImage}
            columnWrapperStyle={{justifyContent: 'space-around'}}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    position: 'relative',
                    // marginLeft: 10,
                    marginVertical: 10,
                  }}>
                  <Image
                    source={{
                      uri: Constants.imageUrl + 'category-image/' + item.image,
                    }}
                    style={{height: 100, width: 100, borderRadius: 15}}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      borderRadius: 10,
                    }}
                    onPress={() => deleteImage(item.id)}>
                    <RemoveIcon />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </View>
      {/* <Loader modalVisible={loading} setModalVisible={setLoading} /> */}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({});
