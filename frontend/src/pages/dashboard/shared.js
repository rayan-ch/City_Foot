import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Dashboard = ({page, isAuthenticated, setAuthenticated}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/sign-in");
        } else {
            setAuthenticated(false)
        }
        // eslint-disable-next-line
    }, []);
    return (
        <>

        </>
    )

}