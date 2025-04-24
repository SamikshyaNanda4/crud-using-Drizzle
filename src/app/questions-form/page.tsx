
import { QuestionForm } from "@/ui-components/question-form";


export default async function HomePage(){
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