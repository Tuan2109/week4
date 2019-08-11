import React, { useState } from 'react';
import {
    Text, View, Alert, StyleSheet, TouchableOpacity, TextInput, ScrollView,
    ImageBackground,
    KeyboardAvoidingView
} from 'react-native';
import { TODOS } from '../utils/data.js';
import { eventDelete, onToggleTodo, onSubmitTodo } from '../components/myComponent.js';

const TodoItem = ({ props, todo, idx, onToggleTodo, setTodoList }) => {
    let statusStyle = {
        backgroundColor: todo.status === 'Done' ? 'blue' : 'green'
    };
    return (
        <TouchableOpacity
            key={todo.body}
            style={[styles.todoItem, statusStyle]}
            onPress={() => onToggleTodo(props, todo.id, props.navigation.state.params.listTodo, setTodoList)}
            onLongPress={() => eventDelete(props, todo, setTodoList)}
        >
            <Text style={styles.todoText}>
                {idx + 1}: {todo.body}
            </Text>
        </TouchableOpacity>
    );
};


export default function AllScreen(props) {
    let [todoList, setTodoList] = useState(TODOS);
    let [todoBody, setTodoBody] = useState('');

    return (
        <ImageBackground style={styles.container} source={{ uri: "https://c4.wallpaperflare.com/wallpaper/966/703/771/rubick-sets-loading-screen-dota-2-hd-wallpapers-for-mobile-phones-1920%C3%971080-wallpaper-1960487de14a1dbb7617788f50a186bd.jpg" }}>
            <KeyboardAvoidingView
                enabled
                behavior="padding"
                style={styles.keyBoard}
            >
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ marginTop: 20,  paddingTop: 800 }}>
                        {todoList.map((todo, idx) => {
                            console.log(props.navigation.state.params);
                            return <TodoItem
                                key={todo.body}
                                todo={todo}
                                idx={idx}
                                onToggleTodo={onToggleTodo}
                                props={props}
                                setTodoList={setTodoList}
                            />;
                        })}
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={todoBody}
                                style={styles.todoInput}
                                onChangeText={text => setTodoBody(text)}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={
                                    () => onSubmitTodo(props, todoList, setTodoList, todoBody, setTodoBody)
                                }
                            >
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>

    );
}

AllScreen.navigationOptions = {
    title: 'List Todos'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    todoItem: {
        margin: 5,
        padding: 10,
        width: '95%',
        minHeight: 20,
        color: 'white',
        borderRadius: 5,
        flexWrap: 'wrap'
    },
    todoText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },

    todoInput: {
        width: '95%',
        minHeight: 30,
        color: 'white',
        borderWidth: 1,
        marginTop: '20%',
        marginBottom: '5%',
        borderColor: 'grey'
    },
    inputContainer: {
        flex: 1,
        width: '90%',
        marginTop: 20,
        marginBottom: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 50,
        width: '50%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'blue',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    scrollView: {
        flex: 1,
    },
    keyBoard: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',

    }
});