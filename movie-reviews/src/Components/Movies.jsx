import Footer from "./Footer";
import Movie from "./Movie";

const Movies = () => {
    return (
        <>
            <p className="display-2 text-white mt-3 text-center">Movies</p>
            <div className="container">
                <div className="row ge-5">
                    <div className="col-lg-4">
                        <Movie posterLink="https://posterspy.com/wp-content/uploads/2022/08/Interstellar_poster.jpg" title="Interstellar (2014)" description="A movie about space travel." />
                    </div>
                    <div className="col-lg-4">
                        <Movie posterLink="https://static1.srcdn.com/wordpress/wp-content/uploads/2023/05/oppenheimer-poster.jpg" title="Oppenheimer (2023)" description="A movie about the creation of the atomic bomb." />
                    </div>
                    <div className="col-lg-4">
                        <Movie posterLink="https://static1.srcdn.com/wordpress/wp-content/uploads/2023/05/the-godfather-poster.jpeg" title="The Godfather (1972)" description="A movie about the mafia boss Vito Corleone." />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Movies;