import { Link } from "react-router-dom"

export const Home = () => {
    return (
    <>
    <h1>Exhibition Curation Platform</h1>
    <Link to="/met">Metropolitan Museum of Art</Link>
    <br/>
    <Link to="/harvard">Harvard Art Museums</Link>
    </>
)
}