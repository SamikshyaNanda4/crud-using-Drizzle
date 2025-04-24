"use client"
import {FC,useEffect,useState,useRef} from "react"
import { getQuestions } from "@/actions/todoAction"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
  } from "@/components/ui/table"
import "./table.css"
import { DescriptionCell } from "./description"
// type questionTableType{

// }

// interface Props {
//     todos: todoType[];
//   }
  

  export const QuestionTable: FC = () => {
    //state to manage the list of todo items
    const [data,setData]=useState<any>([])
    useEffect(()=>{
      const callTable=  async()=>{
      const data = await getQuestions()
      setData(data)
      console.log("HERE IS YOU DATA MADAFAKA",data)
        }
        callTable()
    },[])
    return(
        <Table className="table-neon">
        {
             data.length==0 && (
                <TableCaption>Fetching Data</TableCaption>
             )
        }
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead className="w-[400px]">Description</TableHead>
            <TableHead >Tag</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="cursor-pointer">
          {data.map((invoice:any) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.title}</TableCell>
              {/* <TableCell className="w-[400px] whitespace-normal break-words">{invoice.description}</TableCell> */}
              <TableCell className="w-[400px] whitespace-normal break-words no-underline">
              <span className="text-inherit no-underline decoration-transparent hover:underline-0">
             <DescriptionCell description={invoice.description} />
                </span>
            </TableCell>

              <TableCell>{invoice.difficulty}</TableCell>
              <TableCell >{invoice.tags.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }

  