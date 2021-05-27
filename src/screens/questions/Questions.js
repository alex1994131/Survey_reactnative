import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import { update } from '../../apis/update';
import { DefaultView } from '../../components/containers';
import { useGlobals } from '../../contexts/Global';
import Translate from '../../utils/translate';
import Footer from '../template/footer';
import Header from '../template/header';
import QuestionScreen from './QuestionScreen';

/**
 * To see all supported language, please visit here.
 * https://docs.microsoft.com/en-us/azure/cognitive-services/translator/language-support
 */
function Questions({ navigation }) {
  const [{ userInfo, language }, dispatch] = useGlobals();
  const [question, setQuestion] = React.useState([]);
  const [showAlert, setShowAlert] = React.useState(false);
  const [showTitle, setShowTitle] = React.useState('Poll sending failure!');
  const [errorMsg, setErrorMsg] = React.useState('Unkown Error');
  const [curQId, setCurQId] = React.useState(0);
  const [total, setTotal] = React.useState([0, 0, 0, 0, 0]);
  const [totalCnt, setTotalCnt] = React.useState([0, 0, 0, 0, 0]);

  React.useEffect(() => {
    const infoArray = userInfo.questions;
    if (infoArray) {
      const array = [];
      infoArray.map((info, index) => {
        array.push(info.id);
      });
      setQuestion(array);
      // setCurQId(0);
      // setRatingCnt(0);
    }
  }, [userInfo, language]);

  const handleOnPress = async (qScore, ag_class) => {
    console.log('onPress', qScore, ag_class, curQId);
    if (qScore === 'NaN') {
      setShowTitle('Poll sending failure!');
      setErrorMsg('ERROR: Rating source is not defined.');
      setShowAlert(true);
      setTotal([0, 0, 0, 0, 0]);
      setTotalCnt([0, 0, 0, 0, 0]);
      setCurQId(0);
      return;
    }
    if (curQId < question.length - 1) {
      if (qScore != 'Text') {
        let array = total;
        array[ag_class] += qScore;
        setTotal(array);
        array = totalCnt;
        array[ag_class]++;
        setTotalCnt(array);
      }
      // console.log('totol: ', total, 'cnt: ', totalCnt);
      setCurQId(curQId + 1);
    } else {
      if (qScore != 'Text') {
        let array = total;
        array[ag_class] += qScore;
        setTotal(array);
        array = totalCnt;
        array[ag_class]++;
        setTotalCnt(array);
      }

      // console.log('totol: ', total, 'cnt: ', totalCnt);
      let totalScore = 0;
      let totalScoreCnt = 0;
      for (let i = 1; i < 5; i++) {
        if (totalCnt[i] > 0) {
          totalScore += (total[i] * 1.0) / totalCnt[i];
          totalScoreCnt++;
        }
      }
      // console.log('totalScore: ', totalScore, 'totalScoreCnt: ', totalScoreCnt);

      const data = {
        score: (totalScore * 1.0) / totalScoreCnt,
        score_emp: totalCnt[1] ? (total[1] * 1.0) / totalCnt[1] : 0,
        score_ser: totalCnt[2] ? (total[2] * 1.0) / totalCnt[2] : 0,
        score_env: totalCnt[3] ? (total[3] * 1.0) / totalCnt[3] : 0,
        score_non: totalCnt[4] ? (total[4] * 1.0) / totalCnt[4] : 0,
        owner_id: userInfo.parent_id,
        branch_id: userInfo.branch,
        agent_id: userInfo.id,
      };
      // setShowProgress(true);
      const status = await update(data, userInfo.token);
      // setShowProgress(false);

      if (status.errors) {
        setShowTitle('Poll sending failure!');
        setErrorMsg(status.errors);
        setShowAlert(true);
      }

      navigation.push('Company');
      setTotal([0, 0, 0, 0, 0]);
      setTotalCnt([0, 0, 0, 0, 0]);
      setCurQId(0);
    }
  };

  return (
    <DefaultView>
      <View style={[
          styles.headerContainer,
          userInfo.header_color
            ? { backgroundColor: `#${userInfo.header_color}` }
            : { backgroundColor: 'rgba(255,255,255,0.5)' },
        ]}>
        <Header />
      </View>
      <DefaultView style={{ height: '100%' }}>
        {!question ? (
          <></>
        ) : (
          <QuestionScreen
            questionId={question[curQId]}
            onPress={handleOnPress}
          />
        )}
      </DefaultView>
      <View style={[
          styles.footerContainer,
          userInfo.footer_color
            ? { backgroundColor: `#${userInfo.footer_color}` }
            : { backgroundColor: 'rgba(255,255,255,0.5)' },
        ]}>
        <Footer />
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={showTitle}
        message={errorMsg}
        closeOnTouchOutside
        closeOnHardwareBackPress
        showCancelButton
        cancelText="Close"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
      />
      <Translate text={showTitle} onTranslated={setShowTitle}/>
      <Translate text={errorMsg} onTranslated={setErrorMsg}/>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // zIndex: 10,
    height: 100,
  },
  footerContainer: {
    // zIndex: 10,
    height: 100,
  },
});

export default Questions;
