import './styles/css/style.css';
import {Auth} from "./pages/auth/shared"
import {SignIn} from "./pages/auth/sign-in"
import {SignUp} from "./pages/auth/sign-up"
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
    localStorage.setItem('isAuthenticated', isAuthenticated);
    console.log(isAuthenticated)
  }, [isAuthenticated])
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Auth page={<SignIn isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated}/>} />} />

          <Route path='sign-in' element={<Auth page={<SignIn isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />} />} />
          <Route path='sign-up' element={<Auth page={<SignUp isAuthenticated={isAuthenticated} />} />} />

          <Route path='*' element={<Error/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
