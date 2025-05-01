import { useState } from 'react'
import { ApiService } from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import '../App.css'

export function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [dtNascimento, setDtNascimento] = useState('1980-01-01');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [senha, setSenha] = useState('');

  const [isCarregando, setIsCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const api = new ApiService();
  const navigate = useNavigate();

  const cadastrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCarregando(true);

    let res = api.cadastrarUsuario(nome, usuario, dtNascimento, email, bio, senha);
    res.then(r => {
        navigate("/login");
    }).catch(r => {
        setErro(r.response.data.texto);

        console.log(r)
    }).finally(() => {
        setIsCarregando(false);
    });
  };

  return (
    <form id="form_login" method="post" action="#" onSubmit={cadastrar} className="bg-white p-8 rounded shadow-md" style={{
        width: '80vw'
    }} >
        <h2 className="mb-4">Faça seu Cadastro</h2>

        <div className='row g-4'>
            <div className="form-group col">
                <label htmlFor="inpt_nome" className="form-label" >Nome Completo</label>
                <input
                    id="inpt_nome"
                    type="text"
                    placeholder="Nome Completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="form-control w-full p-2 border rounded mb-4"
                    required
                />
            </div>

            <div className="form-group col-4">
                <label htmlFor="inpt_nick" className="form-label" >Nickname</label>
                <input
                    id="inpt_nick"
                    type="text"
                    placeholder="Nickname"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="form-control w-full p-2 border rounded mb-4"
                    required
                />
            </div>
        </div>

        <div className='row g-4'>
            <div className="form-group col-3">
                <label htmlFor="inpt_dt_nascimento" className="form-label" >Data de Nascimento</label>

                <input
                    id="inpt_dt_nascimento"
                    type="date"
                    placeholder="Nome de usuário"
                    value={dtNascimento}
                    onChange={(e) => setDtNascimento(e.target.value)}
                    className="form-control w-full p-2 border rounded mb-4"
                    required
                />
            </div>

            <div className="form-group col">
                <label htmlFor="inpt_email" className="form-label" >e-Mail</label>
                <input
                    id="inpt_email"
                    type="email"
                    placeholder="e-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
        </div>

        <div className="form-group col">
            <label htmlFor="inpt_bio" className="form-label" >Bio</label>

            <textarea
                id="inpt_bio"
                placeholder="Biografia"
                value={bio}
                className="form-control w-full p-2 border rounded mb-4"
                onChange={(e) => setBio(e.target.value)} />
        </div>

        <div className='d-flex'>
            <button
                type="submit"
                className="w-full text-white p-2 rounded hover:bg-blue-600 m-auto"
                disabled={isCarregando}
            >
                Cadastrar
            </button>
        </div>

        { isCarregando &&
            <div className="spinner-border text-primary mt-4 mb-auto" role="status">
                <span className="visually-hidden">Carregando...</span>
            </div>
        }
        {erro && <p className="mt-4 text-danger">{erro}</p>}
    </form>
  );
}
