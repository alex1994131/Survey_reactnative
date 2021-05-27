import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from '../screens/auth/LoginScreen';
import BrandingScreen from '../screens/branding/BrandingScreen';
import LanguageScreen from '../screens/branding/LanguageScreen';
import CompanyScreen from '../screens/feedback/CompanyScreen';
// import NameScreen from '../screens/questions/NameScreen';
// import RelationshipScreen from '../screens/questions/RelationshipScreen';
import Questions from '../screens/questions/Questions';

const Stack = createStackNavigator();

/**
 * @returns {*}
 * @constructor
 */
function InitialStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="screen">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Branding"
        component={BrandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Company"
        component={CompanyScreen}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen
        name="Question"
        component={Questions}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default InitialStackNavigation;
