import { useNavigate } from 'react-router-dom';

import reactLogo from '../assets/react.svg';

import "./UserComponent.css";

interface Props {
    nick: string
}

export function UserComponent ({ nick } : Props) {
    const navigate = useNavigate();

    return (
        <div className="user-info" onClick={() => navigate(`/users/${nick}`)} >
            <img src={reactLogo} />
            <span className="user-info-nick">{ nick }</span>
        </div>
    );
}