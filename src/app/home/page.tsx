import { getData } from "@/actions/todoAction";
import Todos from "@/ui-components/todos";


export default async function HomePage(){

    const data = await getData();
    return(
        <>
            <Todos todos={data}/>
        </>
    )
}