import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import AdminSignin from './pages/AdminSignin'
import AdminSignup from './pages/AdminSignup'
import UserSignin from './pages/UserSignin'
import UserSignup from './pages/UserSignup'
import AdminCourses from './pages/AdminCourses'
import CreateCourse from './pages/CreateCourse'
import UpdateCourse from './pages/UpdateCourse'
import MyPurchases from './pages/MyPurchases'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admin/signin" element={<AdminSignin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/create-course" element={<CreateCourse />} />
            <Route path="/admin/update-course/:id" element={<UpdateCourse />} />
            <Route path="/user/signin" element={<UserSignin />} />
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/user/purchases" element={<MyPurchases />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

