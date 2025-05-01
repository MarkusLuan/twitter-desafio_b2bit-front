import { useState } from 'react'
import { ApiService } from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import '../App.css'

export function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [isCarregando, setIsCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const api = new ApiService();
  const navigate = useNavigate();

  const fazer_login = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCarregando(true);

    let res = api.autenticar(usuario, senha);
    res.then(r => {
        console.log(r);
    }).catch(r => {
        setErro("Erro no login");

        console.log(r)
    }).finally(() => {
        setIsCarregando(false);
    });
  };

  return (
    <form id="form_login" method="post" action="#" onSubmit={fazer_login} className="bg-white p-8 rounded shadow-md" >
        <h2 className="mb-4">Login</h2>

        <div className="form-group col">
            <label htmlFor="inpt_user" className="form-label" >Login ou e-mail</label>
            <input
                id="inpt_user"
                type="text"
                placeholder="E-mail ou nome de usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="form-control w-full p-2 border rounded mb-4"
                required
            />
        </div>

        <div className="form-group col" >
            <label htmlFor="inpt_senha" className="form-label" >Senha</label>
            <input
                id="inpt_senha"
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="form-control w-full p-2 border rounded mb-4"
                required
            />
        </div>

        <div className='d-flex'>
            <button
                type="submit"
                className="w-full text-white p-2 rounded hover:bg-blue-600 m-auto"
                disabled={isCarregando}
            >
                Entrar
            </button>

            <button
                type="button"
                className="w-full text-white p-2 rounded hover:bg-blue-600 m-auto"
                onClick={() => navigate('/cadastrar')}
                disabled={isCarregando}
            >
                Cadastrar
            </button>

            { isCarregando &&
                <div className="spinner-border text-primary mt-auto mb-auto" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
            }
        </div>
        {erro && <p className="mt-4 text-danger">{erro}</p>}
    </form>
  );
}
