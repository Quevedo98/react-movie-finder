const API_KEY = "fc1510b2";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const request = await fetch(
      `http://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
    );
    const response = await request.json();

    const movies = response.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (error) {
    return new Error('Error searching movies')
  }
};
