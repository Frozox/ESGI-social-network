import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Dashboard } from "../../components/Dashboard"

const AdminPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    React.useEffect(() => {
        if (location.pathname === "/admin") {
            navigate("/admin/logs")
        }
    }, [location])
    return (
        <div className="h-screen flex w-full">
            <Dashboard />
        </div>
    );
}

export default AdminPage