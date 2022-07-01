import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

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
            <Route path="/login" element={<OnlyWhen condition={true} otherwise="/Home"><LoginPage /></OnlyWhen>} />
            <Route path="/register" element={<OnlyWhen condition={true} otherwise="/login"><RegisterPage /></OnlyWhen>} />
        </Routes>
    )
}

export default MyRoutes