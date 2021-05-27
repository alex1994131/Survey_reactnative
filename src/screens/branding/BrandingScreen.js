import React, { useState } from 'react';
import {
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  BackHandler,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { baseUrl } from '../../apis/baseApi';
import ShowFromTop from '../../components/animations/ShowFromTop';
import { DefaultView } from '../../components/containers';
import SpaceSky from '../../components/decorations/SpaceSky';
import { useGlobals } from '../../contexts/Global';

/**
 * @param navigation
 * @returns {*}
 * @constructor
 */
let brandImgs = [
  require('../../../assets/images/brands/5.jpg'),
  require('../../../assets/images/brands/1.jpeg'),
  require('../../../assets/images/brands/23.jpg'),
  require('../../../assets/images/brands/15.jpg'),
  // require('../../../assets/images/brands/2.png'),
  require('../../../assets/images/brands/3.png'),
  // require('../../../assets/images/brands/4.png'),
  // require('../../../assets/images/brands/6.png') ,
  require('../../../assets/images/brands/7.jpg'),
  require('../../../assets/images/brands/8.png'),
  require('../../../assets/images/brands/9.jpg'),
  // require('../../../assets/images/brands/10.png') ,
  // require('../../../assets/images/brands/11.jpg') ,
  // require('../../../assets/images/brands/12.png') ,
  require('../../../assets/images/brands/13.jpg'),
  require('../../../assets/images/brands/14.png'),
  // require('../../../assets/images/brands/16.png'),
  // require('../../../assets/images/brands/17.jpg') ,
  // require('../../../assets/images/brands/18.png'),
  require('../../../assets/images/brands/19.jpg'),
  // require('../../../assets/images/brands/20.png'),
  require('../../../assets/images/brands/21.jpg'),
  // require('../../../assets/images/brands/22.png'),
  // require('../../../assets/images/brands/24.png'),
  require('../../../assets/images/brands/25.jpg'),
  require('../../../assets/images/brands/26.png'),
  // require('../../../assets/images/brands/27.jpg'),
  // require('../../../assets/images/brands/28.png'),
  require('../../../assets/images/brands/29.jpg'),
  require('../../../assets/images/brands/30.jpeg'),
  // require('../../../assets/images/brands/31.webp'),
  // require('../../../assets/images/brands/32.png'),
  // require('../../../assets/images/brands/33.jpg'),
];
let brandImgsBuf = [
  require('../../../assets/images/brands/5.jpg'),
  require('../../../assets/images/brands/1.jpeg'),
  require('../../../assets/images/brands/23.jpg'),
  require('../../../assets/images/brands/15.jpg'),
  // require('../../../assets/images/brands/2.png'),
  require('../../../assets/images/brands/3.png'),
  // require('../../../assets/images/brands/4.png'),
  // require('../../../assets/images/brands/6.png') ,
  require('../../../assets/images/brands/7.jpg'),
  require('../../../assets/images/brands/8.png'),
  require('../../../assets/images/brands/9.jpg'),
  // require('../../../assets/images/brands/10.png') ,
  // require('../../../assets/images/brands/11.jpg') ,
  // require('../../../assets/images/brands/12.png') ,
  require('../../../assets/images/brands/13.jpg'),
  require('../../../assets/images/brands/14.png'),
  // require('../../../assets/images/brands/16.png'),
  // require('../../../assets/images/brands/17.jpg') ,
  // require('../../../assets/images/brands/18.png'),
  require('../../../assets/images/brands/19.jpg'),
  // require('../../../assets/images/brands/20.png'),
  require('../../../assets/images/brands/21.jpg'),
  // require('../../../assets/images/brands/22.png'),
  // require('../../../assets/images/brands/24.png'),
  require('../../../assets/images/brands/25.jpg'),
  require('../../../assets/images/brands/26.png'),
  // require('../../../assets/images/brands/27.jpg'),
  // require('../../../assets/images/brands/28.png'),
  require('../../../assets/images/brands/29.jpg'),
  require('../../../assets/images/brands/30.jpeg'),
  // require('../../../assets/images/brands/31.webp'),
  // require('../../../assets/images/brands/32.png'),
  // require('../../../assets/images/brands/33.jpg'),
];

function BrandingScreen({ navigation }) {
  const [{ userInfo }, dispatch] = useGlobals();
  const [brandIndex, setIndex] = React.useState(0);
  const [brand, setBrand] = React.useState('');
  const [dim, setDim] = React.useState(Dimensions.get('screen'));

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', _handleBackButton);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', _handleBackButton);
  })

  const _handleBackButton = () => {
    return true;
  }

  Dimensions.addEventListener('change', () => 
  {
    console.log(dim.width);
    setDim(Dimensions.get('screen'));
  });
  const { colors } = useTheme();

  React.useEffect(() => {
    if (userInfo.brands){
      brandImgs = [];
      if (userInfo.brands && userInfo.brands.length > 0) {
        userInfo.brands.map((brand, index) => {
          const pic = brand.url;
          brandImgs.push({ uri: `${baseUrl}storage/${pic}` });
        });
        // console.log(brandImgs);
      } else {
        brandImgs = brandImgsBuf;
      }
    }
    const intervalNumber = setInterval(() => {
      if (brandIndex < brandImgs.length - 1) {
        setIndex(brandIndex + 1);
      } else {
        setIndex(0);
      }
      setBrand(brandImgs[brandIndex]);
    }, 5000);
    return () => clearInterval(intervalNumber);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SpaceSky />
      <DefaultView style={{}}>
        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => navigation.navigate('Language')}
        >
          {/* <ShowFromTop duration={1000}> */}
          <View>
            {brand ? (
              <Image
                style={[
                  styles.image,
                  {
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height,
                  },
                ]}
                source={brand}
              />
            ) : (
              <></>
            )}
          </View>
          {/* </ShowFromTop> */}
        </TouchableOpacity>
      </DefaultView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touchContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  image: {
    resizeMode: 'cover',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default BrandingScreen;
