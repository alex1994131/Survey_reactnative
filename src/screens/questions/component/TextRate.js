import i18n from 'i18n-js';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import CustomInput from '../../../components/paper/CustomInput';
import { useGlobals } from '../../../contexts/Global';

function TextRate({ navigation, onPress = () => {} }) {
  const [{ userInfo }, dispatch] = useGlobals();
  const [name, setName] = React.useState();
  const buttonDisabled = !name || name.length < 2;

  React.useEffect(() => {
    // const infoArray = userInfo.ratings;
    // // console.log(infoArray);
    // if (infoArray) {
    //   const array = {};
    //   infoArray.map((info, index) => {
    //     array[info.id] = {
    //       id: info.id,
    //       name: info.name,
    //       score: info.score,
    //       content: info.content,
    //     };
    //   });
    //   setSmiley(array);
    // }
  }, [userInfo]);

  const _handleContinue = () => {
    // navigation.push('Relationship');
    onPress('Text');
  };
  return (
    <View style={styles.inputContainer}>
      <CustomInput
        value={name}
        placeholder={i18n.t('Write here')}
        multiline
        onChangeText={(text) => setName(text)}
        style={{ fontSize: 12 }}
        maxLength={20}
      />
      <Button
        mode="contained"
        disabled={buttonDisabled}
        onPress={_handleContinue}
        style={{ marginTop: 20}}
      >
        {i18n.t('Continue')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    paddingHorizontal: 20,
    opacity: 0.9,
    // marginVertical: 150,
    // backgroundColor: 'rgba(0,0,255,0.3)',
  },
});

export default TextRate;
