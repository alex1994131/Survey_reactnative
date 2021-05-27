import i18n from 'i18n-js';
import { array } from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import TouchableScale from 'react-native-touchable-scale';

import { baseUrl } from '../../../apis/baseApi';
import ImgIcon from '../../../components/decorations/ImgIcon';
import { useGlobals } from '../../../contexts/Global';

function RaderBar({ navigation, raderNum = 0, onPress = () => {} }) {
  const [raders, setRaders] = React.useState([]);

  React.useEffect(() => {
    const array = [];
    for (let i = 0; i < raderNum; i++) {
      array.push(i + 1);
    }
    setRaders(array);
  }, [raderNum]);

  const _handleContinue = (num) => {
    // navigation.push('Relationship');
    onPress((num * 5.0) / raderNum);
  };
  return (
    <View style={styles.radersContainer}>
      {raders.map((num, index) => {
        return (
          <TouchableScale
            key={index}
            onPress={() => {
              _handleContinue(num);
            }}
            activeScale={0.9}
          >
            <View>
              <ImgIcon
                source={
                  // smileyId === 'None' || !smiley[smileyId]
                  require('../../../../assets/images/ladder.png')
                  // : { uri: `${baseUrl}storage/${smiley[smileyId].content}` }
                }
                iconSize={70}
              />
              <View style={styles.raderView}>
                <Text style={styles.raderText}>{num}</Text>
              </View>
            </View>
          </TouchableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  radersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'gray',
    flex: 1,
  },
  raderView: {
    zIndex: 5,
    position: 'absolute',
    top: '0%',
    left: '0%',
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'gray',
    width: '100%',
    height: '100%',
  },
  raderText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 32,
    alignSelf: 'center',
    color: 'white',
  }
});

export default RaderBar;
