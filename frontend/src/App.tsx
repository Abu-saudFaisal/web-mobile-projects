import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import V60Calculator from "./pages/V60Calculator";
import Recipes from "./pages/Recipes";
import Cafes from "./pages/Cafes";
import ReviewsBloom from "./pages/Reviews";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<V60Calculator />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/cafes" element={<Cafes />} />
          <Route path="/reviews" element={<ReviewsBloom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;