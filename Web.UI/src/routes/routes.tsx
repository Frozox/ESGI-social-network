import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ChatPage from "../pages/ChatPage";
import UserProfilePage from "../pages/UserProfilePage";
import AdminPage from "../pages/Admin/AdminPage";
import AdminLogPage from "../pages/Admin/AdminLogPage";
import NotFoundPage from "../pages/NotFoundPage";
import WarningManagerPage from "../pages/Admin/WarningManagerPage";
import { useStoreContext } from "../utils/context/StoreContext";

interface RequireAuthenticationProps {
    otherwise: string;
    condition: boolean;
    children: JSX.Element;
}

const OnlyWhen = ({ condition, otherwise, children }: RequireAuthenticationProps) => {
    return condition ? children : <Navigate to={otherwise} />;
};

const MyRoutes = () => {
    const { state: { auth: { isAuthenticated }, myUser: { isAdmin } } } = useStoreContext();
    return (
        <Routes>
            <Route path="/login" element={<OnlyWhen condition={!isAuthenticated} otherwise="/"><LoginPage /></OnlyWhen>} />
            <Route path="/" element={<OnlyWhen condition={true} otherwise="/login"><LoginPage /></OnlyWhen>} />
            <Route path="/register" element={<OnlyWhen condition={!isAuthenticated} otherwise="/login"><RegisterPage /></OnlyWhen>} />
            <Route path="/admin" element={<OnlyWhen condition={isAdmin} otherwise="/chat"><AdminPage /></OnlyWhen>} />
            <Route path="/admin/logs" element={<OnlyWhen condition={isAdmin} otherwise="/chat"><AdminLogPage /></OnlyWhen>} />
            <Route path="/admin/avertissements" element={<OnlyWhen condition={isAdmin} otherwise="/chat"><WarningManagerPage /></OnlyWhen>} />
            <Route path="/chat/:id" element={<OnlyWhen condition={isAuthenticated} otherwise="/chat"><ChatPage /></OnlyWhen>} />
            <Route path="/chat" element={<OnlyWhen condition={isAuthenticated} otherwise="/login"><ChatPage /></OnlyWhen>} />
            <Route path="/profile" element={<OnlyWhen condition={isAuthenticated} otherwise="/login"><UserProfilePage /></OnlyWhen>} />
            <Route path="/404" element={<NotFoundPage />} />
        </Routes>
    )
}

export default MyRoutes