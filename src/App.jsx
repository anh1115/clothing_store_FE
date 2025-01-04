import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/scss/styles.scss'
import './styles/App.css'
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Faq from './pages/FAQ/Faq';
import Contact from './pages/Contact/Contact';
import Introduce from './pages/Introduce/Introduce';
import ResultSearch from './pages/ResultSearch/ResultSearch';
import ListProduct from './pages/ListProduct/ListProduct';
import Page404 from './pages/Page404/Page404';
import { CartProvider } from './components/Contexts/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Profile from './pages/Profile/Profile';
import { UserProvider } from './components/Contexts/UserContext';
import OrderStatus from './pages/OrderStatus/OrderStatus';
import VNPay from './pages/VNPay/VNPay';

function App() {

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <HelmetProvider>
        <UserProvider>
          <CartProvider>
            <Router>
              <div className="app">
                <Header />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path='/faq' element={<Faq />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/introduce' element={<Introduce />} />
                    <Route path='/result/:keyword' element={<ResultSearch />} />
                    <Route path='/list-product/:id' element={<ListProduct />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/order-status' element={<OrderStatus />} />
                    <Route path='/vnpay-return' element={<VNPay />}/>
                    <Route path="*" element={<Page404 />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </UserProvider>
      </HelmetProvider>
    </>
  )
}

export default App
