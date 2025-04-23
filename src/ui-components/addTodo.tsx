
import {ChangeEvent,FC,useState} from "react";

interface Props {
    createTodo:(value: string) => void
}

const AddTodo:FC<Props>=({createTodo})=>{
     // State for handling input value
    const[input,setInput]=useState("")

     // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

   // Event handler for adding a new todo
   const handleAdd = async () => {
    if(input && input.length>0){
      createTodo(input);
      setInput("");
    }
   
  };

    return(
        <>
         <div className="w-full flex gap-1 mt-2">
         <input
         placeholder="add todo here"
        type="text"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={handleInput}
        value={input}
      />

       {/* Button for adding a new todo */}
       <button
        className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1 cursor-pointer select-none"
        onClick={handleAdd}
      >
        Add
      </button>
         </div>
        </>
    )
}

export default AddTodo;