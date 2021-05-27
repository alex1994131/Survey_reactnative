import i18n from 'i18n-js';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Title } from 'react-native-paper';

import { DateUtils } from '../../../utils';

function Timer({ navigation }) {
  const [value, setValue] = React.useState();

  React.useEffect(() => {
    const intervalNumber = setInterval(() => {
      const createdDate = new Date();
      const date = DateUtils.toAmerican(createdDate);
      const time = createdDate.toLocaleTimeString(); //.replace(/(.*)\D\d+/, '$1');

      setValue(date + ' ' + time);
    }, 1000);
    return () => clearInterval(intervalNumber);
  });

  return (
    <Title
      style={{
        fontSize:
          Dimensions.get('screen').width > Dimensions.get('screen').height
            ? 30
            : 24,
        alignContent: 'center',
      }}
    >
      {value}
    </Title>
  );
}

const styles = StyleSheet.create({
});

export default Timer;
