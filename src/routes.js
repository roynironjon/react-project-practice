import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header'; // Ensure 'Header.jsx' exists in 'src/components/'
import Footer from './components/footer'; // Ensure 'Footer.jsx' exists in 'src/components/'
import Home from './pages/home'; // Ensure 'Home.jsx' exists in 'src/pages/'


const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
