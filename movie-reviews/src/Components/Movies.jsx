import { useEffect, useState } from "react";
import Footer from "./Footer";
import Movie from "./Movie";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for the search bar

    // Fetch movies on component mount
    useEffect(() => {
        fetch("http://127.0.0.1:5000/get_movies")
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error("Error fetching movies:", error));
    }, []);

    // Function to handle adding a movie
    const handleAddMovie = async () => {
        if (!searchTerm) {
            alert("Please enter a movie title to search.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/fetch_movie_data?title=${searchTerm}`);
            if (response.ok) {
                alert("Movie added successfully!");
                setSearchTerm(""); // Clear the search bar
                // Refresh the movies list
                fetch("http://127.0.0.1:5000/get_movies")
                    .then((response) => response.json())
                    .then((data) => setMovies(data))
                    .catch((error) => console.error("Error fetching movies:", error));
            } else {
                alert("Failed to add movie. Please check the title and try again.");
            }
        } catch (error) {
            console.error("Error adding movie:", error);
            alert("Error connecting to server.");
        }
    };

    return (
        <>
            <p className="display-2 text-white mt-3 text-center">Movies</p>
            <div className="container">
                {/* Search Bar and Add Movie Button */}
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search for a movie..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={handleAddMovie}
                            >
                                Add Movie
                            </button>
                        </div>
                    </div>
                </div>

                {/* Movie Cards */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {movies.map((movie, index) => (
                        <div className="col" key={index}>
                            <Movie 
                                posterLink={movie.poster_url} 
                                title={movie.title} 
                                description={movie.description}
                                movie_id={movie.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Movies;