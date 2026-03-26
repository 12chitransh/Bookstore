import { CartProvider, useCart } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import { BooksProvider } from './contexts/BooksContext';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import Navbar from './components/navbar';
import Banner from './components/banner';
import Footer from './components/footer';
import Courses from './components/courses';
import Cart from './components/cart';
import MyBooks from './components/MyBooks';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

function AppContent() {
  const { isCartOpen } = useCart();
  const { isLoginOpen, isSignupOpen, isDarkMode, isMyBooksOpen } = useAuth();
  const { isAdminLoggedIn, adminToken } = useAdmin();

  // Show admin login if accessing admin without token
  if (!adminToken && window.location.pathname === '/admin') {
    return <AdminLogin />;
  }

  // Show admin dashboard if logged in as admin
  if (adminToken && window.location.pathname === '/admin') {
    return <AdminDashboard />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar />
      {isCartOpen ? (
        <Cart />
      ) : isMyBooksOpen ? (
        <MyBooks />
      ) : (
        <>
          <Banner />
          <Courses />
          <Footer />
        </>
      )}
      {isLoginOpen && <Login />}
      {isSignupOpen && <Signup />}
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <AuthProvider>
        <BooksProvider>
          <SearchProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </SearchProvider>
        </BooksProvider>
      </AuthProvider>
    </AdminProvider>
  );
}

export default App;