import {View, Text, Share} from 'react-native';
import React from 'react';
import Constants from '../Helpers/constant';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const SharePost = async data => {
  console.log(data);

  const param = {
    link: Constants.baseUrl + data.post_id,
    domainUriPrefix: 'https://kanpidnivethika.page.link',
    android: {
      packageName: 'com.kanpid.nivethika',
      fallbackUrl: 'https://play.google.com/store/apps/details?id=com.kanpid',
      // fallbackUrl: `https://www.kanpid.com/item-view/${data.post_id}`,
    },
    // ios: this._iosConfig,
    social: {
      title: data.title,
      descriptionText: data.description,
      imageUrl: data.image,
    },
    navigation: {
      forcedRedirectEnabled: false,
    },
    enableForcedRedirect: 1,
    analytics: {
      campaign: 'banner',
    },
  };
  console.log(param);
  const link = await dynamicLinks().buildShortLink(param, 'SHORT');
  console.log(link);
  // try {
  return await Share.share({
    Url: link,
    message: link || '',
    title: link || '',
  });
  if (result.action === Share.sharedAction) {
    if (result.activityType) {
      console.log(result.activityType);
    } else {
      return result;
      console.log(result);
    }
  } else if (result.action === Share.dismissedAction) {
    // dismissed
  }
  // } catch (error) {
  //   alert(error.message);
  // }
};

export default SharePost;
