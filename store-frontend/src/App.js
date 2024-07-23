import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/SignupForm';
import Login from './components/LoginForm';



function App() {
  return (
    <div className="App">
        <Navbar/>
        <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    </div>
  );
}


export default App;
