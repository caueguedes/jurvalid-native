import React, { Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import {
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation';

import {
    ButtonGroup,
    Divider,
    Header,
    ListItem,
    SearchBar
} from 'react-native-elements'

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

class SignInScreen extends Component {
    constructor(props){
        super(props);
        this.obj = {
            user: '',
            pass: '',
        }
    }
  // static navigationOptions = {
  //       // title: 'Please sign in',
  // };
  render() {
    return (
         <View style={styles.container_login}>

            <Text style={styles.logo}>
            Jurvalid
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              onChangeText={(text) => this.obj.user = {text}}
            />
             <TextInput
              style={styles.input}
              placeholder="Senha"
              onChangeText={(text) => this.obj.pass = {text}}
            />
            <View style={styles.buttonContainer}>

                <Button style={{height: 50, width: 250}}
                    onPress={this._signInAsync}
                    title="Entrar"
                  />
            </View>
      </View>
    );
  }

  _signInAsync = async () => {
    // alert(this.obj.user.text + ' ' + this.obj.pass.text)
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends Component {
    constructor(props){
        super(props);
        // this._fetchList();
    }

    static navigationOptions =  {
        headerTitle: 'Consultas',
    };
    render() {
        return (
             <View style={{flex:1}}>
                <SearchBar lightTheme
                        onChangeText={this._onPressButton()}
                        onClear={this._onPressButton()}
                        placeholder='Buscar' />
                {
                    list.map((l, i) => (
                      <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.avatar_url } }}
                        title={l.name}
                        subtitle={l.subtitle}
                        onPress={() => this.props.navigation.navigate('Detail')}

                      />
                    ))
                }

                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => {this._showMoreApp()}}
                    onLongPress={() => {this._signOutAsync()}}
                />
            </View>
          // <View style={styles.container}>
          //   <Button title="Show me more of the app" onPress={this._showMoreApp} />
          //   <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
          // </View>
        );
    }
    _onPressButton = () => {
    }

     _fetchList = () => {
        alert('oi');
        fetch('http://127.0.0.1:8000/api/list', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                // 'Authorization': 'Basic '+  this.props.obj.user + ':' + this.props.obj.pass,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            }),
        });
     }

    _showMoreApp = () => {
        this.props.navigation.navigate('Busca');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}
//Excluir
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

const listPendencias = [
  {
    name: 'TjSP - 11111111111111-1',
    subtitle: 'Ação civil - Prefeitura'
  },
  {
    name: 'TjSP - 22222222222222-2',
    subtitle: 'Testo 2'
  },
  {
      name: 'TjSP - 33333333333333-3',
    subtitle: 'Testo 3'
  },
  {
    name: 'TjSp - 44444444444444-4',
    subtitle: 'Testo 4'
  },
]

class BuscaScreen extends Component {
  static navigationOptions = {
    title: 'Realizar Consultas',
  };
    render(){
        return (
             <View >
                <TextInput
                  style={styles.input}
                  placeholder="Nome para Busca"
                  // onChangeText={(text) => this.setState({text})}
                />
                 <TextInput
                  style={styles.input}
                  placeholder="Cpf para Busca"
                  // onChangeText={(text) => this.setState({text})}
                />
                <View style={styles.buttonContainer}>

                    <Button style={{height: 50, width: 250}}
                        onPress={() => {alert('Consulta Realizada')}}
                        title="Realizar Consulta"
                      />
                </View>
            </View>
        );
    }
}

class DetailsScreen extends Component {
    constructor () {
        super()
        this.state = {
            selectedIndex: 1
        }
    this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    static navigationOptions = {
    title: 'Detalhe da Consulta',
  };
    render(){
        const buttons = ['Liberado', 'Averiguação', 'Pendencias']
        const { selectedIndex } = this.state
        return (
            <View>
                {/*<Header centerComponent={{ text: 'Detalhes', style: { color: '#fff' } }}/>*/}
                <Text h4 style={{textAlign: 'center'}}>Status da Consulta:</Text>


                <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={{height: 40}}
                />



                {
                    listPendencias.map((l, i) => (
                        <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.avatar_url } }}
                        title={l.name}
                        subtitle={l.subtitle}
                        />
                    ))
                }
            </View>
        );
    }
}

// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
//     );
//   }
// }

const AppStack = createStackNavigator({
    Home: HomeScreen,
    Busca: BuscaScreen,
    Detail: DetailsScreen},
    // {
    // headerMode: 'none',
    // navigationOptions: {
    //     headerVisible: false,}
    // }
    );

const AuthStack = createStackNavigator({
    SignIn: SignInScreen},
    );

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_login: {
    flex: 1,
    justifyContent: 'center',
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
});


