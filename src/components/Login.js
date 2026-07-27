import { memo, useState } from "react";
import Input from "./form/Input";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setJwtToken } = useOutletContext();
    const { setAlertClassName } = useOutletContext();
    const { setAlertMessage } = useOutletContext();
    const {toggleRefresh} = useOutletContext();
    let navigate = useNavigate();

  

    const handelSubmit = (event) => {
        event.preventDefault();
        let reqPayload = {
            email: email,
            password: password
        }
        const requestOptions = {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(reqPayload)
        }
        fetch(`/authenticate`, requestOptions)
        .then((res)=>res.json())
        .then((data)=>{
            if(data.error){
                setAlertClassName('alert-danger')
                setAlertMessage(data.message)
            }else{
                setJwtToken(data.access_token)
                setAlertClassName("d-none")
                setAlertMessage("")
                toggleRefresh(true);
                navigate("/")
            }
        }).catch(err=>{
            setAlertClassName("alert-danger")
            setAlertMessage(err)
        })
    }
    return (
        <div className="col-md-6 offset-3">
            <h2>Login</h2>
            <hr />
            <form onSubmit={handelSubmit}>
                <Input
                    type="email"
                    name="email"
                    title="Email Address"
                    placeholder="Eneter Your Email!"
                    className="form-control"
                    outocomplete="email-new"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                    type="password"
                    name="password"
                    title="Password"
                    placeholder="Eneter Your Password!"
                    className="form-control"
                    outocomplete="password-new"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <input type="submit" className="btn btn-primary" value="Send" />
            </form>
        </div>
    );
}

export default Login;