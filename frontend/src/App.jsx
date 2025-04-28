import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/auth/Home'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import ForgetPassword from './components/auth/forget-passwird/ForgetPassword'
import CodeVerification from './components/auth/forget-passwird/CodeVerification'
import SetNewPassword from './components/auth/forget-passwird/SetNewPassword'
import Cart from './pages/cart/Cart'
import Notifications from './pages/notifications/Notifications'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateProducts from './pages/admin/CreateProducts'
import AllProducts from './pages/admin/AllProducts'
import GetAllUsers from './pages/admin/GetAllUsers'
import UsersActivity from './pages/admin/UsersActivity'
import DeleteAccount from './pages/admin/DeleteAccount'
import GetOrders from './pages/admin/GetOrders';
import Profile from './pages/profile/Profile';
import SingleProduct from './pages/products/SingleProduct'
import NewProducts from './components/products/NewProducts'
import Products from './pages/products/Products';
import ProductReviews from './pages/products/ProductReviews'
import ReviewForm from './pages/products/ReviewForm'
import CategoryProduct from './components/products/CategoryProduct'
import OrderHistory from './pages/orders/OrderHistory'
import WishList from './pages/wishlist/WishList'
import TermsAndConditions from './pages/termAndsecurity/TermsAndConditions'
import PrivacyPolicy from './pages/termAndsecurity/PrivacyPolicy'
import ReturnPolicy from './pages/termAndsecurity/ReturnPolicy '
import ContactUs from './pages/contact/ContactUs'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/verify-code' element={<CodeVerification />} />
        <Route path='/reset-password' element={<SetNewPassword />} />

        <Route path='/cart' element={<Cart />} />
        <Route path='/notification' element={<Notifications />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/products/new' element={<NewProducts />} />
        <Route path="/category/:categoryName" element={<CategoryProduct />} />
        <Route path="/orders/:userId" element={<OrderHistory />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/terms-condition" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/contact" element={<ContactUs />} />





        <Route path='/dashboard' element={<AdminDashboard />}>
          <Route path='create-product' element={<CreateProducts />} />
          <Route path='all-products' element={<AllProducts />} />
          <Route path='all-users' element={<GetAllUsers />} />
          <Route path='users-activity' element={<UsersActivity />} />
          <Route path='Orders' element={<GetOrders />} />
          <Route path='delete-account' element={<DeleteAccount />} />
          <Route path='profile' element={<Profile />} />
        </Route>


      </Routes>
    </Router>
  )
}

export default App
