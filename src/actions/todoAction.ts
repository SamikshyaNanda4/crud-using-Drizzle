
"use server";
import {eq, not, relations } from "drizzle-orm"
import { revalidatePath } from "next/cache";
import {db} from "@/db/drizzle"
import { questions, tasks } from "@/db/schema";
import { date } from "drizzle-orm/mysql-core";


//GETDATA of the tasks-------------------------------------
// export const getData = async () => {
//     const data = await db.select().from(tasks);
//     return data;
// }


export const getData = async () => {
    const data = await db.select().from(tasks);
    return data;
}

//ADD DATA of the tasks-----------------------------------------
//  export const addtasks = async (id: number, text: string) => {
//     await db.insert(tasks).values({
//       id: id,
//       text: text,
//     });
//   };


  export const addtasks=async (id:number,text:string)=>{
    await db.insert(tasks).values({
        id:id,
        text:text,
    })
    revalidatePath("/home")
  }

  //DELETE a tasks from the table
//   export const deletetasks = async (id: number) => {
//     await db.delete(tasks).where(eq(tasks.id, id));
//     revalidatePath("/");
//   };
export const deletetasks= async(id:number)=>{
    await  db.delete(tasks).where(eq(tasks.id,id));
    revalidatePath("/home")
}


// export const toggletasks = async (id: number) => {
//     await db
//       .update(tasks)
//       .set({
//         done: not(tasks.done),
//       })
//       .where(eq(tasks.id, id));
//     revalidatePath("/");
//   };
  export const toggletasks=async(id:number)=>{
    await db 
        .update(tasks)
        .set({
            done:not(tasks.done)
        })
        .where(eq(tasks.id,id));
        revalidatePath("/home")
  }
//     export const edittasks = async (id: number, text: string) => {
//     await db
//       .update(tasks)
//       .set({
//         text: text,
//       })
//       .where(eq(tasks.id, id));
//     revalidatePath("/");
//   };
export const edittasks=async (id:number,text:string)=>{
    await db
        .update(tasks)
        .set({
            text:text
        })
        .where(eq(tasks.id,id));
        revalidatePath("/home")
}

//DELETE ALL THE tasks---- pending


export const addQuestions=async(title:string,
                                description:string,
                                difficulty:string,
                                tags:string[]|any) =>{
                                  try {
                                    await db.insert(questions).values({
                                      title: title,
                                      description: description,
                                      difficulty: difficulty,
                                      tags: tags,
                                    });
                                    return { success: true }; // Optional: Return success status
                                  } catch (error) {
                                    console.error("Error adding question:", error);
                                    return { success: false, error }; // Optional: Return error
                                  }
}

export const getQuestions=async()=>{
  try{
   const data= await db.select().from(questions)
    return data;
  }catch(error){
    console.error("Error fetching Questions")
    return {success:false,error:error}
  }
}