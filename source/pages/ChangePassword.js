import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {Actions} from 'react-native-router-flux';

import Logo from '../components/Logo';
import { ScrollView } from 'react-native-gesture-handler';

import API_config from '../config/API_config';
import { bindActionCreators } from 'redux';
import { getProfile, editPassword } from '../action/profile';
import { getAsyncStorage } from '../action/asyncStorage';
import { connect } from 'react-redux';

class ChangePassword extends Component {

    constructor(props) {
      super(props);
      this.state = {
          currentpass: "",
          newpass: "",
          confirmpass: "",
          loading: false,
          disabled: false
      };
     }
     componentDidMount(){
      this.props.getAsyncStorage('user');
     }
     componentDidUpdate(prevProps, prevState){
      if (prevProps.profile !== this.props.profile) {
        if (this.props.profile !== null) {
          if (this.props.profile.status) {
            alert(this.props.profile.message)
          }else{
            alert(this.props.profile.message)
          }
        }
      }
     }

      static navigationOption = {
        title: 'ChangePasswordScreen'
      }

      onChangePassword = () => {
        if (this.state.newpass === this.state.confirmpass) {
          let data = {
            email: this.props.user,
            current_password: this.state.currentpass,
            new_password: this.state.newpass,
            token: API_config.token
          }
          this.props.editPassword(data);
        } else {
          alert(`those passwords didn't match. Try again`);
        }
      }
      render() {
        console.log(this.state)
          return(
            <View style= {styles.container}>
              <View style = {{marginTop: 60}}> 
                <Text style = {styles.labeluser}>Current Password</Text>
                <View style = {styles.boxinput}>
                  <TextInput
                    name="Current Password"
                    //placeholder="Current Password"
                    secureTextEntry={true}
                    component={this.renderTextInput}
                    placeholderTextColor="#ffff"
                    selectionColor="#fff"
                    onChangeText = {(text) => this.setState({currentpass: text})} />
                </View>

                <Text style = {styles.labeluser}>New Password</Text>
                <View style = {styles.boxinput}>
                  <TextInput
                    name="New Password"
                    secureTextEntry={true}
                    //placeholder="New Password"
                    component={this.renderTextInput}
                    placeholderTextColor="#ffff"
                    selectionColor="#fff"
                    onChangeText = {(text) => this.setState({newpass: text})} />
                </View>

                <Text style = {styles.labeluser}>Confirm New Password</Text>
                <View style = {styles.boxinput}>
                  <TextInput
                    name="Confirm New Password"
                    secureTextEntry={true}
                    //placeholder="Password"
                    component={this.renderTextInput} 
                    placeholderTextColor="#ffff"
                    selectionColor="#fff"
                    onChangeText = {(text) => this.setState({confirmpass: text})} />
                </View>   

                <TouchableOpacity disabled = { this.state.disabled } style = {styles.button} onPress={this.onChangePassword}>
                    <Text style = {styles.buttonText}>Change Password</Text>    
                </TouchableOpacity>
              </View> 
            </View>
          )
      }
  }
  
  const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        backgroundColor: '#4e73df',
        
      },
      labeluser: {
        fontSize: 15,
        marginLeft:50,
        fontWeight:"bold",
        color:'#87cefa'
      },
      buttonText: {
        fontSize:16,
        fontWeight:"bold",
        color:'#87cefa'
      },
      button:{
        width:300,
        alignItems: 'center',
        backgroundColor: '#002171',
        fontSize:16,
        fontWeight:"500",
        borderRadius:10,
        paddingVertical:15,
        paddingHorizontal:20,
        marginLeft:50,
        marginTop: 30
      },
      boxinput:{
        width:300,
        backgroundColor:'rgba(255,255,255,0.5)',
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:20,
        fontSize:16,
        marginVertical:8,
        marginLeft:50
      }
  });

  
  function mapStateToProps(state) {
    return {
      profile: state.editPassword.data,
      user: state.getAsyncStorage.data,
      error: state.editPassword.error,
      loading: state.editPassword.loading,
    };
  }
  
  function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getProfile, getAsyncStorage, editPassword }, dispatch)
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(ChangePassword);