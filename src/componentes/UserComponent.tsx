import reactLogo from '../assets/react.svg';

import "./UserComponent.css";

interface Props {
    nick: string
}

export function UserComponent ({ nick } : Props) {
    return (
        <div className="user-info" style={{textAlign: "left"}}>
            <img src={reactLogo} />
            <span className="user-info-nick">{ nick }</span>
        </div>
    );
}