import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './page/user/Home'
import AdminHome from './page/admin/AdminHome'
import PageNotFound from './components/PageNotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<AdminHome/>} />
        <Route path='/*' element={<PageNotFound/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
