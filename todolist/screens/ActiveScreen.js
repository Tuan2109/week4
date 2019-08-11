import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TODOS } from '../utils/data.js';
import { eventDelete, onToggleTodo } from '../components/myComponent.js';

export default function ActiveScreen(props) {
    return (
        <View style={styles.container}>
            {
                props.navigation.state.params.listTodo.map((item, idx) => {
                    return showListActive(props, idx)
                })
            }
        </View>
    );
}

function showListActive(props, idx) {
    let [todoList, setTodoList] = useState(TODOS);
    const onDeleteTodo = id => {
        let newTodoList = todoList.filter(todo => todo.id !== id);
        props.navigation.navigate(props.navigation.state.routeName, {
            updatedTodo: newTodoList,
        });
        setTodoList(newTodoList);
    };
    if (props.navigation.state.params.listTodo[idx].status == "Active") {
        return (
            <TouchableOpacity
                key={props.navigation.state.params.listTodo[idx].body}
                style={[styles.todoItem, styles.statusStyle]}
                onPress={() => onToggleTodo(props, props.navigation.state.params.listTodo[idx].id, props.navigation.state.params.listTodo, setTodoList)}
                onLongPress={() => eventDelete(props, props.navigation.state.params.listTodo[idx], onDeleteTodo)}
            >
                <Text style={styles.todoText}>
                    {idx + 1}: {props.navigation.state.params.listTodo[idx].body}
                </Text>
            </TouchableOpacity>
        );
    }
}

ActiveScreen.navigationOptions = {
    title: "List Active",
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

    },
    statusStyle: {
        backgroundColor: 'green',
    }
});