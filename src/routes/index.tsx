import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { JSX } from "react";

import { LoginService } from "../services/LoginService";

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { CadastroUsuario } from '../pages/CadastroUsuario';
import { UserInfo } from '../pages/UserInfo';

import { FeedRoute } from "./FeedRoute";

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

                <Route path="/users/:nick_user" element={
                    <PrivateRoute >
                        <UserInfo />
                    </PrivateRoute>
                } />

                <Route path="/feed" element={
                    <PrivateRoute >
                        <Outlet />
                    </PrivateRoute>
                } >{ FeedRoute }</Route>


                <Route path="/login" element={<Login />} />
                <Route path="/cadastrar" element={<CadastroUsuario />} />
            </Routes>
        </BrowserRouter>
    );
}