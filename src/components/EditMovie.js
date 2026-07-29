import { useEffect, useState } from "react";
import { Form, useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "./form/Input";

const EditMovie = () => {
    const navigate = useNavigate();
    const { jwtToken } = useOutletContext();

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);



    const hasError = (key) => {
        return errors.indexOf(key) !== -1;
    }


    const [movie, setMovie] = useState({
        id: 0,
        title: "",
        release_date: "",
        description: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",

    })

    //get id from the url
    let { id } = useParams();

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login");
            return
        }


    }, [jwtToken, navigate]);
    const handelSubmit = (e) => {
        e.preventDefault();

    }

    const handelChange = () => (event)=> {
        let name = event.target.name;
        let value = event.target.value;
        setMovie({
            ...movie,
            [name]: value
        })
    }
    return (
        <div className="text-center">
            <h2>Add/Edit Movie</h2>
            <hr />
            <form onSubmit={handelSubmit}>
                <pre>
                    {JSON.stringify(movie, null, 3)}
                </pre>
                <input type="hidden" name="id" value={movie.id} id="id" />
                <Input
                    title="title"
                    type="text"
                    className="form-control"
                    id={movie.title}
                    label="label"
                    name={"title"}
                    value={movie.title}
                    onChange={handelChange("title")}
                    errorDiv={hasError("title") ? "text-danger" : "de-none"}
                    errorMsg="please Enter Title"
                />
            </form>
        </div>
    );
}


export default EditMovie;