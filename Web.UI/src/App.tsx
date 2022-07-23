
import './App.css'
import MyRoutes from './routes/routes'
import SideNav from "./components/SideBar";
function App() {
  return (
    <div className="flex">
      <SideNav />
      <MyRoutes />
    </div>
  )
}

export default App
