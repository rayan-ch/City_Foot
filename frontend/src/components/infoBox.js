import {P, Input} from "./base"

export const InfoBox = ({Text, Class, Type, Name, Id, onChange}) => {
    return(
        <div className="user-infoBox">
            <P text={Text} />
            <Input Class={Class} PlaceHolder={Text} Type={Type} Name={Name} onChange={onChange} Id={Id} />
        </div> 
    )
}

