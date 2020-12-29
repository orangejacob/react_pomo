import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, TouchableHighlight, ScrollView } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  navBar:{
    height:40, 
    alignItems:'center', 
    borderBottomColor:'white', 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    paddingTop:25, 
    paddingBottom:25, 
    flexDirection:'row', 
    justifyContent:'space-between'
  },
  navLogo:{
    color:'white', 
    fontWeight:'bold', 
    fontSize:16, 
    marginLeft:10
  },
  navSettings:{
    borderWidth:2, 
    borderRadius:5,
    padding:5,
    backgroundColor:'#e17571', 
    borderColor: '#e17571', 
    marginRight:10
  },
  startBtn:{
    borderBottomWidth:5, 
    borderColor:'#ebebeb', 
    borderRadius:5,
    marginTop:5
  },

  stopBtn:{
    borderBottomWidth:5, 
    borderColor:'white', 
    borderRadius:5,
    marginTop:5
  },
  
  startBtnText:{
    fontWeight:'bold',
    fontSize:20, 
    color: '#de6562', 
    backgroundColor:'white', 
    paddingHorizontal:35, 
    paddingVertical:10, 
    marginTop:15, 
    borderTopLeftRadius:5, 
    borderTopRightRadius:5
  },

  stopBtnText:{
    fontWeight:'bold',
    fontSize:20, 
    color: '#de6562', 
    backgroundColor:'white', 
    paddingHorizontal:40, 
    paddingTop:10,
    paddingBottom:8,
    marginTop:15, 
    borderTopLeftRadius:5, 
    borderTopRightRadius:5
  },
  switchBoxContainer:{ 
    alignItems: 'center', 
    paddingVertical: 24, 
    borderRadius:10,
    transition: "all .7s ease"
  },
  switchBox: {
    flex:1,  
    alignSelf: 'stretch',
    flexDirection:'row', 
    //backgroundColor:'black',
    alignContent:'center',
    marginBottom:10
  },

  switchDefault:{
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    borderRadius:5,
    paddingVertical:5,
    marginHorizontal:7,
    transition: "all .7s ease"
  },

  switchBreak:{
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    borderRadius:5,
    paddingVertical:5,
    marginHorizontal:7,
    transition: "all .7s ease"
  },

  switchLongBreak:{
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    borderRadius:5,
    paddingVertical:5,
    marginHorizontal:7,
    transition: "all .7s ease"
  },

  switchDefaultFocus:{
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    backgroundColor:'#c15755',
    borderRadius:5,
    paddingVertical:5,
    marginHorizontal:7,
    transition: "all .7s ease"
  },

  switchBreakFocus:{
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    backgroundColor:'#c15755',
    borderRadius:5,
    paddingVertical:5,
    marginHorizontal:7,
    transition: "all .7s ease"
  },

  switchLongBreakFocus:{
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    backgroundColor:'#c15755',
    borderRadius:5,
    paddingVertical:5,
    marginHorizontal:7,
    transition: "all .7s ease"
  },

  workingOnTaskSection:{
     alignItems: 'center', 
     justifyContent: 'center',
     marginTop:10
  },
  workingOnTask:{
    marginTop:10, fontWeight:'bold', color:'white'
  },
  taskHeader:{
    flex:1, 
    justifyContent:'space-between', 
    flexDirection:'row', 
    alignItems:'center',
    paddingHorizontal:10, 
    borderBottomWidth:2, 
    paddingVertical:10, 
    marginVertical:10, 
    borderColor:'white'
  },

  displayTime:{
    fontWeight:'bold',fontSize:74, color: 'white', letterSpacing:4
  },
  
  taskHeaderText:{
    color:'white',
    fontWeight:'bold', 
    fontSize:18
  },
  saveTaskBtn:{
    flexDirection:'row', backgroundColor:'#de6562', borderRadius:5, paddingHorizontal:5, paddingVertical:5
  },
  addTask:{
    alignItems:'center', 
    marginTop:15, 
    marginBottom:15, 
    backgroundColor:'#cb4b47',
    paddingVertical:15, 
    borderStyle: 'dashed', 
    borderWidth:1, 
    borderRadius:5, 

  },
  addTaskTxt:{
    fontWeight:'bold', color:'white', fontSize:16
  },
  taskUnfocus : {
    borderLeftColor:'white', 
    borderLeftWidth:5, 
    marginVertical:5, 
    borderRadius:5,
    backgroundColor:'white',
    alignItems:'center',
    flexDirection:'row',
    paddingVertical:15
  },

  taskFocus:{
    borderLeftColor:'black', 
    borderLeftWidth:5, 
    marginVertical:5, 
    backgroundColor:'white',
    borderRadius:5,
    alignItems:'center',
    flexDirection:'row',
    paddingVertical:15
  },
  taskCompleteCheck:{
    color:'green',
    paddingLeft:10
  },
  taskUncompleteCheck:{
    color:'grey',
    paddingLeft:10
  },
  taskListTextComplete:{
    paddingLeft:10, 
    flex:1, 
    fontWeight:'bold', 
    fontSize:14,
    textDecorationLine:'line-through',
    color:'grey'
  },
  taskListTextUncomplete:{
    paddingLeft:10, 
    flex:1, 
    fontWeight:'bold', 
    fontSize:14,
  },
  addTaskBtmBar:{
    flexDirection:'row', 
    justifyContent:'flex-end',
    backgroundColor:'#efefef', 
    padding:10,   
    borderBottomLeftRadius:10, 
    borderBottomRightRadius:10, 
    alignItems:'center'
  },
  addTaskPop: {
    backgroundColor:'white',
    height:150, 
    borderRadius:10, 
    justifyContent:'space-between', 
    flexDirection:'column',
    marginTop:15, 
    marginBottom:15, 
  },
  addTaskInput:{
    color:'grey', 
    fontWeight:'bold', 
    fontSize:16, 
    outline: 'none', 
    paddingHorizontal:10, 
    paddingTop:15
  },
  addTaskSaveBtn:{
    backgroundColor:'#b2b2b2', 
    paddingVertical:5, 
    paddingHorizontal:10, 
    borderRadius:5
  },
  addTaskSaveBtnText:{
    fontWeight:'bold', 
    color:'white'
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#db524d',
  },
  settingsNavbar:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    borderBottomWidth: 1, 
    borderColor:'#efefef', 
    paddingTop:20, 
    paddingBottom:10, 
    paddingHorizontal:15
  },
  settingsHeader:{
    paddingHorizontal:15,
    fontWeight:'bold', 
    paddingTop:15, 
    paddingBottom:5, 
    fontSize:15
  },
  settingsCategories:{
    flexDirection:'row', 
    paddingHorizontal:15, 
    paddingVertical:15,
    borderBottomWidth: 1,
    borderColor:'#efefef',
    
  },

  settingsCategoryText:{
    fontWeight:'bold', 
    color:'grey', 
    fontSize:14
  },
  settingsInputText:{
    backgroundColor:'#ebebeb', 
    borderRadius:3, 
    marginTop:5,
    padding:10, 
    fontSize:14, 
    fontWeight:'bold', 
    marginRight:15
  },
  settingsLongIntervalSection:{
    paddingVertical:15, 
    paddingHorizontal:15, 
    justifyContent:'space-between', 
    flexDirection:'row',
    alignItems:'center', 
    borderBottomWidth:1, 
    borderBottomColor:'#ebebeb'
  },
  settingsLongIntervalTextInput:{
    backgroundColor:'#ebebeb', 
    borderRadius:3, 
    marginTop:5,
    padding:10, 
    fontSize:14, 
    fontWeight:'bold', 
    marginRight:15,
    width: 60
  },
  settingsSaveSection:{
    height:60, 
    backgroundColor:'#efefef', 
    flexDirection:'row', 
    paddingHorizontal:25, 
    paddingVertical:12, 
    justifyContent:'flex-end'
  },
  settingsSaveBtn:{
    backgroundColor:'black', borderRadius:5, justifyContent:'center'
  },
  settingsSaveBtnText:{
    paddingHorizontal:25, paddingBottom:3,color:'white', fontWeight:'bold'
  }

});

export default styles
