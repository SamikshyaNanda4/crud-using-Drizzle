"use client"
import {ChangeEvent,FC,useState} from "react";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addQuestions } from "@/actions/todoAction";
import {Loader2,Send} from 'lucide-react';
const Icons = {
    spinner: Loader2,
  };

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { boolean } from "drizzle-orm/gel-core";


export const questionFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters and maximum 60').max(60),
    description: z.string().min(10, 'Description should be more detailed'),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    tags: z.array(z.string()).optional(),
  });

export type QuestionType={
    title:string;
    description: string;
    difficulty: string;
    tags:string[]
}

export function QuestionForm(){
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof questionFormSchema>>({
        resolver: zodResolver(questionFormSchema),
        defaultValues: {
         title: "",
         description:"",
         difficulty:undefined,
         tags:["N/A"],
        },
      })


    async  function submitQuestion(values: z.infer<typeof questionFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated
        // setLoading(true)
        console.log(values)
        // const {title,description,difficulty,tags}=values;
        // addQuestions(title,description,difficulty,tags)
        // setLoading(false)
        setLoading(true); // Button loading shuru ✅
        // console.log(values);
        
        const { title, description, difficulty, tags } = values;
      
        try {
          // Await lagaya, taki DB call complete hone ka wait kare
          await addQuestions(title, description, difficulty, tags);
          
          // Optional: Success message/toast
        //   toast.success("Question added successfully!"); // (if using react-toastify/sonner)
          
        } catch (error) {
          // Optional: Error handling
        //   toast.error("Failed to add question!"); 
          console.error("Error:", error);
          
        } finally {
          setLoading(false); // Button loading khatam (error/success dono case mein) ✅
        }

      }

    
        
        return (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitQuestion)} className="space-y-9">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter title of your Question here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
          
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the description" {...field} />
                      </FormControl>
                      <FormDescription>
                        Type description for better understanding.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
          
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <FormControl>
                        <Input placeholder="Easy | Medium | Hard" {...field} />
                      </FormControl>
                      <FormDescription>
                        Only write Easy, Medium or Hard here
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
          
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Comma separated tags (e.g. array, dfs)"
                          value={field.value?.join(', ') || ''}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value.split(',').map((tag) => tag.trim())
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>Separate each tag with a comma.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
          
          <Button type="submit" className="cursor-pointer flex items-center gap-2">
  { loading ? (
    <>
      <Loader2 className="animate-spin w-4 h-4" />
      <span className="invisible">SUBMIT</span>
    </>
  ) : (
    <>
      <Send className="w-4 h-4" />
      <span>SUBMIT</span>
    </>
  )}
</Button>
                
              </form>
            </Form>
          )

}

//                <Form {...form}>

// <form onSubmit={form.handleSubmit(submitQuestion)} className="space-y-9">
// <FormField
// control={form.control}
// name="title"
// render={({ field }) => (
// <FormItem>
// <FormLabel>Title</FormLabel>
// <FormControl>
// <Input placeholder="Enter the title" {...field} />
// </FormControl>
// <FormDescription>
//         Enter title of your Question here.
//       </FormDescription>
// <FormMessage />
// </FormItem>
// )}
// />

// <FormField
// control={form.control}
// name="description"
// render={({ field }) => (
// <FormItem>
// <FormLabel>Description</FormLabel>
// <FormControl>
// <Input placeholder="Enter the description" {...field} />
// </FormControl>
// <FormDescription>
//         Type description for better understanding.
//       </FormDescription>
// <FormMessage />
// </FormItem>
// )}
// />

// <FormField
// control={form.control}
// name="difficulty"
// render={({ field }) => (
// <FormItem>
// <FormLabel>Difficulty</FormLabel>
// <FormControl>
// <Input placeholder="Easy | Medium | Hard" {...field} />
// <FormDescription>
//         Only write Easy, Medium or Hard here
//       </FormDescription>
// </FormControl>
// <FormMessage />
// </FormItem>
// )}
// />

// <FormField
// control={form.control}
// name="tags"
// render={({ field }) => (
// <FormItem>
// <FormLabel>Tags</FormLabel>
// <FormControl>
// <Input
//   placeholder="Comma separated tags (e.g. array, dfs)"
//   value={field.value?.join(', ') || ''}
//   onChange={(e) => field.onChange(
//     e.target.value.split(',').map(tag => tag.trim())
//   )}
// />
//  <FormDescription>
//         Separate each tags with comma.
//       </FormDescription>
// </FormControl>
// <FormMessage />
// </FormItem>
// )}
// />
// <Button type="submit">Submit</Button>
// </form>
// </Form>