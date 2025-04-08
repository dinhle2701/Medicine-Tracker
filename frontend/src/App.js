import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from '../src/page/Login/Login.jsx'
import Register from '../src/page/Register/Register.jsx';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
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
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
