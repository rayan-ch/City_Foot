
import Video from "../../styles/assets/green-blue-background.mp4"


export const Auth = ({page}) => {
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