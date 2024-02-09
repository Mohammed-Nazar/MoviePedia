import { Link } from "react-router-dom"

export default function Nav(){
    return (
        <>
        <div className="flex justify-between p-4 font-mono">
            <Link to="/"><h1 className="font-bold lg:text-4xl">MoviePedia</h1></Link>
            <ul className="flex lg:text-2xl">
                <li className="mx-3 "><Link to="/">Home</Link></li>
                <li>🍿</li>
            </ul>
        </div>
        </>
    )
}