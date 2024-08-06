import { StyleSheet, Text, TextInput, View, SafeAreaView, StatusBar, TouchableOpacity, ViewComponent, FlatList, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import Hero from './components/Hero';

export default function App() {

  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const AddTodo = () => {
    setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
    setTodo('');
  }

  const deleteTodo = (id) => {
    const updateTodo = todoList.filter((todo) => (todo.id) !== id);
    setTodoList(updateTodo)
  }

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setTodo(todo.title);
  }

  const handleUpdateTodo = () => {
    const updateTodos = todoList.map((item) => {
      if (item.id === editTodo.id) {
        return { ...item, title: todo }
      }
      return item;
    })

    setTodoList(updateTodos);
    setEditTodo(null);
    setTodo('');
  }

  const renderTodos = ({ item, index }) => {
    return (
      
        <ScrollView>


          <View style={{
            height: 50,
            justifyContent: 'center',
            backgroundColor: '#212121',
            marginHorizontal: 6,
            paddingHorizontal: 15,
            marginVertical: 10,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={{ color: 'white', fontSize: 16, flex: 1 }}>
              {item.title}
            </Text>
            <MaterialIcons name="edit" size={24} color="#ffc107" style={{ marginRight: 10 }} onPress={() => handleEditTodo(item)} />
            <MaterialIcons name="delete" size={24} color="#ffc107" onPress={() => deleteTodo(item.id)} />
          </View>

        </ScrollView>

    )
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#0d0d0d'} barStyle="light-content" />
        <Image source={require("./images/todo.png")} style={{ height: 96, width: 500 }} />
        <TextInput style={styles.input} placeholder='Enter the task' placeholderTextColor={'#c8d4e0'}
          value={todo}
          onChangeText={(userText) => setTodo(userText)} />
        {
          editTodo ? <TouchableOpacity
            style={{ backgroundColor: '#ffc107', height: 38, alignItems: 'center', justifyContent: 'center', marginVertical: 26, borderRadius: 18 }}
            onPress={() => handleUpdateTodo()}
          >
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Save</Text>
          </TouchableOpacity> :
            <TouchableOpacity
              style={{ backgroundColor: '#ffc107', height: 38, alignItems: 'center', justifyContent: 'center', marginVertical: 26, borderRadius: 18 }}
              onPress={() => AddTodo()}
            >
              <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Add</Text>
            </TouchableOpacity>
        }
        {
          todoList.length <= 0 && <Hero />
        }
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }}>
      <View>
        <FlatList data={todoList} renderItem={renderTodos} />

      </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    paddingHorizontal: 10
  },
  container: {
    marginBottom: 20,
    marginHorizontal: 6
  },
  input: {
    color: 'white',
    borderRadius: 6,
    borderColor: '#ffc107',
    borderWidth: 2,
    paddingHorizontal: 10,
    width: 'full',
    height: 48,
    placeholderTextColor: 'white',
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 10
  }
});
