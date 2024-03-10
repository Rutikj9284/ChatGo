import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const userSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const signup = async({fullName, username, password, confirmPassword, gender})=>{
    const isValidInputs = handleInputErrors({fullName, username, password, confirmPassword, gender});

    if(!isValidInputs){
        return;
    }

    setLoading(true);

    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({fullName, username, password, confirmPassword, gender})
        });
        const data = await res.json();
        // console.log(data);

        if(data.error){
            throw new Error(data.error);
        }
        //Save in local storage
        localStorage.setItem("chat-user", JSON.stringify(data));
        //Then set in context
        setAuthUser(data);

    } catch (error) {
        toast.error("Internal Sevrer Error");
    } finally {
        setLoading(false);
    }

  };
  return {loading, signup};
}

function handleInputErrors({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !gender){
        //return errors using react-hot-toast
        toast.error("Please fill all the fields");
        return false;
    }

    if(password !== confirmPassword){
        //return errors using react-hot-toast
        toast.error("Passwords did not match");
        return false;
    }

    if(password.length < 6){
        //return errors using react-hot-toast
        toast.error("Password must be at least 6 characters long");
        return false;
    }
    toast.success("You have successfully signed up with ChatGoo");
    return true;
}

export default userSignup;