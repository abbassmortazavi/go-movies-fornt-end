import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
const ManageCatalogue = () => {
   const [movies, setMovies] = useState([]);
   const {jwtToken} = useOutletContext();
   const navigate = useNavigate();
   
       useEffect(()=>{

            if (jwtToken === ""){
                navigate("/login");
                return
            }

           const headers = new Headers();
           headers.append("Content-Type", "application/json");
           headers.append("Authorization", "Bearer " + jwtToken)
           const requestOptions = {
               method: "GET",
               headers: headers,
           };
           fetch("/admin/movies", requestOptions)
               .then((response) => response.json())
               .then((data) => setMovies(data))
               .catch((error) => console.error("Error fetching movies:", error));
   
   
       }, [jwtToken, navigate])
   
       return (
           <div className="text-center">
               <h2>Manage Catalogue</h2>
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
                               <td><a href={`/admin/movies/${movie.id}`}>{movie.title}</a></td>
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


export default ManageCatalogue;