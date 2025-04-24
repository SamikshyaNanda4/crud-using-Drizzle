
// import { QuestionForm } from "@/ui-components/question-form";
import { QuestionTable } from "@/ui-components/question-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function HomePage(){
    return(
        <>
           {/* <div className="flex items-center justify-center h-screen"> */}
           {/* <div className="w-1/2 h-[90vh] overflow-hidden"> */}
          <Link href="/questions-form"> <Button className="cursor-pointer mt-10 ml-40" variant="destructive">Add Question</Button></Link>
          <div className="flex justify-center items-center bg-[#0d0d0d]">
          <div className="p-6 rounded-2xl shadow-md border dark:bg-zinc-900 w-10/12 m-10 bg-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Questions Table</h2>
             <div className="overflow-x-auto">
             <QuestionTable/>
             </div>
            </div>
          </div>
            
        </>
    )
}