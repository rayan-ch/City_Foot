import { InfoBox } from "../components/infoBox"
import { Input, A } from "../components/base"
import Video from "../styles/assets/green-blue-background.mp4"

export const Login = () => {
    return (
        <div className="showcase">
            <div className="video-container">
                <video src={Video} autoPlay muted loop id="video-background"></video>
            </div>
            <div className="login-container">
                <h2 className="Sign-in-txt">SIGN IN</h2>
                <form>
                    <label for="sign-in">
                        <InfoBox Text={"Username"} Class={"user-info"} Type={"text"} Name={"username"} Id={"sign-in"} />
                        <InfoBox Text={"Password"} Class={"user-info"} Type={"password"} Name={"password"} Id={"sign-in"} />
                        <div className="forget-sign">
                            <A Class={"forgot"} Link={"Sign-up"} text={"Forget password"}/>
                        </div>

                        <Input Class={"login-btn btn"} Type={"submit"} Value={"Login"} Id={"sign-in"} />
                        <A Class={"other-ways btn"} Link={"#google"} icone={"bx bxl-google"} text={"Google"} />
                        <A Class={"other-ways btn"} Link={"#facebook"} icone={"bx bxl-facebook-circle"} text={"Facebook"} />
                    </label>
                </form>
            </div>
        </div>
    )
}

