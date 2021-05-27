import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Headline, Text, useTheme } from 'react-native-paper';

import { DefaultView } from '../../components/containers';
import SpaceSky from '../../components/decorations/SpaceSky';
import { useGlobals } from '../../contexts/Global';
import Translate from '../../utils/translate';
import RaderBar from './component/RaderBar';
import Smiley from './component/Smiley';
import TextRate from './component/TextRate';

function QuestionScreen({
  navigation,
  questionId = 'None',
  onPress = () => {},
}) {
  const [{ userInfo }, dispatch] = useGlobals();
  const [question, setQuestion] = React.useState({});
  const [ratings, setRatings] = React.useState([]);
  const [showAlert, setShowAlert] = React.useState(false);
  const [ratingScore, setRatingScore] = React.useState();
  const [questionText, setQuestionText] = React.useState(
    'No translated Question'
  );
  const [errMsg, setErrMsg] = React.useState('Survey not ready yet!');
  const scrollViewRef = useRef();

  React.useEffect(() => {
    const infoArray = userInfo.questions;
    // console.log(infoArray, questionId);
    if (infoArray && questionId != 'None') {
      const array = {};
      infoArray.map((info, index) => {
        array[info.id] = {
          id: info.id,
          description: info.description,
          rating_cat_id: info.rating_cat_id,
          answer: info.answer,
          survey_id: info.survey_id,
          class: info.class,
        };
      });
      setQuestion(array[questionId]);
      // console.log(array[questionId]);
      const ans = array[questionId]['answer'];
      setRatings(ans.split(':'));

      // setQuestionText(array[questionId].description);
    } else {
      // setQuestionText('');
      // if (userInfo.message) setErrMsg(userInfo.message);
      // else setErrMsg('Survey not ready yet!');
    }
    console.log(questionText, errMsg);
  }, [userInfo, questionId]);

  const handleOnPress = (rtScore, rat_id = -1) => {
    // console.log('ratingPressed ', rtScore, question.class);
    if (question.rating_cat_id == 3) {
      if (rtScore == 5 || rtScore == 5.0 / ratings[0]) {
        setShowAlert(true);
        setRatingScore(rtScore);
        return;
      }
    }

    if (question.rating_cat_id == 1) {
      console.log(rat_id, ratings[ratings.length - 1]);
      if (
        rtScore == 5 ||
        rat_id == ratings[0] ||
        rat_id == ratings[ratings.length - 1]
      ) {
        setShowAlert(true);
        setRatingScore(rtScore);
        return;
      }
    }
    onPress(rtScore, question.class);
  };

  return (
    <DefaultView
      background={
        userInfo.background_color ? `${userInfo.background_color}` : 'white'
      }
    >
      {/* <SpaceSky /> */}
      <View style={{ flex: 0.2 }} />
      <View style={styles.textContainer}>
        <Headline style={styles.textHeadline}>{questionText}</Headline>
      </View>
      <View style={styles.sexContainer}>
        <ScrollView
          contentContainerStyle={styles.ratingContainer}
          horizontal
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
          }
        >
          {questionId === 'None' || !question || !ratings.length ? (
            <Text>{errMsg}</Text>
          ) : question.rating_cat_id == 1 ? (
            <View style={styles.scrollContainer}>
              {ratings.map((rating, index) => {
                // console.log(rating);
                return (
                  <Smiley
                    smileyId={rating}
                    idArray={ratings}
                    key={index}
                    onPress={handleOnPress}
                  />
                );
              })}
            </View>
          ) : question.rating_cat_id == 2 ? (
            <TextRate onPress={handleOnPress} />
          ) : (
            <RaderBar raderNum={ratings[0]} onPress={handleOnPress} />
          )}
        </ScrollView>
      </View>
      <View style={{ flex: 0.2 }} />
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Comment"
        // message="I have a message for you!"
        contentContainerStyle={{ width: '60%', height: '60%' }}
        // contentStyle={{fontSize: 34}}
        titleStyle={{fontSize: 32}}
        messageStyle={{fontSize: 24}}
        confirmButtonTextStyle={{fontSize: 24}}
        closeOnTouchOutside
        closeOnHardwareBackPress={false}
        // showCancelButton={true}
        showConfirmButton
        customView={
          // renderCustomAlertView()
          <View style={[styles.input]}>
            <TextInput
              placeholder="Write your reason briefly."
              underlineColorAndroid="transparent"
              style={{ textAlignVertical: 'top', height: '55%', fontSize: 24 }}
              numberOfLines={5}
              multiline
              maxLength={200}
              // onChangeText={(cancel_reason) => this.setState({cancel_reason})}
            />
          </View>
        }
        // cancelText="Cancel"
        confirmText="Confirm"
        confirmButtonColor="#6BDD55"
        // onCancelPressed={() => {
        //   setShowAlert();
        // }}
        onConfirmPressed={() => {
          setShowAlert(false);
          onPress(ratingScore, question.class);
        }}
      />
      <Translate
        text={
          question.description ? question.description : 'No translated Question'
        }
        onTranslated={setQuestionText}
      />
      <Translate
        text={userInfo.message ? userInfo.message : 'Survey not ready yet!'}
        onTranslated={setErrMsg}
      />
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 0.4,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  textHeadline: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'black',
  },
  textText: {
    textAlign: 'center',
    paddingVertical: 5,
  },
  sexContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
  },
  ratingContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  scrollContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  sexText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default QuestionScreen;
