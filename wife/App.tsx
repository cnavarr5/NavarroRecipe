import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import storage from './storage';
import sqlite from './sqlite';
import Database from './Database';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headaerTitle: () => 'This should work',
      headerLeft: () => (
        <Button
        title="Add to Database"
        onPress={() => { 
          navigation.navigate('AddRecipe'); 
        }}
      />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0
  }

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1});
  };

    render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Main Screen</Text>
        <Button
            title="Go to Details"
            onPress={() => {
              this.props.navigation.navigate('Details', {
                itemId: 100,
                otherParam: 'Whatever you like'
              });
            }}
          />
        <Text>{ this.state.count }</Text>
      </View>
    );
  }
}

const db = new Database();

class RecipeScreen extends React.Component {
  constructor() {
    super({});
    this.state = {
      isLoading: true,
      products: [],
      notFound: 'Recipes not found.\nPlease click (+) button to add it.'
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.getRecipe();
    });
  }
}

class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
          <Text>Details Screen</Text>
          <Text>
            itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
          </Text>
          <Text>
            itemId: {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
          </Text>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    AddRecipe: RecipeScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}