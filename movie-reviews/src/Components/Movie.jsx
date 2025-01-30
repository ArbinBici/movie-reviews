import { useState } from "react";

function Movie(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ratingError, setRatingError] = useState("");

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Function to handle review submission
    async function handleSubmission() {
        // Reset errors
        setEmailError("");
        setRatingError("");

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        const ratingValue = parseInt(rating);
        if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 10) {
            setRatingError("Rating must be an integer between 0 and 10.");
            return;
        }

        const newReview = {
            movie_id: props.movie_id,
            name,
            email,
            review,
            rating: ratingValue, 
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/add_review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReview),
            });

            if (response.ok) {
                alert("Review submitted successfully!");
                setName("");
                setEmail("");
                setReview("");
                setRating("");
            } else {
                alert("Failed to submit review.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Error connecting to server.");
        }
    }

    // Function to handle movie deletion
    async function handleDeleteMovie() {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/delete_movie/${props.movie_id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Movie deleted successfully!");
                    window.location.reload(); // Refresh the page to reflect the deletion
                } else {
                    alert("Failed to delete movie.");
                }
            } catch (error) {
                console.error("Error deleting movie:", error);
                alert("Error connecting to server.");
            }
        }
    }

    const uniqueModalId = `add-review-${props.title.replace(/\s+/g, "-").toLowerCase()}`; // Unique ID based on the title

    return (
        <>
            <div className="card bg-dark border-0">
                <img src={props.posterLink} className="card-img-top rounded" alt={props.title} />
                <div className="card-body text-center">
                    <h5 className="card-title text-white">{props.title}</h5>
                    <p className="card-text text-white">{props.description}</p>
                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#${uniqueModalId}`}>Add Review</button>
                        <button className="btn btn-danger" onClick={handleDeleteMovie}>Remove Movie</button>
                    </div>

                    {/* Modal */}
                    <div className="modal fade" id={uniqueModalId} tabIndex={-1} aria-labelledby="addReview">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addReview">Submit your review</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <label className="form-label" htmlFor="name">Name:</label>
                                    <input className="form-control" type="text" id="name" placeholder="Type your name" onChange={(e) => setName(e.target.value)} value={name} />
                                    <label className="form-label" htmlFor="email">Email:</label>
                                    <input className="form-control" type="email" id="email" placeholder="Type your email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                    {emailError && <p className="text-danger">{emailError}</p>}
                                    <label className="form-label" htmlFor="review">Review:</label>
                                    <textarea className="form-control" type="text" id="review" placeholder="Type your review" onChange={(e) => setReview(e.target.value)} value={review} />
                                    <label className="form-label" htmlFor="rating">Rating:</label>
                                    <input className="form-control" type="number" id="rating" placeholder="Type your rating (0-10)" onChange={(e) => setRating(e.target.value)} value={rating} />
                                    {ratingError && <p className="text-danger">{ratingError}</p>}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmission}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Modal End */}
                </div>
            </div>
        </>
    );
}

export default Movie;