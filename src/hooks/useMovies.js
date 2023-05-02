import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/fetchMovies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const previousSearch = useRef(search);

  //USING USEMEMO
  // const getMovies = useMemo(() => {
  //   return async ({search}) => {
  //     if (search === previousSearch.current) return;
  //     try {
  //       previousSearch.current = search;
  //       const receivedMovies = await searchMovies({ search });
  //       setMovies(receivedMovies);
  //     } catch (error) {
  //       console.log("erro occured");
  //     }
  //   };
  // }, []);

  //USING USECALLBACK
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;
    try {
      previousSearch.current = search;
      const receivedMovies = await searchMovies({ search });
      setMovies(receivedMovies);
    } catch (error) {
      console.log("erro occured");
    }
  }, []);

  //Using useMemo
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [movies, sort]);

  return { movies: sortedMovies, getMovies };
}
