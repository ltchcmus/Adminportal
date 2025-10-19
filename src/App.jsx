import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import PricingSection from './components/PricingSection'
import Footer from './components/Footer'
import PaymentSuccess from './components/PaymentSuccess'
import PaymentError from './components/PaymentError'
import './App.css'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route 
            path="/adminpanel" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-error" element={<PaymentError />} />
          <Route path="/payment-callback" element={<PaymentSuccess />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
