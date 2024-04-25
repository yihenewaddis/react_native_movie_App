import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import constant from "../../../constant";
function useGetCommentFavorite(request){
   const {url}=request
    const [addedcoment,setaddedcoment]=useState(false)
    const [isLoading,setisLoading]=useState(false)
    const [data,setdata]=useState('')
    useEffect(()=>{
        setisLoading(false)
        const cancelTokenSource = axios.CancelToken.source()
        axios.get(url,{headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${constant.access}`
        },},{
            CancelToken:cancelTokenSource.token
            })
        .then((response) => {
            setdata(response.data)
            setaddedcoment(true)
            setisLoading(false)
        })
        .catch((error) => {
            if (axios.isCancel(error)) {
                setisLoading(false)
            }
            else {
                if(error.message=='Request failed with status code 401'){
                    setisLoading(false)
                Alert.alert("Something went wrong please try again!")
                }
                else{
                    setisLoading(false)
               console.log(error.message)
                console.log(error)
                setaddedcoment(true)
                }}
                setisLoading(false)
            })
        cancelTokenSource.cancel('Request canceled by the user.');
    },[url])

    return {isLoading,addedcoment,data}
}
export default useGetCommentFavorite;


