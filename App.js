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
  ScrollView,
  AsyncStorage
} from "react-native";

import ToDo from "./ToDo";
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  }
  componentDidMount() {
    this._loadToDos();
  }

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    console.log(toDos);

    if (!loadedToDos) {
      return <AppLoading></AppLoading>
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <Text style={styles.title}>
          KAWAI TO DO
        </Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={'#999'}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}></TextInput>

          <ScrollView contentContainerStyle={styles.toDos}>
            {/* <ToDo text={"Hello I am from App.js"}></ToDo> */}
            {Object.values(toDos).reverse().map((toDo) => <ToDo 
            key={toDo.id} 
            deleteToDo={this._deleteToDo}
            uncompleteToDo={this._uncompleteToDo}
            completeToDo={this._completeToDo}
            updateToDo={this._updateToDo}
            {...toDo} 
            >

            </ToDo>)}
          </ScrollView>

        </View>
      </View>
    );
  }
  _uncompleteToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      }
      this._saveToDos(newState.toDos);
      return {...newState};
    })
  }
  _saveToDos = (newToDos) => {
    // console.log("JSON " + JSON.stringify(newToDos));
    const saveToDos = AsyncStorage.setItem('toDos', JSON.stringify(newToDos));

  }
  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            text: text
          }
        }
      }
      this._saveToDos(newState.toDos);
      return {...newState};
    })
  }
  _completeToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      }
      this._saveToDos(newState.toDos);
      return {...newState};
    })
  }
  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      }
      this._saveToDos(newState.toDos);
      return { ...newState };
    })
  }

  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    })
  };

  _loadToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem('toDos');
      const parsedToDos = JSON.parse(toDos);
      console.log(toDos);
    this.setState({
      loadedToDos: true,
      toDos: parsedToDos
    })
    } catch(error) {
      console.log(error);
    }
  }
  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {

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
        }
        this._saveToDos(newState.toDos);
        return { ...newState };
      });
    }
  };


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25,
    marginBottom: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {

      },
      android: {
        elevation: 3

      }
    })
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: "600"
  },
  toDos: {
    alignItems: 'center'
  }
})
