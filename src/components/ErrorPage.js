import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset--md3">
                    <h1 className="mt-3">Ooops!!</h1>
                    <p>Sorry, an Unexpected Error has</p>
                    <em>{error.statusText || error.message}</em>
                </div>
            </div>
        </div>
    )
}