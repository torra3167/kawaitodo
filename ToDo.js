import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
}

  from 'react-native';

import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');


export default class ToDo extends Component {
constructor(props) {
  super(props);
  this.state = {
    toDoValue: props.text,
    isEditing: false
  }
}

  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    uncompleteToDo: PropTypes.func.isRequired,
    completeToDo: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
  }

  render() {
    const {text, id, deleteToDo, isCompleted} = this.props;
    const { isEditing, toDoValue } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View style={[styles.circle,
            isCompleted ? styles.completedCircle : styles.uncompletedCircle]}>
            </View>
          </TouchableOpacity>
          {isEditing ? (<TextInput 
          value={toDoValue}
          style={[styles.input, styles.text, 
            isCompleted ? styles.completedCircle : styles.uncompletedCircle]}
          multiline={true}
          onChangeText={this._controlInput}
          returnKeyType={"done"}
          onBlur={this._finishEditing}
          ></TextInput>) : (
          <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
            {text}
        </Text>
        )}
        </View>

          {isEditing ? (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._finishEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}> W </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : ( 
              <View style={styles.actions}>
                <TouchableOpacity onPressOut={this._startEditing}>
                  <View style={styles.actionContainer}>
                    <Text style={styles.actionText}> F </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={(event) => {event.stopPropagation; deleteToDo(id)}}>

                  <View style={styles.actionContainer}>
                    <Text style={styles.actionText}> X </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
        </View>
    );
  }

  _toggleComplete = (event) => {
    const {isCompleted, uncompleteToDo, completeToDo, id} = this.props;
    if(isCompleted) {
      uncompleteToDo(id);
    } else {
      completeToDo(id);
    }
    // this.setState(prevState => {
    //   return {
    //     // true
    //     isCompleted: !prevState.isCompleted
    //   };
    // });
  };
  _startEditing = (event) => {
    event.stopPropagation();
    this.setState({
      isEditing: true
      
    });
  };
  _finishEditing = (event) => {
    event.stopPropagation();

    const {toDoValue} = this.state;
    const {id, updateToDo} = this.props;
    updateToDo(id, toDoValue);
    this.setState({
      isEditing: false
    })
  }

  _controlInput = (text) => {
    event.stopPropagation();
    this.setState({
      toDoValue : text
    })
  };

}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  circle: {

    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'red',
    borderWidth: 3,
    marginRight: 20
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: 'line-through'

  },
  uncompletedText: {
    color: "#353839"
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2
  },
  actions: {
    flexDirection: 'row'
  }
  ,
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    marginVertical: 15,
    width: width / 2,
    paddingBottom: 5
  }





});