import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/AuthPages/Login';
import Register from './pages/AuthPages/Register';
import Dashboard from './pages/Dashboard';
import Public from './pages/Public';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path="/:username" element={<Public />} />
      </Routes>
    </Router>
  )
}

export default App
