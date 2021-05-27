import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Avatar, Title } from 'react-native-paper';

import { baseUrl } from '../../../apis/baseApi';
import { useGlobals } from '../../../contexts/Global';
import Translate from '../../../utils/translate';

function UserAvatar({ navigation }) {
  const [{ userInfo, language }] = useGlobals();
  const [name, setName] = React.useState('');
  const [avatar, setAvatar] = React.useState('');
  const [AvataTitle, setAvataTitle] = React.useState('Your are served by');
  const [DefaultName, setDefaultName] = React.useState('Unkown User');

  React.useEffect(() => {
    setName(userInfo.firstName + ' ' + userInfo.lastName);
    setAvatar(userInfo.photo);
  }, [userInfo, language]);

  return (
    <View style={styles.container}>
      {avatar ? (
        <Avatar.Image
          size={65}
          source={{ uri: `${baseUrl}storage/${userInfo.photo}` }}
        />
      ) : (
        <Avatar.Icon
          size={65}
          icon={require('../../../../assets/images/profile.png')}
        />
      )}
      <View style={{ marginLeft: 25, justifyContent: 'center' }}>
        <Title
          style={{
            fontSize:
              Dimensions.get('screen').width > Dimensions.get('screen').height
                ? 16
                : 14,
          }}
        >
          {AvataTitle}
        </Title>
        <Title
          style={{
            fontSize:
              Dimensions.get('screen').width > Dimensions.get('screen').height
                ? 18
                : 16,
          }}
        >
          {name ? name : DefaultName}
        </Title>
      </View>
      <Translate text="Your are served by" onTranslated={setAvataTitle} />
      <Translate text="Unkown User" onTranslated={setDefaultName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default UserAvatar;
