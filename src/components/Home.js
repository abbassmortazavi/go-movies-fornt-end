import Ticket from './../images/1.jpeg';

const Home = () => {
    return (
        <div className="text-center">
            <h2>Find a movie to watch tonight!</h2>
            <hr/>
            <img src={Ticket} alt='movie tickets'/>
        </div>
    ); 
}

export default Home;