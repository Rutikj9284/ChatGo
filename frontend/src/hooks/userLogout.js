import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";

export const userLogout = () =>{
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const logout = async() =>{
        setLoading(true);
        try {
           const res = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            }
           });
           const data = await res.json(); 

           if(data.error) {
            throw new Error(data.error);
           }

           localStorage.removeItem("chat-user");
           setAuthUser(null);
        } catch (error) {
            
        }finally{
            setLoading(false);
        }
    }
    return {loading, logout};
}