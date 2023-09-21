import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function useSearch({page,query}){
    const type=useSelector((state)=>state.user.type)
    const url = `https://api.themoviedb.org/3/search/${type}?query=${query}&page=${page}`
    const config ={
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTFkNGJjNzM4YjIyYWY0YjIxMTc2Yzc2NzQ0ZjQwZSIsInN1YiI6IjY0NjlkM2Q4ZDE4NTcyMDE2MTkxZjIyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0DangGEKgVV_wr6GP4aRPP55xtPyy0DlElDz0o9DOQw",
            "Accept":"application/json"} }

    const [errorMessage,seterrorMessage]=useState(null)
    const [isPending,setIsPending]=useState(false)
    const [data,setData]=useState(null)
   const search=()=>{
        setIsPending(true)
        setData(null)
        const cancelTokenSource = axios.CancelToken.source()
        axios.get(url,config,{
            CancelToken:cancelTokenSource.token
            })
        .then((response) => {
            setData(response.data)
            setIsPending(false)
        })
        .catch((error) => {
            if (axios.isCancel(error)) {
                setIsPending(false)
            }
            else {
                seterrorMessage("Something went wrong please try again!")
                console.log(error.message)
                setIsPending(false)
                }
                setIsPending(false)})
        cancelTokenSource.cancel('Request canceled by the user.');
    }
    return {errorMessage,isPending,data,search}
}
export default useSearch