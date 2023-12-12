import './styles/css/style.css';
import {Auth} from "./pages/auth/shared"
import {SignIn} from "./pages/auth/sign-in"
import {SignUp} from "./pages/auth/sign-up"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Error = () => {
  return(
    <div>
      <h1 style={{ color: 'black' }}>Error 404</h1>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Auth page={<SignIn/>} />} />

          <Route path='sign-in' element={<Auth page={<SignIn/>} />} />
          <Route path='sign-up' element={<Auth page={<SignUp/>} />} />

          <Route path='*' element={<Error/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
