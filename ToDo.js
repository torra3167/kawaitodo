import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Directions } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
export default class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false
  };
  render() {
    const { isCompleted, isEditing } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._toggleComplete}>
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.uncompletedCircle
            ]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.text,
            isCompleted ? styles.completedText : styles.uncompletedText
          ]}
        >
          Hello To Do wow{" "}
        </Text>
        <View style={styles.column}>
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
      </View>
    );
  }

  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };
  _startEditing = () => {
    this.setState(prevState => {
      return {
        isEditing: !prevState.isEditing

      };
    });
  };

  _finishEditing = () => {
      this.setState({
          isEditing: false
      })
  }
}

const styles = StyleSheet.create({
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
    justifyContent: "space-between",
    width: width / 2
  }
});
