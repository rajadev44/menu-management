import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dasboard";
import Category from "./pages/category";
import { MenuItem } from "./pages/menu-items";
import { Timing } from "./pages/timing";
import { Orders } from './pages/orders'
import { Login } from './pages/login' 
import { Home } from './pages/home'
import {MainCategory} from './pages/user-categories'
import { MainItems } from "./pages/user-items";
import {IngredientsPage} from './pages/ingredients';
import { useDarkMode } from "./components/ui/dark-mode-btn";
import MenuItemForm from "./components/sections/menu-form";
import MainItemIndividual from "./pages/menu-item-individual"
import CartPage from './pages/cart-page';
import { CartProvider } from "./context/CartContext";

function App() {
  useDarkMode();
  return (
    <CartProvider>

    <BrowserRouter>
      <Routes>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path='/dashboard/login' element={<Login/>}></Route>
          <Route path="/dashboard/categories" element={<Category/>}/>
          <Route path="/dashboard/items" element={<MenuItem/>}/>
          <Route path="/dashboard/items/new" element={<MenuItemForm/>}/>
          <Route path="/dashboard/items/update/:id" element={<MenuItemForm/>}/>
          <Route path="/dashboard/ingredients" element={<IngredientsPage/>}/>
          <Route path="/dashboard/timing" element={<Timing/>}/>
          <Route path="/dashboard/orders" element={<Orders/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/categories" element={<MainCategory/>}/>
          <Route path="/items" element={<MainItems/>}/>
          <Route path="/items/:id" element={<MainItemIndividual/>}/>
          <Route path='/cart' element={<CartPage/>} />

      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
