import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./page/Homepage/Home";
import Upload from "./page/Resumeupload/Upload";
import Footer from "./components/Navbar/Footer";
import Signin from "./page/auth/Signin";
import Signup from "./page/auth/Signup";
import PrivateRoutes from "./Privateroute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
          <Route
            path="/upload"
            element={
              <PrivateRoutes>
                <Upload />
              </PrivateRoutes>
            }
          />

          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
