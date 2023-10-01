import "./App.css";
import React, { lazy, Suspense } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter,Navigate, Routes, Route } from "react-router-dom";
import SongUpload from "./pages/SongUpload";
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const PasswordReset = lazy(() => import("./pages/PasswordReset"));
const Home = lazy(() => import("./pages/Home.jsx"));

function App() {
  const [cookie,] = useCookies(["userId"]);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div className="h-screen w-screen bg-black"></div>}>
          {cookie.userId ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/uploadSong" element={<Home />} />
              <Route path="/uploadAlbum" element={<Home />} />
              <Route path="/search" element={<Home />} />
              <Route path="/playlist/:id" element={<Home />} />
              <Route path="/artist" element={<Home />} />
              <Route path="/track" element={<Home />} />
              <Route path="/section/:id" element={<Home />} />
              <Route path="/song" element={<SongUpload />} />
              <Route path="/login" element={<Navigate to="/" />} /> {/* Redirect to home */}
              <Route path="/register" element={<Navigate to="/" />} /> {/* Redirect to home */}
              <Route path="/collection" element={<Home />} />
           
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/playlist/:id" element={<Home />} />
            
              <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home */}
            </Routes>
          )}
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
