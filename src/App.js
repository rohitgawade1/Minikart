import "./App.css";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
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

  const RequiredAuth = () => {
    let Auth = sessionStorage.getItem("Auth")
    const location = useLocation()
    if (!Auth) {
      return <Navigate to="/" state={{ from: location }} />
    }
    return <Outlet />
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route exact element={<RequiredAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
