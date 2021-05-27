import i18n from 'i18n-js';
import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { baseUrl } from '../../../apis/baseApi';
import { useGlobals } from '../../../contexts/Global';

const { width, height } = Dimensions.get('window');

function Logo({ navigation }) {
  const [{ userInfo }] = useGlobals();
  const [comLogo, setComLogo] = React.useState('');

  React.useEffect(() => {
    if (userInfo.company_info && userInfo.company_info.length > 0) {
      // console.log(userInfo.company_info);
      setComLogo(userInfo.company_info[0].url);
    }
  });

  return (
    <Image
      style={styles.image}
      source={
        comLogo
          ? { uri: `${baseUrl}storage/${comLogo}` }
          : require('../../../../assets/images/icon.png')
      }
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: ((width > height ? width : height) * 20) / 100,
    height: ((width > height ? width : height) * 8) / 100,
    resizeMode: 'contain',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default Logo;
