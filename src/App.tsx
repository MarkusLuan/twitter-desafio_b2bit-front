import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { CadastroUsuario } from './pages/CadastroUsuario';
import './App.css'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<CadastroUsuario />} />
    </Routes>
  </BrowserRouter>
}

export default App
