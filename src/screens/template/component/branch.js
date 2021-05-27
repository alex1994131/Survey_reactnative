import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Title } from 'react-native-paper';

import { useGlobals } from '../../../contexts/Global';
import Translate from '../../../utils/translate';

function Branch({ navigation }) {
  const [{ userInfo }] = useGlobals();
  const [branch_name, setBranch] = React.useState('Unkown Branch');
  const [branchText, setBranchText] = React.useState('Unkown Branch');

  React.useEffect(() => {
    if (userInfo.branch_name) setBranch(userInfo.branch_name);
  }, [userInfo]);

  return (
    <View>
      <Title
        style={{
          fontSize:
            Dimensions.get('screen').width > Dimensions.get('screen').height
              ? 24
              : 16,
        }}
      >
        {branchText}
      </Title>
      <Translate text={branch_name} onTranslated={setBranchText} />
    </View>
  );
}

const styles = StyleSheet.create({
  branchContainer: {
    flexDirection: 'row',
  },
});

export default Branch;
