"use client"
import { ChangeEvent,FC,useState } from "react"
import { todoType } from "@/types/todoType"

interface Props {
    todo: todoType;
    changeTodoText: (id: number, text: string) => void;
    toggleIsTodoDone: (id: number, done: boolean) => void;
    deleteTodoItem: (id: number) => void;
}

const Todo:FC<Props>=({
        todo,
        changeTodoText,
        toggleIsTodoDone,
        deleteTodoItem,
    }
)=>{
    //state for handing edit mode
    const [editing, setEditing] = useState(false);

    //state for handling text mode
    const[text,setText]=useState(todo.text);

    //state for handling "done" status
    const[isDone,setIsDone]=useState(todo.done);

    //event handler for text input change
    // const handleTextChange=(e:ChangeEvent<HTMLInputElement>)=>{
    //     setText(e.target.value);
    // }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    };

    // Event handler for toggling "done" status
    const handleStatusChange= async ()=>{
        toggleIsTodoDone(todo.id,!isDone)
        setIsDone((prev)=>!prev)
    }

     // Event handler for initiating the edit mode
  const handleEdit = () => {
    setEditing(true);
  };

   // Event handler for saving the edited text
   const handleSave = async () => {
    changeTodoText(todo.id, text);
    setEditing(false);
  };

  
  // Event handler for canceling the edit mode
  const handleCancel = () => {
    setEditing(false);
    setText(todo.text);
  };

  
  // Event handler for deleting a todo item
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodoItem(todo.id);
    }
  };

  //Rendering the  component



  return(
    <>
     <div className={`  ${todo.done ? "bg-green-500" : "bg-gray-100"} flex gap-2 p-4 border-gray-200 border-solid border rounded-sm w-full `}>
    {/* {CheckBox for marking the todo as done} */}
    <input
        type="checkbox"
        className="text-blue-200 rounded-sm h-4 w-4"
        checked={isDone}
        onChange={handleStatusChange}
      />
      {/* {input field for todo text} */}
      {/* <textarea
        value={text}
        onChange={handleTextChange}
        readOnly={!editing}
        // className={`${
        //   todo.done ? "line-through" : ""
        // } outline-none resize-y sm:text-sm text-base read-only:border-transparent focus:border border-gray-200 rounded px-2 py-2 w-full min-h-[200px] max-h-[400px]`}
        className={`${
          todo.done ? "line-through" : ""
        } outline-none read-only:border-transparent focus:border border-gray-200 rounded px-2 py-2 w-full resize-none overflow-hidden min-h-[44px] max-h-[400px] sm:text-sm text-base`}
      /> */}
      <textarea
  value={text}
  onChange={(e) => {
    handleTextChange(e);
    // Auto-expand logic
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 400)}px`;
  }}
  readOnly={!editing}
  className={`
    ${todo.done ? "line-through opacity-80" : ""}
    w-full border ${editing?"border-green-950 bg-gray-200":" bg-gray-50 border-gray-300 "}
    px-4 py-3 text-gray-900
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
    read-only:bg-gray-100 read-only:cursor-not-allowed
    dark:bg-gray-800 dark:border-gray-700 dark:text-white
    dark:focus:ring-blue-600 dark:focus:border-blue-600
    min-h-[44px] max-h-[400px] overflow-x-hidden overflow-y-auto
    transition-all duration-100 ease-linear
    resize-none
    scrollbar 
    scrollbar-w-2 
    scrollbar-track-gray-100 
    scrollbar-thumb-gray-400
    scrollbar-thumb-hover-gray-500
    dark:scrollbar-track-gray-800 
    dark:scrollbar-thumb-gray-600
    dark:scrollbar-thumb-hover-gray-500
    whitespace-pre-wrap
  ${!editing?"bg-gray-300":"bg-gray-50 border-gray-900" }}
  `}
  style={{
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  }}
/>
            {/* Action buttons for editing, saving, canceling, and deleting */}
              <div className="flex gap-1 ml-auto">
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 text-green-50 rounded px-2 w-14 py-1"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-400 text-blue-50 rounded w-14 px-2 py-1"
          >
            Edit
          </button>
        )}
        {editing ? (
          <button
            onClick={handleCancel}
            className="bg-red-400 w-16 text-red-50 rounded px-2 py-1"
          >
            Close
          </button>
        ) : (
          <button
            onClick={handleDelete}
            className="bg-red-400 w-16 text-red-50 rounded px-2 py-1"
          >
            Delete
          </button>
        )}
      </div>


    </div>
    </>
  )

}

export default Todo;