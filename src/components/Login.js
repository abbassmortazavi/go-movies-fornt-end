import { useState } from "react";
import Input from "./form/Input";
import { useOutletContext } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setJwtToken} = useOutletContext();

    const handelSubmit = (event)=>{
        event.preventDefault();
        console.log("user/pass", email, password);
        if (email === "jafar@yahoo.com"){
            setJwtToken("abc");
        }
    }
    return (
        <div className="col-md-6 offset-3">
            <h2>Login</h2>
            <hr/>
            <form onSubmit={handelSubmit}>
                <Input
                    type="email"
                    name="email"
                    title="Email Address"
                    placeholder="Eneter Your Email!"
                    className="form-control"
                    outocomplete="email-new"
                    onChange={(event)=> setEmail(event.target.value)}
                />
                 <Input
                    type="password"
                    name="password"
                    title="Password"
                    placeholder="Eneter Your Password!"
                    className="form-control"
                    outocomplete="password-new"
                    onChange={(event)=> setPassword(event.target.value)}
                />
                <input type="submit" className="btn btn-primary" value="Send"/>
            </form>
        </div>
    );
}

export default Login;