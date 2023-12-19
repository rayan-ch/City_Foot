import { InfoBox } from "../../components/infoBox"
import { Button, A, P } from "../../components/base"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useLangContext } from "../../Lang";

export const SignUp = () => {
    const [auths, setAuths] = useState({"username":"", "email":"", "password":"", "re-password":""})
    const [errors, setErrors] = useState({})
    const [capVal, setCapVal] = useState();
    const lang = useLangContext()

    const navigate = useNavigate();
    const onChange = (e) => {
        setAuths({...auths, [e.target.name]:e.target.value})
        if (e.target.name === "username") {
            checkValidityUsername(e.target.value)
        }
        if (e.target.name === "email") {
            checkValidityEmail(e.target.value)
        }
        checkForm(e.target.name, e.target.value)
    }
    const removeError = (fieldName) => {
        const updatedErrors = { ...errors };
        delete updatedErrors[fieldName];
        setErrors(updatedErrors);
    };
    const checkForm = (target, value) => {
        let error_elm = document.getElementById(`error ${target}`)
        let info_box = document.getElementsByClassName(`user-info ${target}`)[0]

        if (target === "password") {
            if (value.length < 8) {
                setErrors({...errors, [target]:lang["PASSWORD_TOO_SHORT"]})
                error_elm.style.display = "block"
                info_box.style.borderBottom = '3px solid red'
            } else {
                error_elm.style.display = "none"
                info_box.style.borderBottom = '3px solid green'
                removeError(target)
            }
        }
        if (target === "re-password") {
            if (auths["password"].length >= 8) {
                if (auths["password"] !== value || value.length < 8) {
                    setErrors({...errors, [target]:lang["NOT_SAME_PASSWORD"]})
                    error_elm.style.display = "block"
                    info_box.style.borderBottom = '3px solid red'
                } else {
                    info_box.style.borderBottom = '3px solid green'
                    removeError(target)
                }
            } else {
                info_box.style.borderBottom = 'none'
                removeError(target)
            }
        }
        if (value.length === 0) {
            error_elm.style.display = "none"
            info_box.style.borderBottom = 'none'
            removeError(target)
        }
    }
    function checkValidityEmail(value) {
        let name = "email"
        let error_elm = document.getElementById(`error ${name}`)
        let info_box = document.getElementsByClassName(`user-info ${name}`)[0]
        axios.post("http://localhost:5000/checkValidity", {name:name, value:value})
        .then(res => {
            if (res.data["error"] === 0) {
                info_box.style.borderBottom = '3px solid green'
                removeError(name)
            } else {
                setErrors({...errors, [name]:lang["EMAIL_ALREADY_EXIST"]})
                info_box.style.borderBottom = '3px solid red'
                error_elm.style.display = "block"
            }
        })
    }
    function checkValidityUsername(value) {
        let name = "username"
        let error_elm = document.getElementById(`error ${name}`)
        let info_box = document.getElementsByClassName(`user-info ${name}`)[0]
        if (name === "username" && value.length > 3) {
            error_elm.style.display = "none"
            removeError(name)
            info_box.style.borderBottom = '3px solid orange'
            axios.post("http://localhost:5000/checkValidity", {name:name, value:value})
            .then(res => {
                if (res.data["error"] === 0) {
                    info_box.style.borderBottom = '3px solid green'
                } else {
                    setErrors({...errors, [name]:lang["USERNAME_ALREADY_EXIST"]})
                    info_box.style.borderBottom = '3px solid red'
                    error_elm.style.display = "block"
                }
            })
        } else {
            setErrors({...errors, [name]:lang["USENAME_TOO_SHORT"]})
            info_box.style.borderBottom = '3px solid red'
            error_elm.style.display = "block"
        }
    }
    function onSubmit(e) {
        e.preventDefault()
        console.log(Object.keys(errors).length)
        console.log(capVal)
        if (capVal !== undefined && capVal !== null) {
            removeError("captcha")
            if (Object.keys(errors).length === 0) {
                axios.post("http://localhost:5000/sign-up", auths)
                .then(res => {
                    if (res.data["error"] === 0) {
                        navigate("/sign-in")
                        setCapVal();
                    } else {
                        let target = "global"
                        setErrors({...errors, [target]:lang[res.data["msg"]]})
                    }
                })
                .catch(err => console.log(err))
            }
        } else {
            let target = "captcha"
            setErrors({...errors, [target]:lang["CAPTCHA_INVALID"]})
        }
    }
    return (
        <>
            <h2 className="Sign-txt">{lang["SIGN_UP_TITLE"]}</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="sign-up">
                    <InfoBox Text={lang["USERNAME"]} Class={"user-info username"} onChange={onChange} Type={"text"} Name={"username"}/>
                    <P Id={"error username"} text={errors["username"]} />
                    <InfoBox Text={lang["EMAIL"]} Class={"user-info email"} onChange={onChange} Type={"email"} Name={"email"} />
                    <P Id={"error email"} text={errors["email"]} />
                    <InfoBox Text={lang["PASSWORD"]} Class={"user-info password"} onChange={onChange} Type={"password"} Name={"password"} />
                    <P Id={"error password"} text={errors["password"]} />
                    <InfoBox Text={lang["CONFIRM_PASSWORD"]} Class={"user-info re-password"} onChange={onChange} Type={"password"} Name={"re-password"} />
                    <P Id={"error re-password"} text={errors["re-password"]} />

                    <div className="user-infoBox">
                        <ReCAPTCHA
                            sitekey="6Ld0rzMpAAAAAKtLkin6Qeg2r0tdw3LIsPJIP6Hn"
                            onChange={(val) => setCapVal(val)}
                        />
                        <P Id={"error captcha"} text={errors["captcha"]} />
                    </div>
                    <P Id={"error global"} text={errors["global"]} />
                    <div className="footer-sign">
                        <p>{lang["ALREADY_HAVE_ACCOUNT"]}, <A Class={"sign-link"} Link={"sign-in"} text={lang["SIGN_IN_IN_SIGNUP_PAGE"]}/> </p>
                    </div>
                    <Button Class={"login-btn btn"} text={lang["CREATE_ACCOUNT_BTN"]} />
                </label>
            </form>
        </>
    )
}

