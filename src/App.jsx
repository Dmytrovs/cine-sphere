import style from "./App.module.css";
import { useEffect } from "react";
import { tmdbApi } from "./services/tmdb";

import { BrowserRouter, Routes, Route } from "react-router";

import Header from "./components/Header/Header";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import SeriesDetails from "./pages/SeriesDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<Series />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<SeriesDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
