import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

type LoginInputs = {
  username: string;
  password: string;
};
const useLogin = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async (inputs: LoginInputs) => {
    setloading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setAuthUser(data);
    } catch (error:any) {
        toast.error(error.message)

    }finally{
        setloading(false)
    }
  };
  return{
    loading,login
  }
};

export default useLogin;
