import React, { Component } from 'react';
import { Alert, AppRegistry, Button, Platform, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

export default class login extends Component {
    _onPressButton() {
    Alert.alert('You tapped the button!')
  }



render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
       <View style={styles.container}>

            <Text style={styles.logo}>
            Jurvalid
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              // onChangeText={(text) => this.setState({text})}
            />
             <TextInput
              style={styles.input}
              placeholder="Senha"
              // onChangeText={(text) => this.setState({text})}
            />
            <View style={styles.buttonContainer}>

                <Button style={{height: 50, width: 250}}
                    onPress={this._onPressButton}
                    title="Entrar"
                  />
            </View>
        </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center'
  },
  buttonContainer: {
        margin: 30
  },
  input: {
        marginHorizontal:30,
        alignItems: 'center',
        fontSize:20,
        height: 50
  },
  logo: {
        padding: 10,
        fontSize: 42,
        textAlign: 'center',
  },
})
// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => login);
