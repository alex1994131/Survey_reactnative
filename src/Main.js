import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import React from 'react';
import { AppState, Image } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { SESSION_KEY } from './constants/session';
import themes from './constants/themes';
import { useGlobals } from './contexts/Global';
import InitialStackNavigation from './navigation/InitialStackNavigation';
import { DateUtils } from './utils';
import Storer from './utils/Storer';

/**
 * @returns {*}
 * @constructor
 */

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function Main() {
  const [{ session, theme, day }, dispatch] = useGlobals();
  const [isReady, setIsReady] = React.useState(false);
  const [appState, setAppState] = React.useState(AppState.currentState);
  const _theme = themes[theme];

  // Handles screen focus and case when user reopens app one day later (Date has to be updated)
  const _handleAppStateChange = (nextAppState) => {
    if (appState.match(/active/) && nextAppState === 'active') {
      const nDate = DateUtils.toAmerican(new Date());
      if (nDate !== day) {
        dispatch({
          type: 'setDay',
          day: nDate,
        });
      }
    }
    setAppState(nextAppState);
  };

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('../assets/images/logo.png'),
      require('../assets/images/ladder.png'),
      require('../assets/images/s2.png'),
      require('../assets/images/profile.png'),
      require('../assets/images/icon.png'),
      require('../assets/images/brands/5.jpg'),
      require('../assets/images/brands/1.jpeg'),
      require('../assets/images/brands/23.jpg'),
      require('../assets/images/brands/15.jpg'),
      // require('../assets/images/brands/2.png'),
      require('../assets/images/brands/3.png'),
      // require('../assets/images/brands/4.png'),
      // require('../assets/images/brands/6.png') ,
      require('../assets/images/brands/7.jpg'),
      require('../assets/images/brands/8.png'),
      require('../assets/images/brands/9.jpg'),
      // require('../assets/images/brands/10.png') ,
      // require('../assets/images/brands/11.jpg') ,
      // require('../assets/images/brands/12.png') ,
      require('../assets/images/brands/13.jpg'),
      require('../assets/images/brands/14.png'),
      // require('../assets/images/brands/16.png'),
      // require('../assets/images/brands/17.jpg') ,
      // require('../assets/images/brands/18.png'),
      require('../assets/images/brands/19.jpg'),
      // require('../assets/images/brands/20.png'),
      require('../assets/images/brands/21.jpg'),
      // require('../assets/images/brands/22.png'),
      // require('../assets/images/brands/24.png'),
      require('../assets/images/brands/25.jpg'),
      require('../assets/images/brands/26.png'),
      // require('../assets/images/brands/27.jpg'),
      // require('../assets/images/brands/28.png'),
      require('../assets/images/brands/29.jpg'),
      require('../assets/images/brands/30.jpeg'),
      // require('../assets/images/brands/31.webp'),
      // require('../assets/images/brands/32.png'),
      // require('../assets/images/brands/33.jpg'),
      require('../assets/images/facebook.png'),
      require('../assets/images/instagram.png'),
      require('../assets/images/twitter.png'),
      require('../assets/images/linkedin.png'),
    ]);

    await Promise.all([...imageAssets]);
  };

  // Deal with background/active app
  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  // Backbones
  React.useEffect(() => {
    // (async () => {
    //   try {
    //     const session = await Storer.get(SESSION_KEY);
    //     if (session) {
    //       dispatch({
    //         type: 'setSession',
    //         fields: { ...session },
    //       });
    //     }
    //   } finally {
    setIsReady(true);
    //   }
    // })();
  }, []);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <PaperProvider theme={_theme}>
      <NavigationContainer theme={_theme}>
        {/* {session.basicsDone ? ( */}
        {/* <MainStackNavigation /> */}
        {/* // ) : ( */}
        <InitialStackNavigation />
        {/* )} */}
      </NavigationContainer>
    </PaperProvider>
  );
}

export default Main;
