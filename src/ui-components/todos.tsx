"use client"
import { FC, useState } from "react";
import { todoType } from "@/types/todoType";

import AddTodo from "./addTodo";
import Todo from "./todo";

import { addtasks, deletetasks, edittasks, toggletasks } from "@/actions/todoAction";

interface Props {
    todos: todoType[];
  }
  

  const Todos: FC<Props> = ({ todos }) => {
    //state to manage the list of todo items
    const [todoItems,setTodoItems]=useState<todoType[]>(todos)

    //function to create a new todo item
    const createTodo = (text: string) => {
        const id = (todoItems.at(-1)?.id || 0) + 1;
        addtasks(id, text);
        setTodoItems((prev) => [...prev, { id: id, text, done: false }]);
      };

       // Function to change the text of a todo item
  const changeTodoText = (id: number, text: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    edittasks(id, text);
  };
  // Function to toggle the "done" status of a todo item
  const toggleIsTodoDone = (id: number) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
    toggletasks(id);
  };
  // Function to delete a todo item
  const deleteTodoItem = (id: number) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    deletetasks(id);
  };

    return(
        <>
             <main className="flex mx-auto  w-8/12 min-h-screen flex-col items-center p-8">
      <div className="text-5xl font-medium">DRIZZLE TODO</div>
      {/* Adding Todo component for creating new todos */}
      <AddTodo createTodo={createTodo} />
      <div className="w-full flex flex-col mt-8 gap-2">
        {/* Mapping through todoItems and rendering Todo component for each */}
        {todoItems.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            changeTodoText={changeTodoText}
            toggleIsTodoDone={toggleIsTodoDone}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
      
    </main>
        </>
    )
  }

  export default Todos;