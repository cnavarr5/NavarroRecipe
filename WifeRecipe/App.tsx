import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView } from 'react-native';
import storage from './storage';
import 'react-native-gesture-handler';

export default function App() {
  const [value, onChangeText] = React.useState('Text Value of Input');

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Natalies's Book</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3C567',
  },
  header: {
    backgroundColor: '#C8963E',
    padding: 10,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
  }
});
