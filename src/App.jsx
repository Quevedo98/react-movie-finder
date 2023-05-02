import { useCallback, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
  // API KEY http://www.omdbapi.com/?i=tt3896198&apikey=fc1510b2

  // const inputRef = useRef();
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //vanilla js with many inputs
  // const fields = Object.fromEntries(new window.FormData(event.target));
  // console.log(fields);

  //Handle a field value using useRef, wich means that is uncontrolled
  // const inputElementValue = inputRef.current.value;
  // console.log(inputElementValue);
  // };
  const [sort, setSort] = useState(false);
  const { search, error, updateSearch } = useSearch();
  const { movies, getMovies } = useMovies({ search, sort });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 400),
    []
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };
  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);

    // getMovies({search: newSearch})
    debouncedGetMovies(newSearch);
  };
  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Movie finder</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="movieName"
            value={search}
            onChange={handleChange}
            placeholder="Avengers, Matrix, Transformers ..."
          />
          <input
            type="checkbox"
            name="orderCheck"
            onChange={handleSort}
            checked={sort}
          />
          <button>Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
