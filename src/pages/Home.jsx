import { useEffect, useState } from "react";
import { tmdbApi } from "../services/tmdb";
import MediaCard from "../components/movie/MediaCard";

import style from "./Home.module.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [moviesData, seriesData] = await Promise.all([
          tmdbApi.getPopularMovies(),
          tmdbApi.getPopularSeries(),
        ]);
        setMovies(moviesData);
        setSeries(seriesData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    loadData();
  }, []);

  return (
    <main className={`container ${style.main}`}>
      <section>
        <h2>Popular movie</h2>
        <div className="grid">
          {movies.map((movie) => (
            <MediaCard key={movie.id} item={movie} type="movie" />
          ))}
        </div>
      </section>

      <section>
        <h2>Popular series</h2>
        <div className="grid">
          {series.map((item) => {
            return <MediaCard key={item.id} item={item} type="tv" />;
          })}
        </div>
      </section>

      <section>
        <h2>Trends</h2>
      </section>
    </main>
  );
}

export default Home;
