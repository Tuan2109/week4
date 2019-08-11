import React from 'react';
import { useState, Alert } from 'react-native';
import { TODOS } from '../utils/data.js';


function onDeleteTodo(props, id, setTodoList) {
    let listTodo = props.navigation.state.params.listTodo;
    let newTodoList = listTodo.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
};

export function eventDelete(props, todo, setTodoList) {
    let prompt = `"${todo.body}"`;
    Alert.alert(
        'Delete your todo?',
        prompt,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () => onDeleteTodo(props, todo.id, setTodoList)
            }
        ],
        {
            cancelable: true
        }
    );
}

export function onToggleTodo(props, id, todoList, setTodoList) {
    let todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    let foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    let newTodoList = [...todoList];

    props.navigation.setParams({
        listTodo: newTodoList
    })
    setTodoList(newTodoList);

    setTimeout(() => {
        props.navigation.navigate("All", {
            updatedTodo: todo,
        });
        props.navigation.navigate("Active", {
            updatedTodo: todo,
        });
        props.navigation.navigate("Complete", {
            updatedTodo: todo,
        });
        props.navigation.navigate("SingleTodo", {
            updatedTodo: todo,
            listTodo: todo,
        });
    }, 500);
}

export function onSubmitTodo(props, todoList, setTodoList, todoBody, setTodoBody) {
    let newTodo = {
        id: todoList[todoList.length - 1].id + 1,
        status: "Active",
        body: todoBody,
    };
    let newTodoList = [...todoList, newTodo];
    props.navigation.state.params.listTodo = newTodoList;
    setTodoList(newTodoList);
    setTodoBody('');
    setTimeout(() => {
        props.navigation.navigate("Active", {
            updatedTodo: newTodoList,
            listTodo: newTodoList,
        });
        props.navigation.navigate("Complete", {
            updatedTodo: newTodoList,
            listTodo: newTodoList,
        });
        props.navigation.navigate("All", {
            updatedTodo: newTodoList,
            listTodo: newTodoList,
        });
    }, 500);
};