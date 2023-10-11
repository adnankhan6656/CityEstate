import React from 'react'
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import Signout from './pages/Signout.jsx';
import Profile from './pages/Profile.jsx';
import Header from "./components/Header.jsx";
import About from "./pages/About.jsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/sign-in" element={<SignIn/>}/>
     <Route path="/sign-up" element={<Signout/>}/>
     <Route path="/about" element={<About/>}/>
     <Route element={<PrivateRoute/>}>
     <Route path='/profile' element={<Profile />} />
      </Route>

    </Routes>
    </BrowserRouter>
  )
}
