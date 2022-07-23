
import './App.css'
import MyRoutes from './routes/routes'
import SideBar from "./components/SideBar";
import { useLocation } from 'react-router-dom';
function App() {
  const location = useLocation();
  return (
    <SideBar location={location}>
      <MyRoutes />
    </SideBar>
  )
}

export default App
