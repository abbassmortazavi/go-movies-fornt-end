import { useEffect, useState } from "react";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        // fetch("http://localhost:8080/api/movies")
        //     .then((response) => response.json())
        //     .then((data) => setMovies(data))
        //     .catch((error) => console.error("Error fetching movies:", error));
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
            method: "GET",
            headers: headers,
        };
        fetch("http://localhost:8080/movies", requestOptions)
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error("Error fetching movies:", error));


    }, [])

    return (
        <div className="text-center">
            <h2>Movies</h2>
            <hr/>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Runtime</th>
                        <th>MPA Rating</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td><a href={`/movies/${movie.id}`}>{movie.title}</a></td>
                            <td>{movie.release_date}</td>
                            <td>{movie.runtime}</td>
                            <td>{movie.mpa_rating}</td>
                            <td>{movie.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default Movies;