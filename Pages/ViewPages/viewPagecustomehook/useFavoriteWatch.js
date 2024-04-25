import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import constant from "../../../constant";
function useFavoriteWatch(requestConfig){
    const { url, body} = requestConfig;
    const [added,setAdded]=useState(false)
    const [isPending,setIsPending]=useState(false)
 
        const Add=()=>{
            setIsPending(true)
            const cancelTokenSource = axios.CancelToken.source()
            axios.post(url, body, {headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${constant.access}`
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