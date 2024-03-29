import axios from "axios";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/todoSlice.js";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";


export default function TodoTable() {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todos)

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
            dispatch(todoActions.setData(response.data))
            setIsLoading(false)
        }
        fetchData()
    }, [dispatch])

    const loader = <CircularProgress />


    const rows = todos && todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed ? 'Completed' : 'Pending'
    }))
    console.log(rows)
    const columns = [
        { field: 'id', headerName: 'Id', width: 50 },
        { field: 'title', headerName: 'Title', width: 450 },
        { field: 'completed', headerName: 'Status', width: 150 }
    ]

    return (
        <div className="data-grid">
            {
                isLoading ? loader :
                    <DataGrid 
                    rows={rows} 
                    columns={columns}
                     />}
        </div>
    )
}