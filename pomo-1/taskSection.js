import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, TouchableHighlight, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import {getDarkColor, getLightColor, getDarkerColor} from './colorGenerator';

export default class TaskSection extends React.Component {
  state= {
      tempTask: "",              // Temporary storage for change text
      isAddTask: false,         //  Hidden add task box
      currentTask: "",          //   Focused Task Text
      currentTaskID: 0,         // Focused Task ID
      taskList:[
        {id: 1,title:"Walk the dog", done:true},
        {id: 2,title:"Find the cat", done:false}
      ]
  }

  // Show Hidden Task Box
  addTask = () => {
    this.setState({
      isAddTask: !this.state.isAddTask
    })
  }

  // Hide Hidden Task Box, empty field
  addTaskCancel = () => {
    this.setState({
      isAddTask: false,
      tempTask: ""
    })
  }

  // Save Add Task
  addTaskSave = () =>{
    //console.log('test function: saveTask - ' + this.state.tempTask)
    let newTask = {
      id: Math.random(1000000, 999999), // naive way of generating an unique
      title: this.state.tempTask,
      done: false
    }

    this.setState({
      tempTask: "", // reset temp todo to empty,
      isAddTask: !this.state.isAddTask,
      taskList: [ ...this.state.taskList, newTask]
    })
  }

  // Highlight Focused Task on Click
  focusTask = (item) =>{
    this.setState({
      currentTask: item.title, 
      currentTaskID: item.id,
    })
    //console.log("This Title: " + item.title + " THIS ID: " + item.id)
    //console.log("New Title: " + this.state.tempTask + " ID: " + this.state.currentTaskID);
  }

  togggleTask = (currentItem) => {

    //const tasks = [...this.state.taskList];
    let copy = [...this.state.taskList]
    
    // linear search to find the item to update
    let foundIndex = null;

    for (let i = 0; i < copy.length; i++) {
      if (copy[i].id == currentItem.id) {
        foundIndex = i;
      }
    }         
    // if we found the item
    if (foundIndex != null) {

      // clone the todo
      let clone = {...currentItem};
      // inverse it's done status
      clone.done = !clone.done;
      copy[foundIndex] = clone;
      //console.log(clone.done)
    }


    // merge back into the state
    this.setState({
      taskList: copy
    })
  }

  deleteTask = (item) =>{
    //console.log('Under delete task')
    let index = this.state.taskList.findIndex((each) => {
        return each.id == item.id;  
    });

    // If is current task, remove from state.
    if(this.state.taskList[index]['id'] == this.state.currentTaskID){
      this.setState({
        currentTask: '',
        currentTaskID: 0
      })
    }

    let copy = [...this.state.taskList];
    copy.splice(index, 1);
    this.setState({
      taskList: copy
    });
  }

  saveTasks = async () => {
  console.log("Saving");
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(this.state.taskList));
      console.log('Test', AsyncStorage.getItem('taskList'));
      alert("Save is successful!");
    } catch (error) {
      console.log("Error saving")
    }
  }

  loadTasks = async () =>{
    try {
      const value = await AsyncStorage.getItem('taskList');
      if (value !== null) {
        console.log("Old data loaded")
        this.setState( {taskList: JSON.parse(value)})
      } 
    }catch (error) {
      console.log('b');
    }
  }
  
  componentDidMount = () => {
    // initial load
    this.loadTasks();
  }

  renderListItem = (info) => {
    let currentItem = info.item
    
    // Focus Task Styling
    let focusProps = {
      style: (this.state.currentTaskID == currentItem.id) ? styles.taskFocus : styles.taskUnfocus, 
    };
    
    // Toggle Check Button -> Change Button Colour
    let toggleProps = {
      style: (currentItem.done) ? styles.taskCompleteCheck : styles.taskUncompleteCheck, 
    }

    // Toggle Check Button -> Impact Text Style
    let toggleTextProps = {
      style: (currentItem.done) ? styles.taskListTextComplete: styles.taskListTextUncomplete,
    }

    return (
      <View>
        <TouchableOpacity {...focusProps} onPress = {() => {this.focusTask(currentItem)}}>

          <TouchableOpacity onPress = {() => {this.togggleTask(currentItem)}}>
            <AntDesign {...toggleProps} name="checkcircle" size={22} />
          </TouchableOpacity>

          <Text {...toggleTextProps}>
            {currentItem.title}
          </Text>
          
          <TouchableOpacity onPress = {() => {this.deleteTask(currentItem)}}> 
            <AntDesign name="close" size={18} style={{paddingRight:10}} color="black" />
          </TouchableOpacity>

        </TouchableOpacity>
      </View>
    )
  }



  render(){
    return (
    <View>
      
      <WorkingOn  task= {this.state.currentTask}></WorkingOn>
      
      <View style={styles.taskHeader}>
        <Text style={styles.taskHeaderText}>Tasks</Text>
        <TouchableOpacity 
          style={[styles.saveTaskBtn, {backgroundColor:getLightColor(this.props.mode)}]} 
          onPress={this.saveTasks}>
          <AntDesign name="save" size={20} style={{marginRight:5}} color="white" />
          <Text style={styles.taskHeaderText}>Save</Text>
        </TouchableOpacity>
      </View>

      
      {/* Task Listing*/}
      <FlatList extraData={this.state}
          renderItem={this.renderListItem}
          data={this.state.taskList}
          keyExtractor={(item) => item.id}>
      </FlatList>

      {/* Add Task Button */}
      {!this.state.isAddTask && 
      (<TouchableOpacity 
        style = {[styles.addTask, 
               {backgroundColor:getDarkerColor(this.props.mode),borderColor:getLightColor(this.props.mode)}]}
        onPress={this.addTask}>
        <Text style={styles.addTaskTxt}>Add Task</Text>
      </TouchableOpacity>
      )}

      {/* Hidden Task Section */}
      {this.state.isAddTask && (
        <View style = {styles.addTaskPop}>
            <TextInput style={styles.addTaskInput}
                value={this.state.tempTask} 
                onChangeText={ (text) => {this.setState({tempTask:text})}} 
                placeholder={"What are you working on?"}/>
            
            <View style={styles.addTaskBtmBar}>
              {/* Hidden Task Cancel Button */}
              <TouchableOpacity style={{marginRight:15}} onPress ={this.addTaskCancel} >
              <Text style={{fontWeight:'bold'}}>Cancel</Text>
              </TouchableOpacity>

              {/* Hidden Task Save Button */}
              <TouchableOpacity style={[styles.addTaskSaveBtn]} onPress = {this.addTaskSave}>
              <Text style= {styles.addTaskSaveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
        </View>)
      }
    </View>
    );
  }
}

class WorkingOn extends React.Component{
  render(){
    return(
      <View style={styles.workingOnTaskSection}>
        <Text style={{color:'white'}}>{((this.props.task) != '') ? "WORKING ON" : "TIME TO WORK"}</Text>
        <Text style={styles.workingOnTask}>{this.props.task}</Text>
      </View>
    )
  }
}
