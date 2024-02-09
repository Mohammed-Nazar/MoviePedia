import { Link } from "react-router-dom";
export default function Error(){
    return (
        <>
        <div className="error">
        <h1>Page Not found</h1>
        <Link to="/">Back to home</Link>
        </div>
        </>
    )
}