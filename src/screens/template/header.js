import i18n from 'i18n-js';
import React, { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';

import { useGlobals } from '../../contexts/Global';
import UserAvatar from './component/avatar';
import Branch from './component/branch';
import Logo from './component/logo';
import Timer from './component/timer';

function Header({ navigation }) {
  const [{ userInfo }] = useGlobals();
  const [left, setLeft] = React.useState('Avatar&Name');
  const [center, setCenter] = React.useState('Current Time');
  const [right, setRight] = React.useState('Branch Name');
  const templateCom = {
    None: <></>,
    'Avatar&Name': <UserAvatar />,
    'Branch Name': <Branch />,
    Logo: <Logo />,
    'Current Time': <Timer />,
  };

  React.useEffect(() => {
//    console.log(userInfo.template);
    if (userInfo.template) {
      const lt = userInfo.template.header_left;
      const cn = userInfo.template.header_center;
      const rt = userInfo.template.header_right;
      if (lt) setLeft(lt);
      if (cn) setCenter(cn);
      if (rt) setRight(rt);
    }
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>{templateCom[left]}</View>
      <View style={styles.centerContainer}>{templateCom[center]}</View>
      <View style={styles.rightContainer}>{templateCom[right]}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(255,0,0,0.3)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leftContainer: {},
  centerContainer: {
    flexDirection: 'row',
  },
  rightContainer: {
    flexDirection: 'row',
  },
});

export default Header;
