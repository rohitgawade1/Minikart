import "./App.css";
import Cart from "./pages/Cart/Cart";
import  Home  from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from './pages/Login/Login'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchdata() {
      const pr = await fetch(`https://fakestoreapi.com/products/`);
      const data = await pr.json();
      dispatch({ type: "AddMainData", payload: data });
    }
    fetchdata();
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route index element={<Login/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
