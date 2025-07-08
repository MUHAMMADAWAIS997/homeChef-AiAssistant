import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import ShoppingList from './pages/ShoppingList';
import MealPlanner from './pages/MealPlanner';
import Assistant from './pages/Assistant';
import AuthState from './context/Auth context/AuthState';
import WishState from './context/wishlist/wishState';
import { ToastContainer } from 'react-toastify';
import WishList from './components/wish-cart/Wishlist';
import { useState } from 'react';

function App() {
  const [showFav,setShowFav]=useState(true)
  return (
    <WishState>
    <AuthState>
      <Router>
        <Navbar />
        <ToastContainer pauseOnHover={false} autoClose={1000}/>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/recipes' element={<Recipes />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/about' element={<About />}></Route>
          <Route exact path='/shoplist' element={<ShoppingList />}></Route>
          <Route exact path='/mealplan' element={<MealPlanner />}></Route>
          <Route exact path='/assistant' element={<Assistant />}></Route>
          <Route exact path='/wishlist' element={<WishList isOpen={showFav} onClose={()=>setShowFav(false)} />}></Route>

        </Routes>
        <Footer />
      </Router></AuthState></WishState>
  );
}

export default App;
