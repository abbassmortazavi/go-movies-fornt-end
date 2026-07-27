import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(()=>{
        let movieDetails = {
            id: 1,
            title: "new movie",
            release_date: "2026-01-02",
            runtime: 20,
            mpa_rating: "R",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
        setMovie(movieDetails);
    }, [id])
    return (
        <div className="text-center">
            <h2>Movie: {movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p>Runtime: {movie.runtime} minutes</p>
            <p>MPA Rating: {movie.mpa_rating}</p>
            <p>Description: {movie.description}</p>
            <hr/>
        </div>
    );
}


export default Movie;