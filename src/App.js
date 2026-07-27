import { use, useCallback, useEffect, useState } from "react";
import { data, Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

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
        toggleRefresh(false);
      })
    navigate("/login");
  }


  const toggleRefresh = useCallback((status) => {
    if (status) {
      let i = setInterval(() => {
        console.log("this will run every second");
        const reqOptions = {
          method: "GET",
          crediantials: "include"
        }
        fetch(`/refresh-token`, reqOptions)
          .then((res) => res.json())
          .then((data => {
            if (data.access_token) {
              setJwtToken(data.access_token);
            }
          })).catch(error => {
            console.log(error);
          })
      }, 600000)
      setTickInterval(i)
      console.log("setting tick interval to ", i);
    } else {
      console.log("turning off ticking.");
      console.log("turning off set interval.", tickInterval);
      setTickInterval(null)
      clearInterval(tickInterval)
    }
  }, [tickInterval])

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
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })).catch(error => {
          console.log(error);
        })
    }
  }, [jwtToken, toggleRefresh])


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
                  <Link to="/admin/movies" className="list-group-item list-group-item-action">Manage Catalogue</Link>
                  <Link to="/graphql" className="list-group-item list-group-item-action">GraphQL</Link>
                </>
              }

            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Alert
            className={alertClassName}
            message={alertMessage}
          />
          <Outlet context={{
            setJwtToken,
            jwtToken,
            setAlertClassName,
            setAlertMessage,
            toggleRefresh
          }} />
        </div>
      </div>
    </div>
  );
}

export default App;
