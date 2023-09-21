import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
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
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MTQ0ODkxLCJpYXQiOjE2OTUwNTg0OTEsImp0aSI6ImZkYzJiN2I0OGE1NDQ0N2FiN2Q0YzJkNDdiYWFiZTliIiwidXNlcl9pZCI6NH0.0TeQw_F8ReyFhidAhefuE0OqdF4Cp70Wp3auOUZNfyg"
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


