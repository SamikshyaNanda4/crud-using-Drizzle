import { getData } from "@/actions/todoAction";
import Todos from "@/ui-components/todos";
import { QuestionForm } from "@/ui-components/question-form";


export default async function HomePage(){

    const data = await getData();
    return(
        <>
           <div className="flex items-center justify-center h-screen">
           <div className="w-1/2 h-[90vh] overflow-hidden">
           <QuestionForm/>
           </div>
           </div>
            
        </>
    )
}