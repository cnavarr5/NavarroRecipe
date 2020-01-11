import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { MonoText } from '../components/StyledText';
import RecipeDB from '../database/RecipeDB';
import IngredientDB from '../database/IngredientDB';

export default function HomeScreen() {
  let recipes;
  const opts = {
    columns: 'id, name'
  }

  RecipeDB.database();
  RecipeDB.createTable()
    .then( bool => {
      if(bool === true){
        recipes = RecipeDB.query(opts)
          .then(res => recipes = JSON.stringify(res))
      } else {
        console.log('Could not Connect to Database');
      }
    })

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Text>Oh Things</Text>
    </KeyboardAvoidingView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2AF29'
  }
});
