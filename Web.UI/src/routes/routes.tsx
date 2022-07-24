import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ChatPage from "../pages/ChatPage";
import AdminPage from "../pages/Admin/AdminPage";
import AdminLogPage from "../pages/Admin/AdminLogPage";
import AdminAnalyticsPage from "../pages/Admin/AdminAnalyticsPage";
import NotFoundPage from "../pages/NotFoundPage";

interface RequireAuthenticationProps {
    otherwise: string;
    condition: boolean;
    children: JSX.Element;
}

const OnlyWhen = ({ condition, otherwise, children }: RequireAuthenticationProps) => {
    return condition ? children : <Navigate to={otherwise} />;
};

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<OnlyWhen condition={true} otherwise="/chat"><LoginPage /></OnlyWhen>} />
            <Route path="/register" element={<OnlyWhen condition={true} otherwise="/login"><RegisterPage /></OnlyWhen>} />
            <Route path="/chat" element={<OnlyWhen condition={true} otherwise="/chat"><ChatPage /></OnlyWhen>} />
            <Route path="/admin" element={<OnlyWhen condition={true} otherwise="/chat"><AdminPage /></OnlyWhen>} />
            <Route path="/admin/logs" element={<OnlyWhen condition={true} otherwise="/chat"><AdminLogPage /></OnlyWhen>} />
            <Route path="/admin/analytics" element={<OnlyWhen condition={true} otherwise="/chat"><AdminAnalyticsPage /></OnlyWhen>} />
            <Route path="/chat/:id" element={<OnlyWhen condition={true} otherwise="/Home"><ChatPage /></OnlyWhen>} />
            <Route path="/chat" element={<OnlyWhen condition={true} otherwise="/Home"><ChatPage /></OnlyWhen>} />
            <Route path="/" element={<OnlyWhen condition={true} otherwise="/login"><LoginPage /></OnlyWhen>} />
            <Route path="/404" element={<NotFoundPage />} />
        </Routes>
    )
}

export default MyRoutes