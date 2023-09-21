import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function useGetvideoApi(MovieId){
    const type=useSelector((state)=>state.user.type)
    const url = `https://api.themoviedb.org/3/${type}/${MovieId}/videos`
    const config ={
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTFkNGJjNzM4YjIyYWY0YjIxMTc2Yzc2NzQ0ZjQwZSIsInN1YiI6IjY0NjlkM2Q4ZDE4NTcyMDE2MTkxZjIyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0DangGEKgVV_wr6GP4aRPP55xtPyy0DlElDz0o9DOQw",
            "Accept":"application/json" } }

    const [errorMessage,seterrorMessage]=useState(null)
    const [isPending,setIsPending]=useState(false)
    const [data,setData]=useState(null)
    useEffect(()=>{
        setIsPending(true)
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
                setIsPending(false)
                }
                setIsPending(false)})
        cancelTokenSource.cancel('Request canceled by the user.');
    },[])
    return {errorMessage,isPending,data}
}
export default useGetvideoApi
