import { InfoBox } from "../../components/infoBox"
import { Button, A, P } from "../../components/base"
import { useState } from "react"
import axios from "axios"
import { redirect } from "react-router-dom"

export const SignIn = ({isAuthenticated, setAuthenticated}) => {
    const [auths, setAuths] = useState({})
    const [error, setError] = useState("")
    const onChange = (e) => setAuths({...auths, [e.target.name]:e.target.value})

    function onSubmit(e) {
        e.preventDefault()
        axios.post("http://localhost:5000/login", auths)
        .then(res => {
            if (res.data["error"] === 1) {
                console.log(res.data["msg"])
                let error_elm = document.getElementById("error")
                error_elm.style.display = "block"
                setError(res.data["msg"])
            } else {
                redirect("/home")
                setAuthenticated(true)
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <>
            <h2 className="Sign-txt">SIGN IN</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="sign-in">
                    <InfoBox Text={"Username"} Class={"user-info"} onChange={onChange} Type={"text"} Name={"username"} />
                    <InfoBox Text={"Password"} Class={"user-info"} onChange={onChange} Type={"password"} Name={"password"} />
                    <P Id={"error"} text={error} />
                    <div className="footer-sign">
                        <A Class={"forget"} Link={"Forget-link"} text={"Forget password ?"}/>
                        <A Class={"sign-link"} Link={"sign-up"} text={"Sign-up"}/>
                    </div>

                    <Button Class={"login-btn btn"} text={"Login"} />
                    <A Class={"other-ways btn"} Link={"#google"} icone={"bx bxl-google"} text={"Google"} />
                    <A Class={"other-ways btn"} Link={"#facebook"} icone={"bx bxl-facebook-circle"} text={"Facebook"} />
                </label>
            </form>
        </>
    )
}

