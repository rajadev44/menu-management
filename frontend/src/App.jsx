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
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path='/dashboard/login' element={<Login/>}></Route>
          <Route path="/dashboard/categories" element={<Category/>}/>
          <Route path="/dashboard/items" element={<MenuItem/>}/>
          <Route path="/dashboard/timing" element={<Timing/>}/>
          <Route path="/dashboard/orders" element={<Orders/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/categories" element={<MainCategory/>}/>
          <Route path="/items" element={<MainItems/>}/>
          
          {/* <Route path="/checkout" element={<Checkout/>}/>
          <Route path='/cart' element={<CartPage/>} />
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard/></ProtectedRoute>}/>
          <Route path="/login" element={<UnProtectedRoute><Login/></UnProtectedRoute>}/>
          <Route path="/sign-up" element={<UnProtectedRoute><SignUp/></UnProtectedRoute>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
