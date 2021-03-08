import axios from "axios";
import apiConstants from '../apiConstants/UserApiConstants'


export function loginUser(data){
    try{
        const response = axios.post(process.env.REACT_APP_USER_URL+apiConstants.loginPath, data);
        return response;
    }
    catch(error){
        return error;
    }
}
export function signUpUser(data){
    try{
        const response = axios.post(process.env.REACT_APP_USER_URL+apiConstants.registrationPath, data);
        return response;
    }
    catch(error){
        return error;
    }
}
