import React, { Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Keyboard,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import {
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation';

import {
    Button ,
    ButtonGroup,
    Card,
    Divider,
    FormInput,
    FormLabel,
    FormValidationMessage,
    Header,
    Icon,
    List,
    ListItem,
    SearchBar,
    Text,
} from 'react-native-elements'

import ActionButton from 'react-native-action-button';
// import Icon from 'react-native-vector-icons/Ionicons';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

var base64 = require('base-64');

// ---------------- AuthLoadingScreen --------------------------------------
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

// ---------------- SignInScreen --------------------------------------
class SignInScreen extends Component {
    constructor(props){
        super(props);
        this.obj = {
            user: '',
            pass: '',
        }
    }

    _signInAsync = async () => {
    // alert(this.obj.user.text + ' ' + this.obj.pass.text)
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
  render() {
    return (
        <DismissKeyboard>
         <View style={styles.container_login}>
            <Text h1 style={styles.logo}>Jurvalid</Text>
            <FormLabel>Usuario</FormLabel>
            <FormInput
                placeholder="Digite seu Usuario"
                onChangeText={(text) => this.obj.user = {text}}/>

            <FormLabel>Senha</FormLabel>
            <FormInput
                password={true}
                secureTextEntry={true}
                placeholder="Senha"
                onChangeText={(text) => this.obj.pass = {text}}/>

            <Button
                title='Entrar'
                rounded={true}
                    onPress={() => {this._signInAsync()}}
            />
            {/*<FormValidationMessage>Usuario ou senha com erro.</FormValidationMessage>*/}
         </View>
        </DismissKeyboard>
    );
  }

  _signInAsync = async () => {
    // alert(this.obj.user.text + ' ' + this.obj.pass.text)
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

// ---------------- HomeScreen --------------------------------------
class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
        // this._fetchList();
    }

  componentDidMount(){
    return fetch('https://jurvalidation.herokuapp.com/api/consultas.json', {
       method: 'GET',
        headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
           Authorization : 'Basic ' +  base64.encode('staff' + ':' + 'staff123')
        },
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            isLoading: false,
            dataSource: responseJson,
        }, function(){
            console.log(responseJson)
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  keyExtractor = (item, index) => index

    renderItem = ({ item }) => (
      <ListItem
        title={item.name}
        subtitle={item.subtitle}
        leftAvatar={{
          source: item.avatar_url && { uri: item.avatar_url },
          title: item.name[0]
        }}
      />
    )

    static navigationOptions =  {
        headerTitle: 'Consultas',
    };
    render() {
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }



        return (
            <DismissKeyboard>
                 <View style={{flex:1}}>
                    <SearchBar lightTheme
                            onChangeText={this._onPressButton()}
                            onClear={this._onPressButton()}
                            placeholder='Buscar' />

                    {
                        this.state.dataSource.map((l, i) => (
                            <ListItem
                            key={i}
                            // leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={l.nomeParte}
                            subtitle={l.docParte}
                            onPress={() => this._redirectOpt(l.tj_status, l.trf_status, l.trt_status, l.id)}
                            rightIcon={{ uri: 'app/images/green.png'}}
                            hideChevron

                          />
                        ))
                    }
                    <ActionButton
                        buttonColor="rgba(231,76,60,1)"
                        onPress={() => {this._showMoreApp()}}
                        onLongPress={() => {this._signOutAsync()}}
                    />
                </View>
            </DismissKeyboard>
        );
    }
    _redirectOpt = (var1, var2, var3, id) => {
        if(var1 !== 1 | var2 !== 0 | var3 !== 1){
            this.props.navigation.navigate('Detail',{
                consultaId: id
            });
        }
    }

    _onPressButton = () => {
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Busca');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

// ---------------- BuscaScreen --------------------------------------
class BuscaScreen extends Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading: false,
            name: '',
            doc: '',
        }
    }

    consulta(){

    this.setState({isLoading: true});
    return fetch('https://jurvalidation.herokuapp.com/api/consultas.json', {
       method: 'POST',
        headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
           Authorization : 'Basic ' +  base64.encode('staff' + ':' + 'staff123')
        },
        body: JSON.stringify({
            name: "Caue Vieira Guedes",
            doc: 40423362801,
            // name: this.state.name,
            // doc: this.state.doc,
        }),
    })
    .then((response) => response.status)
    .then((responseJson) => {
        this.setState({
            isLoading: false,
            dataSource: responseJson,
        }, function(){
            console.log(responseJson);
            // alert('Consulta Realizada');
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


    static navigationOptions = {
    title: 'Realizar Consultas',
  };
    render(){
         if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }

        return (

             <DismissKeyboard>

                 <View >

                    <FormLabel>Nome:</FormLabel>

                     <FormInput style={{paddingHorizontal:10}}
                                onChangeText={(text) => this.setState({ doc: text}) }
                                placeholder="Digite nome para Busca"/>
                     <Divider style={{backgroundColor: '#d3d3d3', marginHorizontal:12, paddingTop:-10}}/>

                    <FormLabel>CPF/CNPJ:</FormLabel>
                    <FormInput style={{marginLeft:14, marginBottom:1}}
                               onChangeText={(text) => this.setState({ doc: text}) }
                               placeholder="Digite nome para Busca"/>
                     <Divider style={{backgroundColor: '#d3d3d3', marginHorizontal:12, paddingTop:-10}}/>

                     <Button style={{marginTop:40}}
                             title='Realizar Consulta'
                             onPress={()=> {this.consulta().then(() => this.props.navigation.navigate('Home'))}}/>
                             {/*onPress={()=> {this.consulta(this.state.name, this.state.doc)}}/>*/}

                {/*<FormValidationMessage>Error message</FormValidationMessage>*/}

                {/*<TextInput*/}
                  {/*style={styles.input}*/}
                  {/*placeholder="Nome para Busca"*/}
                  {/*// onChangeText={(text) => this.setState({text})}*/}
                {/*/>*/}
                 {/*<TextInput*/}
                  {/*style={styles.input}*/}
                  {/*placeholder="Cpf para Busca"*/}
                  {/*// onChangeText={(text) => this.setState({text})}*/}
                {/*/>*/}
                {/*<View style={styles.buttonContainer}>*/}

                    {/*<Button style={{height: 50, width: 250}}*/}
                        {/*onPress={() => {alert('Consulta Realizada')}}*/}
                        {/*title="Realizar Consulta"*/}
                      {/*/>*/}
                {/*</View>*/}
                </View>
             </DismissKeyboard>
        );
    }
}

// ---------------- DetailsScreen --------------------------------------
class DetailsScreen extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isLoading: true,
        }
        this.componentDidMountDetail()

    }

  componentDidMountDetail(){
        const { navigation } = this.props;
        return fetch('https://jurvalidation.herokuapp.com/api/detalhes.json', {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization : 'Basic ' +  base64.encode('staff' + ':' + 'staff123')
            },
            body: JSON.stringify({
                id_consulta: navigation.getParam('consultaId', 'NO-ID'),
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                dataSourceDetail: responseJson,
            }, function(){
                console.log(responseJson)
            });
          })
          .catch((error) =>{
            console.error(error);
          });
    }

    _status(){
      if(this.state.dataSourceDetail.tj_status === 1 &&
          this.state.dataSourceDetail.trt_status === 1 &&
              this.state.dataSourceDetail.trf_status === 1){

          return 'Liberado';

      }else if(this.state.dataSourceDetail.tj_status === 3 |
          this.state.dataSourceDetail.trt_status === 3 |
              this.state.dataSourceDetail.trf_status === 3){

            return 'Proibido';

      // }else if(this.state.dataSourceDetail.tj_status === 0 |
      //     this.state.dataSourceDetail.trt_status === 0 |
      //         this.state.dataSourceDetail.trf_status === 0){
      //
      //       return 'Forçar Atualização';
      }else if(this.state.dataSourceDetail.tj_status === 2 |
          this.state.dataSourceDetail.trt_status === 2 |
              this.state.dataSourceDetail.trf_status === 2){

            return 'Averiguação Pendências';}
        }


    _comentario(){
        if(this.state.dataSourceDetail.comentario.length === 0 ){
            return 'Nenhum comentario até o momento'
        }else{
            return this.state.dataSourceDetail.comentario.text
        }
    }

    static navigationOptions = {
      title: 'Detalhe da Consulta',
    };

  render(){
         if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View>
                {/*<Header centerComponent={{ text: 'Detalhes', style: { color: '#fff' } }}/>*/}
                <Text style={{paddingTop:20, paddingHorizontal: 18}}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold',}} >Status da Consulta:</Text>
                    <Text style={{fontSize: 16}}> {this._status()}</Text>
                </Text>

                <Text style={styles.textDetail}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold',}} >Nome:</Text>
                    <Text style={{fontSize: 16}}> {String(this.state.dataSourceDetail.nomeParte).substring(0,40)}</Text>
                </Text>

                <Text style={styles.textDetail}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold',}} >Cpf/Cnpj:</Text>
                    <Text style={{fontSize: 16}}> {this.state.dataSourceDetail.docParte}</Text>
                </Text>

                <Card>
                    <Text style={{textAlign:'left', fontWeight: 'bold', }}>
                        Comentarios:
                    </Text>
                    <Divider style={{backgroundColor: '#d3d3d3', marginVertical: 6 }}/>
                    <Text style={{color:'#d3d3d3'}}>
                        {this._comentario()}
                    </Text>

                </Card>
                </View>
        );
    }
}

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
    {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,}
    }
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
  textDetail: {
    paddingHorizontal: 18,
    paddingVertical:2
  }
});