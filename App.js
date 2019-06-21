import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import ToDo from "./ToDo";
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default class App extends Component {
  
  state = {
    newToDo: "",
    loadedToDos: true,
    toDos:""
    
  };
  componentDidMount() {
    this._loadToDos();
  };

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    console.log(toDos + " toDos");
    if (!loadedToDos) {
      return (<AppLoading />);
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />

          <ScrollView contentContainerStyle={styles.toDos}>
            {/* <ToDo text={" Hello To Do wow"} /> */}
            <ToDo>aa</ToDo>
            {/* {Object.values(toDos).map(toDo => <ToDo key={toDo.id} {...toDo}></ToDo>)} */}
          </ScrollView>
        </View>
      </View>
    );
  }
  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      // this.setState({
      //   newToDo: ""
      // });
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };

        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        return { ...newState };
      });
    }
  };

  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };

  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },

  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "500",
    marginBottom: 30
  },

  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {},
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
    alignItems: "center"
  }
});

