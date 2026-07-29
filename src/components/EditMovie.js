import { useEffect, useState } from "react";
import { Form, useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "./form/Input";
import Select from "./form/Select";
import Textarea from "./form/TextArea";
const EditMovie = () => {
    const navigate = useNavigate();
    const { jwtToken } = useOutletContext();

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);

    const mpaOptions = [
        {
            id: 'G',
            value: 'G'
        },
        {
            id: 'a',
            value: 'a'
        },
        {
            id: 'w',
            value: 'f'
        },
        {
            id: 'h',
            value: 'd'
        },
        {
            id: 'c',
            value: 'b'
        },
    ]

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

                <Input
                    title="Release Date"
                    type="date"
                    className="form-control"
                    id={movie.title}
                    label="label"
                    name="release_date"
                    value={movie.release_date}
                    onChange={handelChange("release_date")}
                    errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
                    errorMsg="please Enter Release Date"
                />

                <Input
                    title="Run Time"
                    type="text"
                    className="form-control"
                    id={movie.runtime}
                    label="Runtime"
                    name="runtime"
                    value={movie.runtime}
                    onChange={handelChange("runtime")}
                    errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
                    errorMsg="please Enter Runtime"
                />
                <Select
                    title="MPAA Rating"
                    className="form-control"
                    id={movie.mpaa_rating}
                    label="MpaaRating"
                    name="mpaa_rating"
                    options={mpaOptions}
                    onChange={handelChange("mpaa_rating")}
                    errorDiv={hasError("mpaa_rating") ? "text-danger" : "d-none"}
                    errorMsg={"please Enter Mpaa Rating"}
                />
                <Textarea
                    title="Desription"
                    className="form-control"
                    id={movie.description}
                    label="Description"
                    name="description"
                    value= {movie.description}
                    rows={3}
                    onChange={handelChange("description")}
                    errorDiv={hasError("description") ? "text-danger" : "d-none"}
                    errorMsg={"please Enter Description"}
                />

            </form>
        </div>
    );
}


export default EditMovie;