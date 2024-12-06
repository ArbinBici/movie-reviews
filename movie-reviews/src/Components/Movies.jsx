import Footer from "./Footer";
import Movie from "./Movie";

const Movies = () => {
    return (
        <>
            <p className="display-4 text-white mt-3 text-center">Movies</p>
            <div className="container">
                <div className="row ge-5">
                    <div className="col-lg-4">
                        <Movie posterLink="https://posterspy.com/wp-content/uploads/2022/08/Interstellar_poster.jpg" title="Interstellar" description="A movie about space travel." />
                    </div>
                    <div className="col-lg-4">
                        <Movie posterLink="https://posterspy.com/wp-content/uploads/2022/08/Interstellar_poster.jpg" title="Interstellar" description="A movie about space travel." />
                    </div>
                    <div className="col-lg-4">
                        <Movie posterLink="https://posterspy.com/wp-content/uploads/2022/08/Interstellar_poster.jpg" title="Interstellar" description="A movie about space travel." />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Movies;