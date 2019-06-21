import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
} from "react-native";
import PropTypes from 'prop-types';


const { width, height } = Dimensions.get("window");
// const {text} = this.props;


class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: false,
      toDoValue: props.text
    };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }
  state = {
    isEditing: false,
    toDoValue: ""
    };
  render() {
    const { isCompleted, isEditing } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
        <TouchableOpacity onPress={this._toggleComplete}>
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.uncompletedCircle
            ]}
          />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput 
        style={[
           styles.text,
           styles.input,
           isCompleted ? styles.completedText : styles.uncompletedText]}
        value={toDoValue}
        multiline={true}
        onChangeText={this._controlInput}
        returnKeyType={"done"}
        onBlur={this._finishEditing}>

        </TextInput> ) : (
        <Text
          style={[
            styles.text,
            isCompleted ? styles.completedText : styles.uncompletedText
          ]}>
          {text}
        </Text>
        )}
        </View>
        
          {isEditing ? (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._finishEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✅</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._startEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✏️</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>❌</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
    );
 
  }
  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      }
    });
  };
  _startEditing = () => {
    // const {text} = this.props;
    this.setState({
        isEditing: true,
        toDoValue: text
    });
  };

  _finishEditing = () => {
      this.setState({
          isEditing: false
      });
  };

  _controlInput = text => {
    this.setState({
      toDoValue: text
    });
  }; 
  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id]
    });
  }


}
const styles = StyleSheet.create({
  input: {
    marginVertical: 15,
    width: width / 2,
    marginHorizontal: 15,
    marginBottom: 5
  },

  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  text: {
    fontWeight: "600",
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
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    // borderColor: 'red',
    borderWidth: 3,
    marginRight: 20
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    width: width / 2
  }
});

export default ToDo;