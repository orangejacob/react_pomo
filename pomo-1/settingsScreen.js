import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

export default class SettingsScreen extends React.Component{

  // set state as Home screen inital state
  state= {...this.props.route.params.stash}

  // Pass back params of state to Home Screen
  goBack = () => {
    console.log('In Setting -> Home screen ' + this.state.modes.default )
    console.log("This : ", this.state)
    const { navigation, route } = this.props;
    navigation.goBack();
    route.params.onUpdateSettings({...this.state}); 
  }

  verifyData = () =>{
    
    let clone = {...this.state.modes};
    let cloneKeys = Object.keys(clone)
    for(let i = 0; i < cloneKeys.length; i++){
      if (clone[cloneKeys[i]] == 0){
          clone[cloneKeys[i]] = 60
      }
    }
    
    this.setState({
      modes: clone,
      currentTimer: clone['default']
    }, this.goBack)
      
    
  }
  

  // On Change Text, remove alphabet
  changeText = (text, mode) =>{
    let temp = text.replace(/[^0-9]/g, '')
    if(temp == ''){
      temp = 0
    }
    let toSecond = parseInt(temp) * 60
    let copy = {...this.state.modes}
    copy[mode] = toSecond
    this.setState({modes:copy})
    console.log(toSecond)
  }

  changeInterval = (text) =>{
    let temp = text.replace(/[^0-9]/g, '')
    if(temp == ''){
      temp = 0
    }
    this.setState({longInterval: parseInt(temp)})
  }

  render(){
    return (
      <View style={{backgroundColor:'white', flex:1}}>
        <View style={styles.settingsNavbar}>
          <Text style={{fontWeight:'bold', color:'grey', fontSize:16}}>TIMER SETTINGS</Text>
          <TouchableOpacity 
            onPress={this.verifyData}>
            <AntDesign name="close" size={24} color="grey" />
          </TouchableOpacity>
          
        </View>
        
        <View>
          <Text style={styles.settingsHeader}>
            Time (minutes)
          </Text>
        </View>

        <View style={styles.settingsCategories}>
          {/* Pomodoro */}
          <View style={{flex:1}}>
            <Text style={styles.settingsCategoryText}>Pomodoro</Text>
            <TextInput style={styles.settingsInputText}
                  value={Math.floor(this.state.modes['default']/60)} 
                  keyboardType='numeric'
                  maxLength={2}
                  onChangeText={ (text) => {this.changeText(text,'default')}} 
                  placeholder={Math.floor(this.state.modes['default']/60)}/>
          </View>

          {/* Short Break */}
          <View style={{flex:1}}>
            <Text style={styles.settingsCategoryText}>Short Break</Text>
            <TextInput style={styles.settingsInputText}
                  value={Math.floor(this.state.modes['break']/60)} 
                  keyboardType='numeric'
                  maxLength={2}
                  onChangeText={ (text) => {this.changeText(text,'break')}} 
                  placeholder={Math.floor(this.state.modes['break']/60)}/>
          </View>

          <View style={{flex:1}}>
            <Text style={styles.settingsCategoryText}>Long Break</Text>
            <TextInput style={styles.settingsInputText}
                  value={Math.floor(this.state.modes['longbreak']/60)} 
                  keyboardType='numeric'
                  maxLength={2}
                  onChangeText={ (text) => {this.changeText(text,'longbreak')}} 
                  placeholder={Math.floor(this.state.modes['longbreak']/60)}/>
          </View>

        </View>

        {/* Long Interval Section */}
        <View style={styles.settingsLongIntervalSection}>
          <Text style={{fontWeight:'bold', color:'grey', fontSize:15}}>Long Break interval</Text>
          <TextInput style={styles.settingsLongIntervalTextInput}
                  value={this.state.longInterval} 
                  keyboardType='numeric'
                  maxLength={2}
                  onChangeText={ (text) => {this.changeInterval(text)}} 
                  placeholder={this.state.longInterval}/>
        </View>

        <View style={styles.settingsSaveSection}>
          <TouchableOpacity style={styles.settingsSaveBtn} onPress={this.verifyData}>  
            <Text style={styles.settingsSaveBtnText}>
              OK
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
  
}