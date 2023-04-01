import { v4 as uuidv4 } from "uuid";
import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Make sure we're in the browser. Then get the data
// from local storage. If there is no data in local
// storage, data is an empty array.
const data = browser ? JSON.parse(window.localStorage.getItem('st-todo-list')) ?? [] : [];

// Create store
export const todos = writable(data);

// Subscribe method for the store, and push the value
// into local storage.
todos.subscribe((value) => {
  if (browser) {
    localStorage.setItem('st-todo-list', JSON.stringify(value));
  }
});

export const addTodo = () => {
  todos.update((currentTodos) => {
    return [...currentTodos, {
      id: uuidv4(),
      text: '',
      complete: false
    }]
  })
}

export const deleteTodo = (id) => {
  todos.update((currentTodos) => {
    return currentTodos.filter((todo) => todo.id !== id);
  })
}

export const toggleTodo = (id) => {
  todos.update((currentTodos) => {
    return currentTodos.map((todo) => {
      if (todo.id === id) {
        return {...todo, complete: !todo.complete};
      }
      return todo;
    })
  })
}

export const editTodo = (id, text) => {
  todos.update((currentTodos) => {
    return currentTodos.map((todo) => {
      if (todo.id === id) {
        return {...todo, text};
      }
      return todo;
    })
  })
}