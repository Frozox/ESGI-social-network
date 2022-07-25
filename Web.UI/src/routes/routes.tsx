import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ChatPage from "../pages/ChatPage";
import FriendPage from "../pages/FriendPage";
import AdminPage from "../pages/Admin/AdminPage";
import AdminLogPage from "../pages/Admin/AdminLogPage";
import AdminAnalyticsPage from "../pages/Admin/AdminAnalyticsPage";

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
            <Route path="/friend" element={<OnlyWhen condition={true} otherwise="/Friend"><FriendPage /></OnlyWhen>} />
            <Route path="/admin" element={<OnlyWhen condition={true} otherwise="/chat"><AdminPage /></OnlyWhen>} />
            <Route path="/admin/logs" element={<OnlyWhen condition={true} otherwise="/chat"><AdminLogPage /></OnlyWhen>} />
            <Route path="/admin/analytics" element={<OnlyWhen condition={true} otherwise="/chat"><AdminAnalyticsPage /></OnlyWhen>} />
        </Routes>
    )
}

export default MyRoutes