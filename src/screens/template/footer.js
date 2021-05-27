import i18n from 'i18n-js';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useGlobals } from '../../contexts/Global';
import UserAvatar from './component/avatar';
import Branch from './component/branch';
import Logo from './component/logo';
import Timer from './component/timer';

function Footer({ navigation }) {
  const [{ userInfo }] = useGlobals();
  const [left, setLeft] = React.useState('None');
  const [center, setCenter] = React.useState('Logo');
  const [right, setRight] = React.useState('None');
  const templateCom = {
    None: <></>,
    'Avatar&Name': <UserAvatar />,
    'Branch Name': <Branch />,
    Logo: <Logo />,
    'Current Time': <Timer />,
  };

  React.useEffect(() => {
    // console.log(userInfo.template);
    if (userInfo.template) {
      const lt = userInfo.template.footer_left;
      const cn = userInfo.template.footer_center;
      const rt = userInfo.template.footer_right;
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
  leftContainer: {
    flexDirection: 'row',
  },
  centerContainer: {
    flexDirection: 'row',
  },
  rightContainer: {
    flexDirection: 'row',
  },
});

export default Footer;
