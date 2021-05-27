import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Headline, Text, useTheme } from 'react-native-paper';
import TouchableScale from 'react-native-touchable-scale';

import { DefaultView } from '../../components/containers';
import ImgIcon from '../../components/decorations/ImgIcon';
import SpaceSky from '../../components/decorations/SpaceSky';
import { useGlobals } from '../../contexts/Global';

/**
 * To see all supported flag icon
 * Please visit here.
 * https://www.countryflags.io/
 */

function LanuageScreen({ navigation }) {
  const [{ userInfo }, dispatch] = useGlobals();
  const [flags, setFlags] = React.useState(['us']);

  React.useEffect(() => {
    // setFlags(['us', 'cn', 'ru']);
    const infoArray = userInfo.languages;
    console.log(infoArray);
    if (!infoArray) setFlags(['us', 'cn', 'ru']);
    else {
      const array = infoArray;
      setFlags(array);
      console.log('lang: ', array);
    }
  }, [userInfo]);

  const handleOnPress = (lang) => {
    let lan = lang;
    const fromCountryCode = {
      cn: 'zh-Hans',
    };
    if (fromCountryCode[lang]) lan = fromCountryCode[lang];
    dispatch({
      type: 'setLanguage',
      fields: lan,
    });
    navigation.navigate('Question');
  };

  return (
    <DefaultView>
      <SpaceSky />
      <View style={{ flex: 0.2 }} />
      <View style={styles.textContainer}>
        <Headline style={styles.textHeadline}>Please Select Language</Headline>
      </View>
      <View style={styles.flagContainer}>
        {flags.map((flag, index) => {
          return (
            <TouchableScale
              onPress={() => {
                handleOnPress(flag);
              }}
              key={index}
              activeScale={0.9}
            >
              <View>
                <ImgIcon
                  source={{
                    uri: `https://www.countryflags.io/${flag}/shiny/64.png`,
                  }}
                  style={styles.flagIcon}
                />
                <Text style={styles.flagText}>{flag}</Text>
              </View>
            </TouchableScale>
          );
        })}
      </View>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 0.8,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  textHeadline: {
    paddingTop: '10%',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  flagIcon: {
    paddingVertical: 5,
    borderWidth: 40,
    borderRadius: 50,
  },
  flagContainer: {
    flex: 1,
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  flagText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default LanuageScreen;
