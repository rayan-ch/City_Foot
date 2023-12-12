import { InfoBox } from "../../components/infoBox"
import { Button, A, P } from "../../components/base"
import { useState } from "react"


export const SignUp = () => {
    const [auths, setAuths] = useState({})
    const onChange = (e) => setAuths({...auths, [e.target.name]:e.target.value})

    function onSubmit(e) {
        e.preventDefault()
        console.log(auths)
    }
    return (
        <>
            <h2 className="Sign-txt">SIGN UP</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="sign-up">
                    <InfoBox Text={"Username"} Class={"user-info"} onChange={onChange} Type={"text"} Name={"username"}/>
                    <InfoBox Text={"Email"} Class={"user-info"} onChange={onChange} Type={"email"} Name={"email"} />
                    <InfoBox Text={"Password"} Class={"user-info"} onChange={onChange} Type={"password"} Name={"password"} />
                    <InfoBox Text={"Confirm Password"} Class={"user-info"} onChange={onChange} Type={"password"} Name={"re-password"} />
                    <div className="footer-sign">
                        <P Id={"error"} text={"Email or password incorrect"} />
                        <p>Already in city foot ?, <A Class={"sign-link"} Link={"sign-in"} text={" Sign-in"}/> </p>
                    </div>
                    <Button Class={"login-btn btn"} text={"Create"} />
                    <A Class={"other-ways btn"} Link={"#google"} icone={"bx bxl-google"} text={"Google"} />
                    <A Class={"other-ways btn"} Link={"#facebook"} icone={"bx bxl-facebook-circle"} text={"Facebook"} />
                </label>
            </form>
        </>
    )
}

