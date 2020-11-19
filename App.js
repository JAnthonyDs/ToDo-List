import React, { useState, useEffect } from "react";
import { StatusBar } from 'react-native'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import {
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage
} from "react-native";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";

export default function App() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  async function addTask() {
    const search = task.filter(task => task === newTask);

    if (search.length !== 0) {
      Alert.alert("Atenção", "Nome da tarefa repetido!");
      return;
    }

    setTask([...task, newTask]);
    setNewTask("");

    Keyboard.dismiss();
  }

  async function removeTask(item) {
    Alert.alert(
      "Deletar Task",
      "Tem certeza que deseja remover esta anotação?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => setTask(task.filter(tasks => tasks !== item))
        }
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function carregaDados() {
      const task = await AsyncStorage.getItem("task");

      if (task) {
        setTask(JSON.parse(task));
      }
    }
    carregaDados();
  }, []);

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem("task", JSON.stringify(task));
    }
    salvaDados();
  }, [task]);

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
      >
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fdfdfd" />
          <View style={styles.header}>
            <Text style={styles.primeiroTitle}>ToDo</Text>

            <Text style={styles.segundoTitle}>List</Text>
          </View>

          <View style={styles.containerPriority}>
            <View style={styles.borderButtonPriority}></View>

            <TouchableOpacity style={[styles.buttonPriority, { backgroundColor: "" }]} onPress={() => { }}>
              <Text style={{ color: "#ede615", fontWeight: "bold" }}>Low</Text>
            </TouchableOpacity>

            <View style={styles.borderButtonPriority}></View>

            <TouchableOpacity style={[styles.buttonPriority, { backgroundColor: "" }]} onPress={() => { }}>
              <Text style={{ color: "#fdaf3d", fontWeight: "bold" }}>Medium</Text>
            </TouchableOpacity>

            <View style={styles.borderButtonPriority}></View>
            <TouchableOpacity style={[styles.buttonPriority, { backgroundColor: "" }]} onPress={() => { }}>
              <Text style={{ color: "#e76256", fontWeight: "bold" }}>High</Text>
            </TouchableOpacity>

            <View style={styles.borderButtonPriority}></View>
          </View>
          <View style={styles.Body}>
            <FlatList
              data={task}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.FlatList}
              renderItem={({ item }) => (
                <View style={styles.ContainerView}>
                  <Text style={styles.Texto}>{item}</Text>
                  <TouchableOpacity onPress={() => removeTask(item)}>
                    <MaterialIcons
                      name="delete-forever"
                      size={25}
                      color="#f64c75"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          <View style={styles.Form}>
            <TextInput
              style={styles.Input}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={newTask}
              placeholder="Adicione uma tarefa"
              maxLength={25}
              onChangeText={text => setNewTask(text)}
            />
            <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
              <Ionicons name="ios-add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: "#FFF",

  },
  Body: {
    flex: 1
  },
  Form: {
    padding: 0,
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#eee"
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },
  buttonPriority: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: '30%',
    borderRadius: 5,
  },
  borderButtonPriority: {
    borderWidth: 1,
    height: "70%",
    borderColor: "#c9d7e1",
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 4,
    marginLeft: 10
  },
  FlatList: {
    flex: 1,
    marginTop: 5
  },
  Texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center"
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#eee",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee"
  },
  primeiroTitle: {
    fontFamily: 'sans-serif-light',
    fontSize: 28,
    fontWeight: "bold",
    color: '#5d62fa',
    alignItems: 'center'
  },
  segundoTitle: {
    fontFamily: 'sans-serif-light',
    fontSize: 28,
    color: '#5d62fa',
    marginLeft: 6,
    alignItems: 'center'
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: '100%',
    paddingBottom: 5,
    marginBottom: 2,
    marginTop: 5,
  },
  containerPriority: {
    width: "90%",
    padding: 5,
    borderRadius: 10,
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#c9d7e1",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 15,
    marginLeft:15
  },
});