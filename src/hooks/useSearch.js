import { useEffect, useRef, useState } from "react";

export  function useSearch() {
    const [search, updateSearch] = useState("");
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true); //In order to know if user has not edited the input yet
  
    useEffect(() => {
      if(isFirstInput.current){
        isFirstInput.current = search === ''
        return
      }
      
      if (search === "") {
        setError("This field is required");
        return;
      }
      if (search.match(/^\d+$/)) {
        setError("Cannot be number");
        return;
      }
      if (search.length < 3) {
        setError("Must be at least 3 characters");
        return;
      }
    }, [search]);
  
    return { search, updateSearch, error };
  }
  