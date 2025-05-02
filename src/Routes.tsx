import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { JSX } from "react";

import { LoginService } from "./services/LoginService";

import { CreatePost } from './pages/CreatePost';
import { Home } from './pages/Home';
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
                        <Home />
                    </PrivateRoute>
                } />

                <Route path="/post/create" element={
                    <PrivateRoute >
                        <CreatePost />
                    </PrivateRoute>
                } />


                <Route path="/login" element={<Login />} />
                <Route path="/cadastrar" element={<CadastroUsuario />} />
            </Routes>
        </BrowserRouter>
    );
}