import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CreatePost } from '../pages/CreatePost';

export const FeedRoute  = [
    <Route path="" element={<Navigate to="/" />} />,
    <Route path="create" element={<CreatePost />} />,
    <Route path="edit/:uuid" element={<CreatePost />} />
];