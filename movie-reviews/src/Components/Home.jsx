import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center m-3 mt-5 pt-5">
                <p className="display-1 text-white mt-5">Welcome to the Movie Review Website</p>
            </div>
            <div className="d-flex justify-content-center pt-2">
                <p className="display-6 text-white">Continue to our movie list to leave a review or contact us directly</p>
            </div>
            <div className="d-flex justify-content-center pt-5">
                <Link to="/movies" className="btn btn-light text-dark me-4 btn-lg" role="button"><strong>Movies</strong></Link>
                <Link to="/contact" className="btn btn-outline-light ms-4 btn-lg" role="button">Contact</Link>
            </div>
        </div>

    );
};

export default Home