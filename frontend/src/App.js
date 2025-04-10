import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from '../src/page/Login/Login.jsx'
import Register from '../src/page/Register/Register.jsx';
import { ToastContainer } from 'react-toastify';
import UserDashboard from './components/Dashboard/UserDashboard.jsx';
import Info from './components/User/Info/Info.jsx';
import Medicine from './components/User/Medicine/Medicine.jsx';
import { UserProvider } from './context/UserContext'; // đường dẫn đúng theo project bạn


function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* <UserDashboard/> */}
          <Routes>
            <Route path='/' element={<UserDashboard />}>
              <Route path='/' element={<Home />} />
              <Route path='/infor' element={<Info />} />
              <Route path='/medicine' element={<Medicine />} />
            </Route>



            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
