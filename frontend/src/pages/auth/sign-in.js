import { InfoBox } from "../../components/infoBox"
import { Button, A, P, Input } from "../../components/base"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useLangContext } from "../../Lang";

export const SignIn = ({isAuthenticated, setAuthenticated}) => {
    const [auths, setAuths] = useState({})
    const [error, setError] = useState("")
    const [capVal, setCapVal] = useState();
    const lang = useLangContext()

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
                    error_elm.style.display = "block"
                    setError(lang[res.data["msg"]])
                }
            })
            .catch(err => console.log(err))
        } else {
            error_elm.style.display = "block"
            setError(lang["CAPTCHA_INVALID"])
        }
    }
    function onClickPassword() {
        let pass_toggle = document.getElementById("password")
        if (pass_toggle.type == "password") {
            pass_toggle.type = "text"
        } else {
            pass_toggle.type = "password"
        }
    }
    return (
        <>
            <h2 className="Sign-txt">{lang["LOGIN_TITLE"]}</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="sign-in">
                    <InfoBox Text={lang["USERNAME"]} Class={"user-info"} onChange={onChange} Type={"text"} Name={"username"} />
                    <div className="user-infoBox">
                        <P text={lang["PASSWORD"]} />
                        <Input Class={"user-info"} PlaceHolder={lang["PASSWORD"]} Type={"password"} Name={"password"} onChange={onChange} Id={"password"} />
                        <span id="show-password-toggle" onClick={onClickPassword}><i className="fas fa-eye"></i>s</span>
                    </div> 
                    <div className="user-infoBox">
                        <ReCAPTCHA
                            sitekey="6Ld0rzMpAAAAAKtLkin6Qeg2r0tdw3LIsPJIP6Hn"
                            onChange={(val) => setCapVal(val)}
                        />
                        <P Id={"error captcha"} text={error["captcha"]} />
                    </div>
                    <P Id={"error"} text={error} />
                    <div className="footer-sign">
                        <A Class={"forget"} Link={"Forget-link"} text={lang["FORFOT_PASSWORD"]}/>
                        <A Class={"sign-link"} Link={"sign-up"} text={lang["SIGN_UP_IN_LOGIN_PAGE"]}/>
                    </div>

                    <Button Class={"login-btn btn"} text={lang["LOGIN_BTN"]} />
                </label>
            </form>
        </>
    )
}

