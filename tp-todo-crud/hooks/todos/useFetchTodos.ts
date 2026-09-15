
import { useEffect, useState } from "react"
import { Todos } from "../../core/Todo"


export const useFetchTodos=()=>{
    const [todos, setTodos] = useState<Todos>([])
    const [isLoading,setIsLoading] = useState<boolean>(true)

    const fetchTodos = async ()=>{
        setIsLoading(true)
        const response = await fetch(process.env.EXPO_PUBLIC_URL_TODOS);
        const data = await response.json();
        setIsLoading(false)
        setTodos(data)
        
    }

    useEffect(() => {
        fetchTodos()
    }, [])
    
    return {todos,isLoading,setTodos,fetchTodos}

}