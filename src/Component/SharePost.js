import {View, Text, Share} from 'react-native';
import React from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Constants from '../src/utils/Constant';

const SharePost = async data => {
  const param = {
    link: Constants.baseUrl + data.title,
    domainUriPrefix: 'https://nivethika.page.link',
    android: {
      packageName: 'com.rentbox',
      // fallbackUrl: 'https://play.google.com/store/apps/details?id=com.kanpid',
      // fallbackUrl: `https://www.kanpid.com/item-view/${data.post_id}`,
    },
    // ios: this._iosConfig,
    social: {
      title: data.title,
      descriptionText: data.description,
      imageUrl: data.image,
    },
    navigation: {
      forcedRedirectEnabled: true,
    },
    enableForcedRedirect: 1,
    analytics: {
      campaign: 'banner',
    },
  };
  console.log('params', param);
  const link = await dynamicLinks().buildShortLink(param, 'SHORT');
  console.log('link', link);

  return await Share.share({
    Url: link,
    message: link || '',
    title: link || '',
  });
};

export default SharePost;
