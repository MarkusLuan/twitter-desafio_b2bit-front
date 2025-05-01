import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { JSX } from "react";

import { LoginService } from "./services/LoginService";

import { Login } from './pages/Login';
import { CadastroUsuario } from './pages/CadastroUsuario';

const login_service = new LoginService();

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return login_service.isLogado ? children : <Navigate to="/login" />;
};

export function AppRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute >
                        <div>Tteste de login</div>
                    </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastrar" element={<CadastroUsuario />} />
            </Routes>
        </BrowserRouter>
    );
}