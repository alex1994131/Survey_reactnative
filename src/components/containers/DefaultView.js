import PropTypes from 'prop-types';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTheme } from 'react-native-paper';

/**
 * @param children
 * @param theme react-native-paper theme
 * @param background
 * @param barStyle
 * @param keyboardAvoidView
 * @param styleView
 * @returns {*}
 * @constructor
 */
function DefaultView({
  children,
  background,
  barStyle,
  keyboardAvoidView,
  styleView,
}) {
  const { colors } = useTheme();
  const [dim, setDim] = React.useState(Dimensions.get('screen'));

  Dimensions.addEventListener('change', () => {
    setDim(Dimensions.get('screen'));
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={background || colors.background}
        animated
      />
      {/* <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled={keyboardAvoidView}
      > */}
       <KeyboardAwareScrollView
      style={{ backgroundColor: 'white' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      // contentContainerStyle={{height: '100%'}}
      scrollEnabled={false}
    >
        <View
          style={[
            { flex: 1, height: Dimensions.get('window').height * 98 /100 },
            { backgroundColor: background || colors.background },
            styleView,
          ]}
        >
          {children}
        </View>
      {/* </KeyboardAvoidingView> */}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

DefaultView.propTypes = {
  background: PropTypes.string,
  barStyle: PropTypes.oneOf(['light-content', 'dark-content']),
  styleView: PropTypes.object,
};

DefaultView.defaultProps = {
  keyboardAvoidView: true,
  barStyle: 'light-content',
};

export default DefaultView;
