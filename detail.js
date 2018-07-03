import React, { Component} from 'react';
import { Alert, AppRegistry, Button, Platform, StyleSheet,  TextInput, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import { ButtonGroup, Divider, Header, ListItem, SearchBar, Text} from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HelloWorldApp extends Component {
constructor () {
  super()
  this.state = {
        selectedIndex: 2
  }
  this.updateIndex = this.updateIndex.bind(this)
}

updateIndex (selectedIndex) {
  this.setState({selectedIndex})
}

_onPressButton(){

  }
render () {
  const buttons = ['Hello', 'World', 'Buttons']
  const { selectedIndex } = this.state

  return (
    <View>
        <Header centerComponent={{ text: 'Detalhes', style: { color: '#fff' } }}/>
        <Text h4 style={{textAlign: 'center'}}>Status da Consulta:</Text>


        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 40}}
        />
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
  },
  buttonContainer: {
        margin: 30
  },
  input: {
        marginHorizontal:30,
        alignItems: 'center',
        fontSize:16,
        height: 50
  },
});