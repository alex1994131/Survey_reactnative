import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Headline, Text, useTheme } from 'react-native-paper';
import TouchableScale from 'react-native-touchable-scale';

import { DefaultView } from '../../components/containers';
import ImgIcon from '../../components/decorations/ImgIcon';
import SpaceSky from '../../components/decorations/SpaceSky';
import { useGlobals } from '../../contexts/Global';
import Translate from '../../utils/translate';

/**
 * @param navigation
 * @returns {*}
 * @constructor
 */
function CompanyScreen({ navigation }) {
  const [{ userInfo }, dispatch] = useGlobals();
  const [title, setTitle] = React.useState([
    'Thank for your Feedback',
    'You are all set',
    'Follow Our Social Media Pages',
  ]);
  const [transEnd, setTransEnd] = React.useState(false);
  const [linkTo, setLink] = React.useState([]);
  // const [timeNum, setTimeNum] = React.useState(0);

  React.useEffect(() => {
    let array = [];
    // console.log(userInfo.company_info);
    if(!userInfo.company_info || userInfo.company_info.length == 0)
      array = ['', 'https://www.facebook.com', 'https://www.instagram.com', 'https://twitter.com', 'https://www.linkedin.com'];
    else {
      userInfo.company_info.map((info, index) => {
        array.push(info.url);
      });
    }
    setLink(array);
    console.log('ok: ');

    // if(timeNum) clearTimeout(timeNum);
    const timeoutNumber = setTimeout(() => {
      navigation.push('Branding');
    }, 20000);
    // setTimeNum(timeoutNumber);
    return () => clearTimeout(timeoutNumber);
  }, [userInfo]);

  const handleTranslated = (str) => {
    console.log(str.split('>'));
    if (!transEnd) {
      setTitle(str.split('>'));
      setTransEnd(true);
    }
  };

  const _handleOpenWithWebBrowser = (idx) => {
    console.log(linkTo[idx]);
    if (linkTo.length <= idx) return;
    WebBrowser.openBrowserAsync(linkTo[idx]);
  };

  return (
    <DefaultView>
      <SpaceSky />
      <View style={{ flex: 0.4 }} />
      <View style={styles.textContainer}>
        <Headline style={styles.textHeadline}>{title[0]}</Headline>
        <Text style={styles.textText}>{title[1]}</Text>
        <Text style={styles.textText2}>{title[2]}</Text>
      </View>
      <View style={styles.logoContainer}>
        <TouchableScale
          onPress={() => _handleOpenWithWebBrowser(1)}
          style={styles.linkIcons}
          activeScale={1}
        >
          <ImgIcon source={require('../../../assets/images/facebook.png')} />
        </TouchableScale>
        <TouchableScale
          onPress={() => _handleOpenWithWebBrowser(2)}
          style={styles.linkIcons}
          activeScale={1}
        >
          <ImgIcon source={require('../../../assets/images/instagram.png')} />
        </TouchableScale>
        <TouchableScale
          onPress={() => _handleOpenWithWebBrowser(3)}
          style={styles.linkIcons}
          activeScale={1}
        >
          <ImgIcon source={require('../../../assets/images/twitter.png')} />
        </TouchableScale>
        <TouchableScale
          onPress={() => _handleOpenWithWebBrowser(4)}
          style={styles.linkIcons}
          activeScale={1}
        >
          <ImgIcon source={require('../../../assets/images/linkedin.png')} />
        </TouchableScale>
      </View>
      {!transEnd ? (
        <Translate text={title.join('>')} onTranslated={handleTranslated} />
      ) : (
        <></>
      )}
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1.5,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  textHeadline: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 32,
  },
  textText: {
    textAlign: 'center',
    paddingVertical: 5,
  },
  textText2: {
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 24,
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 25,
    zIndex: 1,
    // backgroundColor: 'gray',
    justifyContent: 'space-evenly',
    width: '70%',
  },
  linkIcons: {
    width: 100,
    height: 100,
  },
});

export default CompanyScreen;
