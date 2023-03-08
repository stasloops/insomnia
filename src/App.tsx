import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { storage } from "./helpers/localStorage";
// import { Routes, Route, useLocation } from "react-router-dom";
// import ModelGenerator from "./pages/ModelGenerator";
// import Profile from "./pages/Profile";
// import Works from "./pages/Works";
// import { storage } from "./helpers/localStorage";
// import StartedPage from "./pages/StartedPage";
// import Gradio from "./pages/Gradio";
// import ContentGenerator from "./pages/ContentGenerator";
// import Billing from "./pages/Billing";
// import FAQ from "./pages/FAQ";
// import ImageGenerator from "./pages/ImageGenerator";
// import WaitList from "./pages/WaitList";
// import ImageToImage from "./pages/ImageToImage";

interface IUserContext {
  user: {};
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const UserContext = createContext<IUserContext | null>(null);

function App() {
  const boolean = storage.get("token") ? true : false;
  const [isAuth, setIsAuth] = useState<boolean>(boolean);
  const user = {};

  return (
    <div className="App">
      <UserContext.Provider value={{ user, isAuth, setIsAuth }}>
        <Header />
        <Routes>
          {/* <Route path="/" element={<StartedPage />} />
          <Route path="/ru" element={<StartedPage />} />

          <Route path="/image" element={<ImageGenerator />} />
          <Route path="/image/ru" element={<ImageGenerator />} />

          <Route path="/image2image" element={<ImageToImage />} />
          <Route path="/image2image/ru" element={<ImageToImage />} />


          <Route path="/content" element={<ContentGenerator />} />
          <Route path="/model" element={<ModelGenerator />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/works" element={<Works />} />
          <Route path="/control" element={<Gradio />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/wait/:id" element={<WaitList />} /> */}
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
