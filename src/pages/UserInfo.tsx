import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { ApiService } from "../services/ApiService";
import { LoginService  } from "../services/LoginService";

import { UserComponent } from "../componentes";

export function UserInfo() {
  const { nick_user } = useParams<{ nick_user: string }>();
  const [ countSeguidores, setCountSeguidores ] = useState(0);
  const [ countSeguindo, setCountSeguindo ] = useState(0);

  const api = new ApiService();
  const loginService = new LoginService();
  const navigate = useNavigate();

  const getUserInfo = () => {
    const res = api.getUserInfo(loginService.userToken!, nick_user!);
    res.then(r => {
        const res = r.data;
        setCountSeguidores(res.count_seguidores);
        setCountSeguindo(res.count_seguindo);
    }).catch(() => {
        navigate("/");
    });
  };

  const followUser = () => {
    const res = api.follow(loginService.userToken!, nick_user!);
    res.then(() => {
        setCountSeguidores(countSeguidores+1);
    });
  };

  const unfollowUser = () => {
    const res = api.unfollow(loginService.userToken!, nick_user!);
    res.then(() => {
        setCountSeguidores(countSeguidores+1);
    });
  };

  useEffect (() => {
    getUserInfo();
  }, []);

  return (
    <div className='d-grid'>
        <UserComponent nick={nick_user!} />
        <span>{countSeguidores} Seguidores</span>
        <span>{countSeguindo} Seguindo</span>
        
        <button 
            type='button'
            className='mt-2'
            onClick={() => {
                followUser()
            }}
        >Seguir</button>

        <button 
            type='button'
            className='mt-2'
            onClick={() => navigate('/') }
        >Voltar</button>
    </div>
  );
}
