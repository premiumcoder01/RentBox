import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constant from './Constant';

const Post = async (url, data) => {
  return axios
    .post(Constant.baseUrl + url, data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
      if (err.response) {
        return err.response;
      }
    });
};

const GetApi = async url => {
  const user = await AsyncStorage.getItem('userInfo');
  let userDetail = JSON.parse(user);
  return axios
    .get(Constant.baseUrl + url, {
      headers: {
        Authorization: `Bearer ${userDetail?.token | ''}`,
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
      }
      return err;
    });
};

export {Post, GetApi};
