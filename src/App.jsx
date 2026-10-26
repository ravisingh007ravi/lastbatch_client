import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './page/user/Home';
import AdminHome from './page/admin/AdminHome';
import PageNotFound from './components/PageNotFound';
import Login from './page/user/Login';
import Signup from './page/user/Signup';
import { GoogleAuthProvider } from './context/GoogleLogin';
import { AuthProvider } from './context/AuthData';
import { ThemeProvider } from './context/DarkAndLightMode';

export default function App() {
  return (
    <GoogleAuthProvider>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </GoogleAuthProvider>
  );
}
