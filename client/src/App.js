import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register';
import Private from './Components/Privateroutes/Private';
import Addp from './Pages/AddCerti';
import Land from '../src/Pages/Land';
import Navbar from './Components/Navbar/Navbar'
// import Cart from './Pages/Cart';
import StudentList from './Pages/Teacher/StudentList.jsx';
import Shome from './Pages/Shome';
import RequestDoc from './Pages/Teacher/RequestDoc.jsx';
import TeacherHome from './Pages/Teacher/TeacherHome.jsx';



const App = () => {

  return (
    <>

      <Router>

        <ToastContainer />
        <Navbar />
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route path="/" element={<Private />} >
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<Addp />} />

            <Route path="/studentList" element={<StudentList />} />
            <Route path="/thome" element={<TeacherHome />} />


            <Route path="/shome" element={<Shome />} />
            <Route path="/request" element={<RequestDoc />} />
          </Route>
        </Routes>
      </Router>

    </>


  )
}

export default App