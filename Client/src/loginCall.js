import axios from "axios";
import { API_SERVER } from "./utils/constant";

export const loginCall = async(userCredential, dispatch)=>{
    dispatch({type: "LOGIN_START"});
    try{
        const res = await axios.post(`${API_SERVER}/api/auth/login`, userCredential);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        console.log(res.data)
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}