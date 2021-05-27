import i18n from 'i18n-js';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  ToastAndroid,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Button, Headline, Text, useTheme } from 'react-native-paper';

import { login, logo_request } from '../../apis/auth';
import { baseUrl } from '../../apis/baseApi';
import { resend } from '../../apis/update';
import { DefaultView } from '../../components/containers';
import SpaceSky from '../../components/decorations/SpaceSky';
import CustomInput from '../../components/paper/CustomInput';
import { useGlobals } from '../../contexts/Global';

const { width, height } = Dimensions.get('screen');
let agentId = -1;
let rqstToken = '';
let respData = {};
let self;
let intervalNumber = 0;
let userData;
/**
 * @param navigation
 * @returns {*}
 * @constructor
 */

function NameScreen({ navigation }) {
  const [{ userInfo }, dispatch] = useGlobals();
  const [userID, setUserID] = React.useState('xy@gmail.com');
  const [password, setPassword] = React.useState('user1234');
  const [showAlert, setShowAlert] = React.useState(false);
  const [showProgress, setShowProgress] = React.useState(false);
  const [respNeed, setResNeed] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('Unkown Error');
  const [logoNeed, setLogoNeed] = React.useState(true);
  const [logoSrc, setLogo] = React.useState();

  React.useEffect(() => {
    if (logoNeed) {
      logo_request().then((result) => {
        if (result) {
          setLogoNeed(false);
          setLogo(result.logo);
        }
      });
    }
    if (respNeed) {
      dispatch({
        type: 'setUserInfo',
        fields: {
          ...userData,
          branch_name: userInfo.branch_name,
          company_info: respData.company_info
            ? respData.company_info
            : userInfo.company_info,
          template: respData.template ? respData.template : userInfo.template,
          survey: respData.survey ? respData.survey : userInfo.survey,
          languages: respData.languages
            ? respData.languages
            : userInfo.languages,
          header_color: respData.header_color
            ? respData.header_color
            : userInfo.header_color,
          footer_color: respData.footer_color
            ? respData.footer_color
            : userInfo.footer_color,
          background_color: respData.background_color
            ? respData.backgroundColor
            : userInfo.backgroundColor,
          questions: respData.questions
            ? respData.questions
            : userInfo.questions,
          ratings: respData.ratings ? respData.ratings : userInfo.ratings,
          brands: respData.brands ? respData.brands : userInfo.brands,
          message: respData.message ? respData.message : userInfo.message,
          token: rqstToken,
        },
      });
      console.log('--- we are here --');
      setResNeed(false);
    }
  }, [respNeed]);

  const buttonDisabled =
    !userID || userID.length < 2 || !password || password.length < 6;
  const _handleContinue = async () => {
    try {
      setShowProgress(true);
      const {
        data,
        branch_name,
        company_info,
        template,
        survey,
        languages,
        questions,
        ratings,
        header_color,
        footer_color,
        background_color,
        brands,
        message,
        token,
        errors,
      } = await login(userID, password);
      dispatch({
        type: 'setUserInfo',
        fields: {
          ...data,
          branch_name,
          company_info,
          template,
          languages,
          survey,
          header_color,
          footer_color,
          background_color,
          questions,
          ratings,
          brands,
          message,
          token,
        },
      });
      setShowProgress(false);
      if (token) {
        agentId = data.id;
        rqstToken = token;
        self = setResNeed;
        userData = data;
        clearInterval(intervalNumber);
        intervalNumber = setInterval(async () => {
          if (agentId != -1) {
            const {
              data,
              branch_name,
              company_info,
              template,
              survey,
              header_color,
              footer_color,
              background_color,
              languages,
              questions,
              ratings,
              brands,
              token,
              errors,
            } = await resend({ agent_id: agentId }, rqstToken);
            if (errors) {
              ToastAndroid.show(errors, ToastAndroid.SHORT);
            }
            respData = {
              company_info,
              template,
              survey,
              header_color,
              footer_color,
              background_color,
              languages,
              questions,
              ratings,
              brands,
              message,
            };
            // console.log(respData);
            self(true);
          }
        }, 30000);
        navigation.push('Branding');
      } else {
        setErrorMsg(errors);
        setShowAlert(true);
      }
    } finally {
      // console.log('received: ', userInfo);
    }
  };

  React.useEffect(() => {
    // return () => clearInterval(intervalNumber);
  });

  return (
    <DefaultView>
      <SpaceSky />
      <View style={{ flex: 0.5 }} />
      <View style={styles.textContainer}>
        <Headline style={styles.textHeadline}>
          {i18n.t('Are you our agent?')}
        </Headline>
        <Text style={styles.textText}>
          {i18n.t(
            'In order to give you accurate and personal information we need to know some info'
          )}
        </Text>
      </View>
      {/* <View style={{ flex: 0.2 }} /> */}
      <View style={styles.logoContainer}>
        <Image
          style={[
            styles.image,
            // {
            //   width:
            //     ((dim.width < dim.height ? dim.width : dim.height) * 60) / 100,
            // },
          ]}
          reszieMode="center"
          source={
            logoSrc
              ? { uri: `${baseUrl}storage/${logoSrc}` }
              : require('../../../assets/images/logo.png')
          }
        />
      </View>
      {/* <View style={{ flex: 0.2 }} /> */}
      <View style={styles.inputContainer}>
        <CustomInput
          value={userID}
          placeholder={i18n.t('Email Address')}
          onChangeText={(text) => setUserID(text)}
          style={{ fontSize: 12 }}
          maxLength={20}
        />
        <CustomInput
          value={password}
          placeholder={i18n.t('Password')}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          style={{ fontSize: 12 }}
          maxLength={20}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          disabled={buttonDisabled}
          onPress={_handleContinue}
        >
          {i18n.t('Login')}
        </Button>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Login failure!"
        message={errorMsg}
        closeOnTouchOutside
        closeOnHardwareBackPress={false}
        showCancelButton
        cancelText="Close"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
      />
      <AwesomeAlert
        show={showProgress}
        useNativeDriver
        showProgress
        progressColor="gray"
        title="Loding..."
        contentContainerStyle={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
      />
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 0.8,
    alignSelf: 'center',
    paddingVertical: 20,
    // backgroundColor: 'grey',
  },
  textHeadline: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  textText: {
    textAlign: 'center',
    paddingVertical: 5,
  },
  logoContainer: {
    height: 'auto',
    alignSelf: 'center',
    // backgroundColor: 'gray',
    zIndex: 1,
  },
  image: {
    width: ((width < height ? width : height) * 60) / 100,
    height: ((width < height ? width : height) * 30) / 100,
    resizeMode: 'contain',
  },
  inputContainer: {
    // flex: 1,
    paddingHorizontal: 20,
    opacity: 0.9,
    marginVertical: 10,
    // backgroundColor: 'grey',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    // justifyContent: 'flex-end',
    marginBottom: 25,
  },
});

export default NameScreen;
