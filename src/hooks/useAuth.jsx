import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

let useAuth = () => {
    let auth = useContext(AuthContext);
    return auth;
};

export default useAuth;