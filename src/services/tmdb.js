export const tmdbApi = {
  API_KEY: import.meta.env.VITE_TMDB_API_KEY,
  BASE_URL: import.meta.env.VITE_TMDB_BASE_URL,
  IMAGE_BASE_URL: import.meta.env.VITE_TMDB_IMAGE_BASE_URL,

  async getPopularMovies () {
    const res = await fetch( `${this.BASE_URL}/discover/movie?api_key=${this.API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)

    const data = await res.json();
    return data.results
  },

  
  async getPopularSeries () {
    const res = await fetch(`${this.BASE_URL}/tv/popular?api_key=${this.API_KEY}&language=en-US&page=1`)

    const data = await res.json();
    return data.results
  }
};

