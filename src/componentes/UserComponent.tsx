import viteLogo from '/vite.svg'

interface Props {
    nick: string
}

export function UserComponent ({ nick } : Props) {
    return (
        <div className="UserInfo" style={{textAlign: "left"}}>
            <img src={viteLogo} />
            <span className="UserInfoNick">{ nick }</span>
        </div>
    );
}