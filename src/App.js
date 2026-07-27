import { use, useEffect, useState } from "react";
import { data, Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  const [ticking, setTicking] = useState(false);
  const [tickInterval, setTickInterval] = useState();


  const navigate = useNavigate();


  let logout = () => {
    let reqOptions = {
      method: 'GET',
      credentials: 'include',

    }
    fetch(`/logout`, reqOptions)
      .catch(err => {
        console.log("err in logout: ", err);
      }).finally(() => {
        setJwtToken("");
      })
    navigate("/login");
  }



  useEffect(() => {
    if (jwtToken === "") {
      const reqOptions = {
        method: "GET",
        crediantials: "include"
      }
      fetch(`/refresh-token`, reqOptions)
        .then((res) => res.json())
        .then((data => {
          if (data.access_token) {
            setJwtToken(data.access_token)
          }
        })).catch(error => {
          console.log(error);
        })
    }
  }, [jwtToken])

  const toggleRefresh = () => {
    console.log("clicker");
    if (!ticking) {
      console.log("turning on ticking");
      let i = setInterval(() => {
        console.log("this will run every second");

      }, 1000)
      setTickInterval(i)
      console.log("setting tick interval to ", i);
      setTicking(true);
    } else {
        console.log("turning off ticking.");
        console.log("turning off set interval.", tickInterval);
        setTickInterval(null)
        clearInterval(tickInterval)
         setTicking(false);
    }
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go Watch Movies!</h1>
        </div>

        <div className="col text-end">
          {
            jwtToken === ""
              ?
              <Link to="/login">
                <span className="badge bg-success">Login</span>
              </Link>
              : <a href="#!" onClick={logout}><span className="badge bg-danger">Logout</span></a>
          }

        </div>
        <hr className="mb-3" />
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">Home</Link>
              <Link to="/movies" className="list-group-item list-group-item-action">Movies</Link>
              <Link to="/genres" className="list-group-item list-group-item-action">Genres</Link>
              {
                jwtToken !== "" &&
                <>
                  <Link to="/admin/movie/0" className="list-group-item list-group-item-action">Add Movie</Link>
                  <Link to="/manage-catalogue" className="list-group-item list-group-item-action">Manage Catalogue</Link>
                  <Link to="/graphql" className="list-group-item list-group-item-action">GraphQL</Link>
                </>
              }

            </div>
          </nav>
        </div>
        <div className="col-md-10">
        <a href="#!" className="btn btn-outline-secondary" onClick={toggleRefresh}>Toggle Ticking</a>
          <Alert
            className={alertClassName}
            message={alertMessage}
          />
          <Outlet context={{
            setJwtToken, jwtToken,
            setAlertClassName, setAlertMessage
          }} />
        </div>
      </div>
    </div>
  );
}

export default App;
