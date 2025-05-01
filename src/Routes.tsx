import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from './pages/Login';
import { CadastroUsuario } from './pages/CadastroUsuario';

export function AppRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastrar" element={<CadastroUsuario />} />
            </Routes>
        </BrowserRouter>
    );
}