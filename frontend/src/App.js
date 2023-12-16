import './styles/css/style.css';
import {Auth} from "./pages/auth/shared"
import {SignIn} from "./pages/auth/sign-in"
import {SignUp} from "./pages/auth/sign-up"
import {Dashboard} from "./pages/dashboard/shared"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Error = () => {
  return(
    <div>
      <h1 style={{ color: 'black' }}>Error 404</h1>
    </div>
  )
}

function App() {
  const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  useEffect(() => {
    if (isAuthenticated === true) {
      localStorage.setItem('isAuthenticated', 'true');
      console.log("connected")
    } else {
      localStorage.setItem('isAuthenticated', 'false');
      console.log("disconnect")
    }
  }, [isAuthenticated])
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Auth page={<SignIn isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated}/>} isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />} />

          <Route path='sign-in' element={<Auth page={<SignIn isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />} isAuthenticated={isAuthenticated} />} />
          <Route path='sign-up' element={<Auth page={<SignUp isAuthenticated={isAuthenticated} />} isAuthenticated={isAuthenticated} />} />
          <Route path='dashboard' element={<Dashboard isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />} />

          <Route path='*' element={<Error/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
