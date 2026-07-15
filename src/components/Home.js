import { Link } from 'react-router-dom';
import Ticket from './../images/1.jpeg';

const Home = () => {
    return (
        <div className="text-center">
            <h2>Find a movie to watch tonight!</h2>
            <hr/>
            <Link to="/movies" className="btn btn-primary">
               <img src={Ticket} alt='movie tickets'/>
            </Link>
        
        </div>
    ); 
}

export default Home;