import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
function useDeleteFavoriteWatch(requestConfig){
    const { url} = requestConfig;
    const [removed,setremoved]=useState(false)
    const [isPending,setIsPending]=useState(false)
    const deleteFvorite =()=>{
        setIsPending(true)
        const cancelTokenSource = axios.CancelToken.source()
        axios.delete(url, {headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MTQ0ODkxLCJpYXQiOjE2OTUwNTg0OTEsImp0aSI6ImZkYzJiN2I0OGE1NDQ0N2FiN2Q0YzJkNDdiYWFiZTliIiwidXNlcl9pZCI6NH0.0TeQw_F8ReyFhidAhefuE0OqdF4Cp70Wp3auOUZNfyg"
        },},{
            CancelToken:cancelTokenSource.token
            })
        .then((response) => {
            setremoved(true)
            setIsPending(false)
        })
        .catch((error) => {
            if (axios.isCancel(error)) {
                setIsPending(false)
            }
            else {
                if(error.message=='Request failed with status code 401'){
                setIsPending(false)
                }}
                setIsPending(false)
                console.log(error.message)
            })
        cancelTokenSource.cancel('Request canceled by the user.');
    }

    return {isPending,removed,deleteFvorite}
}
export default useDeleteFavoriteWatch;