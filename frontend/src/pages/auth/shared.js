
import Video from "../../styles/assets/green-blue-background.mp4"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Auth = ({page, isAuthenticated, setAuthenticated}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/dashboard");
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div className="showcase">
            <div className="video-container">
                <video src={Video} autoPlay muted loop id="video-background"></video>
            </div>
            <div className="login-container">
                {page}
            </div>
        </div>
    )
}