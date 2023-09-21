import axios from "axios";
import { useState } from "react";
import { useDispatch} from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login_ok } from "../../../Redux/slice/userSlice";
import { Alert } from "react-native";
function useRegisterHook(requestConfig){
    const dispatch = useDispatch()
    const { url, body, config } = requestConfig;
    const [errorMessage,seterrorMessage]=useState(null)
    const [isPending,setIsPending]=useState(false)

    const storeData = async (data) => {
        try {
            await AsyncStorage.setItem("access", data.access);
            await AsyncStorage.setItem("refresh", data.refresh);
            dispatch(Login_ok())
        } catch (error) {
            Alert.alert('Warning', "Don't forgot your password");
        }
        };

        const Register=()=>{
            setIsPending(true)
            const cancelTokenSource = axios.CancelToken.source()
            axios.post(url, body, config,{
                CancelToken:cancelTokenSource.token
                })
            .then((response) => {
                storeData(response.data)
                setIsPending(false)
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    setIsPending(false)
                }
                else {
                    if(error.message=='Request failed with status code 401'){
                    seterrorMessage("invalid email or password !")
                    setIsPending(false)
                    }
                    else{
                    seterrorMessage("Something went wrong please try again!")
                    setIsPending(false)
                    }}
                    setIsPending(false)
                })
            cancelTokenSource.cancel('Request canceled by the user.');
        }

    return {errorMessage,isPending,Register}
}
export default useRegisterHook;