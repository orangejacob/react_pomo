
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TaskSection from './taskSection';
import styles from './styles';
import {getDarkColor, getLightColor, getDarkerColor} from './colorGenerator';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.startCountDown = this.startCountDown.bind(this)
    this.stopCountDown = this.stopCountDown.bind(this)
    this.onDefaultScreen = this.onDefaultScreen.bind(this)
    this.onBreakScreen = this.onBreakScreen.bind(this)
    this.onLongBreakScreen = this.onLongBreakScreen.bind(this)
  }

  // Function trigger inside Settings Screen
  onUpdateSettings = data => {
    
    this.setState(data);
  };

  state = {
    toggleSwitch: true,             // Start/Stop Button
    intervalID: null,              // Timer Countdown Interval IDs
    currentMode: "default",       // Current Mode
    currentTimer: 1500,           // Current Mode - Seconds
    currentInterval:0,           // Current Interval  Cycle -> Pomodoro Technique
    longInterval: 4,             // Interval Cycle
    modes: {"default": 1500, "break": 300, "longbreak": 1800}
  }

  startCountDown = () => {
    let newTime
    let myInterval = setInterval(() => {
      newTime = this.state.currentTimer - 1;

      // Set new total seconds
      this.setState({
        currentTimer: newTime
      });

      // Update interval cycle when clock reach zero
      if (this.state.currentTimer <= 0) {

        let currentInterval = this.state.currentInterval + 1;
        this.stopCountDown()  
        this.setState({
          currentInterval: currentInterval
        })
        // Swap to Long Break Screen when interval hit max
      
        if (currentInterval >= this.state.longInterval){
          this.onLongBreakScreen()
        }
        // Else Swipe inbetween Pomodoro Screen and Short Break screen
        else{
          
          if(this.state.currentMode === 'default'){
            this.onBreakScreen()
          }
          else{
            this.onDefaultScreen()
          }
        }
        
      }

    }, 1000)
    
    // Toggle Start/ Stop Button and set the timer ID
    this.setState({
      intervalID: myInterval,
      toggleSwitch: !this.state.toggleSwitch
    })
  }

  // Stop Countdown
  stopCountDown = () =>{
    console.log('stop countdown')
    clearInterval(this.state.intervalID)
    this.setState({
      toggleSwitch: !this.state.toggleSwitch
    });
  }

  // Default Screen Settings
  onDefaultScreen = () =>{
    clearInterval(this.state.intervalID)
    this.setState({
      currentMode: "default",
      currentTimer: this.state.modes['default'],
      //displayTime: this.displayTimeText(this.state.modes['default'])
    })
  }

// Short Break Screen Settings
  onBreakScreen = () =>{
    clearInterval(this.state.intervalID)
    this.setState({
      currentMode: "break",
      currentTimer: this.state.modes['break'],
      //displayTime: this.displayTimeText(this.state.modes['break'])
    })
  }

  // Long Break Screen Settings
  onLongBreakScreen = () =>{
    clearInterval(this.state.intervalID)
    this.setState({
      currentInterval: 0,
      currentMode: "longbreak",
      currentTimer: this.state.modes['longbreak'],
      //displayTime: this.displayTimeText(this.state.modes['longbreak'])
    })
  }

  render(){
    
    // Current Mode -> Use to change BG Colors
    let mode = this.state.currentMode
    
    return (
        <ScrollView style={[styles.container, {backgroundColor:getDarkColor(mode)}]}>

          {/*Nav Bar*/}
          <View style = {styles.navBar}>
            <TouchableOpacity>
              <Text style={styles.navLogo}>Pomofocus</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={[
                styles.navSettings, {backgroundColor:getLightColor(mode), borderColor:getDarkColor(mode)}]} 
            onPress={() => {
              this.props.navigation.navigate('Settings', {
                'stash': this.state, 
                'onUpdateSettings': this.onUpdateSettings
              })}}>
              <Text style={{color:'white', fontWeight:'bold'}}>Settings</Text>
            </TouchableOpacity>
          </View>
          
          {/*Switches*/}
          <View style = {{padding: 10, marginTop:20}}>
              <SwitchBox  
                startCountDown = {this.startCountDown}
                stopCountDown = {this.stopCountDown}
                onDefaultScreen = {this.onDefaultScreen}
                onBreakScreen = {this.onBreakScreen}
                onLongBreakScreen = {this.onLongBreakScreen}
                stash = {this.state}
              />
          </View>

          {/* Task List*/}
          <View style = {{padding: 10}}>
              <TaskSection mode = {mode} />
          </View>

        </ScrollView>
      );
    }
  }

// The box that display time + switch between modes
class SwitchBox extends React.Component {

  displayTimeText = (timeLeft) =>{
    
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    if(minutes < 10){
      minutes = "0" + minutes.toString();
    }
    else{
      minutes = minutes.toString();
    }

    if(seconds < 10){
      seconds = "0" + seconds.toString();
    }
    else{
      seconds = seconds.toString();
    }

    return (minutes + ':' +seconds);
  }


  render(){

    let mode = this.props.stash.currentMode

    // Default Style
    let switchDefaultStyle = {
      style: ((this.props.stash.currentMode === 'default') ?
              [styles.switchDefaultFocus, { backgroundColor: getDarkerColor(mode)}] : styles.switchDefault)
    };
    
    // Short Break Style
    let switchBreakStyle = {
      style: ((this.props.stash.currentMode === 'break') ? 
              [styles.switchBreakFocus, { backgroundColor: getDarkerColor(mode)}] : styles.switchBreak), 
    };

    // Long Break Style
    let switchLongBreakStyle = {
      style: ((this.props.stash.currentMode === 'longbreak') ? 
              [styles.switchLongBreakFocus, { backgroundColor: getDarkerColor(mode)}]:styles.switchLongBreak)
    };


    return (
    
      <View style={[styles.switchBoxContainer, { backgroundColor: getLightColor(mode)}]}>
        
        {/* Switch between modes */}
        
        <View style={styles.switchBox}>
        <TouchableOpacity style={{flex:1}} onPress = {this.props.onDefaultScreen}>
          <Text {...switchDefaultStyle}>Pomodoro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flex:1}} onPress = {this.props.onBreakScreen}>
          <Text {...switchBreakStyle}>Short Break</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flex:1}} onPress = {this.props.onLongBreakScreen}>
          <Text {...switchLongBreakStyle}>Long Break</Text>
        </TouchableOpacity>
        </View>

        {/* Timer Display */}
        <Text style={styles.displayTime}>
          {this.displayTimeText(this.props.stash.currentTimer)}
        </Text>

        {/* Start / Stop Button */}
        {this.props.stash.toggleSwitch && 
          <TouchableOpacity style={styles.startBtn} onPress = {this.props.startCountDown}>
            <Text style={[styles.startBtnText, {color: getDarkColor(mode)}]}>START</Text>
          </TouchableOpacity>
        }
        
        {!this.props.stash.toggleSwitch &&  
          <TouchableOpacity style={styles.stopBtn} onPress = {this.props.stopCountDown}>
            <Text style={[styles.stopBtnText, {color: getDarkColor(mode)}]}>STOP</Text>
          </TouchableOpacity>
        }

      </View>
    );
    }
}