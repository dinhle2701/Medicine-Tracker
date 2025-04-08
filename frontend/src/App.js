import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from '../src/page/Login/Login.jsx'
import Register from '../src/page/Register/Register.jsx';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
