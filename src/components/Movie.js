import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(()=>{
        const reqOptions = {
            method: "Get",
            crediantials: "include"

        }

        fetch("/movies/"+id, reqOptions)
        .then((res)=>res.json())
        .then(data=>{
            console.log(data);
            setMovie(data);
        }).catch(err=>{
            console.log(err);
        })
       
    }, [id])



    if (movie.genres) {
        movie.genres = Object.values(movie.genres);
    }else{
        movie.genres = [];
    }





    return (
        <div className="text-center">
            <h2>Movie: {movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p>Runtime: {movie.runtime} minutes</p>
            <p>MPA Rating: {movie.mpa_rating}</p>
            <p>Description: {movie.description}</p>
            <hr/>
            {movie.genres.map((g)=>(
                <span key={g. genre} className="badge bg-secondary me-2">{g. genre}</span>
            ))}
            <hr/>
            {movie.image !== "" &&
                <div className="mb-3">
                    <img src={`https://picsum.photos/id/${movie.image}/200/300`} alt="poster"/>
                </div>
            }
        </div>
    );
}


export default Movie;