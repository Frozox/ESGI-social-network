
import './App.css'
import MyRoutes from './routes/routes'
import SideBar from "./components/SideBar";
import { useLocation} from 'react-router-dom';
function App() {
  const location = useLocation();
  return (
    <div className="flex">
      <SideBar location={location}>
        <MyRoutes />
      </SideBar>
    </div>
  )
}

export default App
