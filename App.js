import React, {Component} from 'react';
import { 
  StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform
 } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ToDo from "./ToDo";
const { height, width } = Dimensions.get('window');

export default function App() {
  state = {
    newToDo: ""
  }
  const {newToDo} = this.state;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <Text style={styles.title}>Kawai To Do</Text>
      <View style={styles.card}>
        <TextInput 
        style={styles.input} 
        placeholder={"New To Do"} 
        value={newToDo} 
        onChangeText={this._controlNewToDo} 
        placeholderTextColor={"#999"}
        returnKeyType={"done"}
        autoCorrect={false}></TextInput>

      <ScrollView contentContainerStyle={styles.toDos}>
        <ToDo></ToDo>
      </ScrollView>

      </View>
    </View>
  );
  
}
_controlNewToDo = text => {
  this.setState ({
    newToDo: text
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
  },
  
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: '500',
    marginBottom: 30
  },

  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {

      },
      android: {
        elevation: 5
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  
  toDos: {
    alignItems: 'center'
  }
});
