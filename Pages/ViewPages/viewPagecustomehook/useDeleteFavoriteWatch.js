import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import constant from "../../../constant";
function useDeleteFavoriteWatch(requestConfig){
    const { url} = requestConfig;
    const [removed,setremoved]=useState(false)
    const [isPending,setIsPending]=useState(false)
    const deleteFvorite =()=>{
        setIsPending(true)
        const cancelTokenSource = axios.CancelToken.source()
        axios.delete(url, {headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${constant.access}`
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