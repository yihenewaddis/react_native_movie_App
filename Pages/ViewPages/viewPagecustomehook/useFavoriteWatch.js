import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
function useFavoriteWatch(requestConfig){
    const { url, body} = requestConfig;
    const [added,setAdded]=useState(false)
    const [isPending,setIsPending]=useState(false)
 
        const Add=()=>{
            setIsPending(true)
            const cancelTokenSource = axios.CancelToken.source()
            axios.post(url, body, {headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MTQ0ODkxLCJpYXQiOjE2OTUwNTg0OTEsImp0aSI6ImZkYzJiN2I0OGE1NDQ0N2FiN2Q0YzJkNDdiYWFiZTliIiwidXNlcl9pZCI6NH0.0TeQw_F8ReyFhidAhefuE0OqdF4Cp70Wp3auOUZNfyg"
            },},{
                CancelToken:cancelTokenSource.token
                })
            .then((response) => {
                setAdded(true)
                setIsPending(false)
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    setIsPending(false)
                }
                else {
                    if(error.message=='Request failed with status code 401'){
                    setIsPending(false)
                    Alert.alert("Something went wrong please try again!")
                    }
                    else{
                    setIsPending(false)
                    Alert.alert("Already exist")
                    setAdded(true)
                    }}
                    setIsPending(false)
                })
            cancelTokenSource.cancel('Request canceled by the user.');
        }

    return {isPending,Add,added}
}
export default useFavoriteWatch;