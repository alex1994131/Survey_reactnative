import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import TouchableScale from 'react-native-touchable-scale';

import { baseUrl } from '../../../apis/baseApi';
import ImgIcon from '../../../components/decorations/ImgIcon';
import { useGlobals } from '../../../contexts/Global';
import Translate from '../../../utils/translate';

let maxScore = 0;
let minScore = 0;

function Smiley({
  navigation,
  smileyId = 'None',
  ratings,
  onPress = () => {},
}) {
  const [{ userInfo }, dispatch] = useGlobals();
  const [smiley, setSmiley] = React.useState({});
  const [smileyText, setSmileyText] = React.useState('Unkown');

  React.useEffect(() => {
    const infoArray = userInfo.ratings;
    // console.log(infoArray);
    if (infoArray && smileyId !== 'None') {
      const array = {};
      maxScore = 0;
      minScore = -1;
      infoArray.map((info, index) => {
        array[info.id] = {
          id: info.id,
          name: info.name,
          score: info.score,
          content: info.content,
        };
        if (info.score > maxScore) maxScore = info.score;
        if (minScore == -1 || info.score < minScore) minScore = info.score;
      });
      setSmiley(array);
      // setSmileyText(array.name);
    } else {
      // setSmileyText('Unkown');
    }
  }, [userInfo]);

  const _handleContinue = () => {
    // console.log(
    //   'smiley: ',
    //   maxScore,
    //   smiley[smileyId].score,
    //   (smiley[smileyId].score * 5.0) / maxScore
    // );
    if (!maxScore || smileyId === 'None' || !smiley[smileyId]) onPress('NaN');
    else
      onPress(
        (smiley[smileyId].score * 5.0) / maxScore,
        // smiley[smileyId].score == minScore
        smileyId
      );
  };
  return (
    <TouchableScale
      onPress={() => {
        _handleContinue();
      }}
      activeScale={0.9}
    >
      <View style={styles.container}>
        <ImgIcon
          source={
            smileyId === 'None' || !smiley[smileyId]
              ? require('../../../../assets/images/s2.png')
              : { uri: `${baseUrl}storage/${smiley[smileyId].content}` }
          }
        />
        <Text style={styles.sexText}>{smileyText}</Text>
      </View>
      <Translate
        text={
          smileyId === 'None' || !smiley[smileyId]
            ? 'Unkown'
            : smiley[smileyId].name
        }
        onTranslated={setSmileyText}
      />
    </TouchableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 50,
  },
  sexText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Smiley;
