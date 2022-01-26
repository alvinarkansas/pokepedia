import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import MyPokemon from "./pages/MyPokemon";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/" element={<Explore />} />
          <Route path=":name" element={<Detail />} />
          <Route path="my-pokemon" element={<MyPokemon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
