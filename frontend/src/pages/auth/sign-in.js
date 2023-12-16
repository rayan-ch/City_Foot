import { InfoBox } from "../../components/infoBox"
import { Button, A, P } from "../../components/base"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export const SignIn = ({isAuthenticated, setAuthenticated}) => {
    const [auths, setAuths] = useState({})
    const [error, setError] = useState("")
    const [capVal, setCapVal] = useState();

    const onChange = (e) => setAuths({...auths, [e.target.name]:e.target.value})
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault()
        let error_elm = document.getElementById("error")

        if (capVal !== undefined && capVal !== null) {
            error_elm.style.display = "none"
            axios.post("http://localhost:5000/login", auths)
            .then(res => {
                if (res.data["error"] === 0) {
                    setAuthenticated(true)
                    navigate("/dashboard");
                } else {
                    console.log(res.data["msg"])
                    error_elm.style.display = "block"
                    setError(res.data["msg"])
                }
            })
            .catch(err => console.log(err))
        } else {
            error_elm.style.display = "block"
            setError("Captcha invalide")
        }
    }
    return (
        <>
            <h2 className="Sign-txt">SIGN IN</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="sign-in">
                    <InfoBox Text={"Username"} Class={"user-info"} onChange={onChange} Type={"text"} Name={"username"} />
                    <InfoBox Text={"Password"} Class={"user-info"} onChange={onChange} Type={"password"} Name={"password"} />
                    <div className="user-infoBox">
                        <ReCAPTCHA
                            sitekey="6Ld0rzMpAAAAAKtLkin6Qeg2r0tdw3LIsPJIP6Hn"
                            onChange={(val) => setCapVal(val)}
                        />
                        <P Id={"error captcha"} text={error["captcha"]} />
                    </div>
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

