import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import storage from './storage';

export default function App() {
  const [value, onChangeText] = React.useState('Text Value of Input');

  return (
    <View style={styles.container}>
      <Text>Enter Text</Text>
      <TextInput 
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <Button 
      title="Save Input"
      onPress={() => {
        console.log('Storing value');
        storage.set("user", value)
      } }
      />

    <Button 
      title="Retreive Value"
      onPress={() => {
        const storedVal = storage.get('user')
          .then((res) => Alert.alert(JSON.stringify(res)))
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
