import { useEffect, useState } from "react";
import { Form, useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "./form/Input";
import Select from "./form/Select";
import Textarea from "./form/TextArea";
import Checkbox from "./form/Checkbox";
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
        runtime: "",
        mpaa_rating: "",
        genres: [],
        genres_array: [Array(13).fill(false)]

    })

    //get id from the url
    let { id } = useParams();
    if (id === undefined) {
        id = 0;
    }

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login");
            return
        }

        if (id === 0) {
            // add movie
            setMovie({
                id: 0,
                title: "",
                release_date: "",
                description: "",
                runtime: "",
                mpaa_rating: "",
                genres: [],
                genres_array: [Array(13).fill(false)]
            })


            const reqOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            fetch(`/genres`, reqOptions)
                .then((res) => res.json())
                .then(data => {
                    let checks = [];
                    data.forEach(g => {
                        checks.push({
                            id: g.id,
                            genre: g.genre,
                            checked: g.checked
                        })
                    });

                    setMovie(m => ({
                        ...m,
                        genres: checks,
                        genres_array: []
                    }))

                }).catch(err => {
                    console.log(err);
                })

        } else {
            //edit movie

        }


    }, [id, jwtToken, navigate]);
    const handelSubmit = (e) => {
        e.preventDefault();

    }

    const handelChange = () => (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setMovie({
            ...movie,
            [name]: value
        })
    }

    const handelCheck = (event, position) => {
        console.log("handelCheck is called");
        console.log("value in handelCheck: ", event.target.value);
        console.log("checked is: ", event.target.checked);

        let tmpArray = movie.genres;
        tmpArray[position].checked = !tmpArray[position].checked;
        let tmpIDs = movie.genres_array;
        if (!event.target.checked) {
            tmpIDs.splice(tmpIDs.indexOf(event.target.value));
        }else{
            tmpIDs.push(parseInt(event.target.value, 10));
        }

        setMovie({
            ...movie,
            genres_array: tmpIDs
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
                    value={movie.description}
                    rows={3}
                    onChange={handelChange("description")}
                    errorDiv={hasError("description") ? "text-danger" : "d-none"}
                    errorMsg={"please Enter Description"}
                />

                <hr />
                <h3>Genres</h3>
                {movie.genres && movie.genres.length > 1 &&

                    Array.from(movie.genres).map((g, index) => (
                        <Checkbox
                            type="checkbox"
                            title={g.genre}
                            id={"genre-" + index}
                            name={"genre"}
                            checked={movie.genres[index].checked}
                            onChange={(event) => handelCheck(event, index)}
                            value={g.id}
                            key={index}
                            className="form-check-input"

                        />
                    ))

                }

            </form>
        </div>
    );
}


export default EditMovie;