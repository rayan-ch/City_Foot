import './styles/css/style.css';
import {Auth} from "./pages/auth/shared"
import {SignIn} from "./pages/auth/sign-in"
import {SignUp} from "./pages/auth/sign-up"
import {Dashboard} from "./pages/dashboard/shared"
import { Lang } from './Lang';
import { Error } from './pages/error';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import en from './locales/en.json'
import fr from './locales/fr.json'
import ar from './locales/ar.json'


function App() {
  const autorised_lang = ["en", "fr", "ar"]
  const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [lang, setLang] = useState("en")
  const [text, setText] = useState({})
  const LoadLang = async () => {
    if (!autorised_lang.includes(lang)) {
      setLang("en");
    }

    // Chargez le fichier JSON en fonction de la langue
    let translations;
    switch (lang) {
      case 'en':
        translations = en;
        break;
      case 'fr':
        translations = fr;
        break;
      case 'ar':
        translations = ar;
        break;
      default:
        translations = en; // Langue par défaut si la langue n'est pas reconnue
    }

    setText(translations);
    console.log(translations);
  };

  useEffect(() => {
    LoadLang();
  }, [lang]); // Déclencher le chargement des traductions lorsque la langue change

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
    <Lang value={text}>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route index element={<Auth page={<SignIn isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated}/>} isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />} />

            <Route path='sign-in' element={<Auth page={<SignIn isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />} isAuthenticated={isAuthenticated} />} />
            <Route path='sign-up' element={<Auth page={<SignUp isAuthenticated={isAuthenticated} />} isAuthenticated={isAuthenticated} />} />
            <Route path='dashboard' element={<Dashboard isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />} />

            <Route path='*' element={<Error page={"Error 404"}/>} />
          </Routes>
        </BrowserRouter>
        
      </div>
    </Lang>
  );
}

export default App;
