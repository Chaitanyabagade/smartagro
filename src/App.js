
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import { useEffect, useState } from 'react';
import Login from './Components/Login';
import Cookies from 'js-cookie';
import Signup from './Components/Signup';
import AboutUs from './Components/AboutUs';
import Contact from './Components/Contact';
import Blog from './Components/Blog';
import SideBar from './Components/SideBar';
import SideBarMenu from './Components/SideBarMenu';
import Hpannel from './Components/Hpannel';
function App() {
  const [loged, setLoged] = useState(0);
  useEffect(() => {
    if (Cookies.get('email') && Cookies.get('userId')) {
      setLoged(1);
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        {!loged ?
          <>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home></Home>} />
              <Route path="/Login" element={<Login></Login>} />
              <Route path="/Signup" element={<Signup></Signup>} />
              <Route path="/Aboutus" element={<AboutUs></AboutUs>} />
              <Route path="/Contact" element={<Contact></Contact>} />
              <Route path="/Blogs" element={<Blog></Blog>} />
            </Routes>
            <Footer />


            
          </>
          : <>
            <SideBar />
            <SideBarMenu />
            <Hpannel/>   {/** It contain all routes of loged in user */}
          
          </>
        }

      </BrowserRouter>
    </div>
  );
}

export default App;
