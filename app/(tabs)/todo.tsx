import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { db } from './firebaseConfig';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function TodoScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const tasksData = [];
      snapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksData);
      setLoading(false); // Set loading to false after data is fetched
    });

    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    if (task.trim().length > 0) {
      try {
        await addDoc(collection(db, 'todos'), { value: task, completed: false });
        setTask(''); // Clear input after adding
      } catch (error) {
        Alert.alert('Error', 'Error adding task: ' + error.message);
      }
    } else {
      Alert.alert('Warning', 'Task cannot be empty!');
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      Alert.alert('Error', 'Error deleting task: ' + error.message);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const taskDoc = doc(db, 'todos', id);
      await updateDoc(taskDoc, { completed: !completed });
    } catch (error) {
      Alert.alert('Error', 'Error updating task: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What do you need to do?"
          placeholderTextColor="#aaa"
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask} // Dismiss keyboard on submit
          returnKeyType="done" // Show "done" on keyboard
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.taskContainer, item.completed && styles.completedTask]}>
              <TouchableOpacity onPress={() => toggleComplete(item.id, item.completed)} style={styles.checkButton}>
                <Feather name={item.completed ? "check-circle" : "circle"} size={20} color="#3b82f6" />
              </TouchableOpacity>
              <Text style={[styles.taskText, item.completed && styles.completedText]}>{item.value}</Text>
              <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
                <Feather name="trash-2" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tasks yet. Add some to get started!</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  completedTask: {
    backgroundColor: '#d1fae5',
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 18,
    marginTop: 30,
  },
  checkButton: {
    padding: 5,
  },
});
