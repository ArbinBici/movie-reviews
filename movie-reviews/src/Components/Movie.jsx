import { useState } from "react";

function Movie(props) {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");

    function handleSubmission() {
        const newReview = {
            Title: props.title,
            Name: name,
            Email: email,
            Review: review,
            Rating: rating,
        };

        const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        existingReviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(existingReviews));

        alert("Review submitted!");
        setName("");
        setEmail("");
        setReview("");
        setRating("");
    }

    const uniqueModalId = `add-review-${props.title.replace(/\s+/g, "-").toLowerCase()}`; // Unique ID based on the title

    return (
        <>
            <div className="card bg-dark border-0">
                <img src={props.posterLink} className="card-img-top rounded" alt={props.title}/>
                <div className="card-body text-center">
                    <h5 className="card-title text-white">{props.title}</h5>
                    <p className="card-text text-white">{props.description}</p>
                    <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={`#${uniqueModalId}`}>Add Review</button>

                    {/* Modal */}
                    <div className="modal fade" id={uniqueModalId} tabIndex={-1} aria-labelledby="addReview">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addReview">Submit your review</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label className="form-label" htmlFor="name">Name:</label>
                                    <input className="form-control" type="text" id="name" placeholder="Type your name" onChange={(e) => setName(e.target.value)} value={name}/>
                                    <label className="form-label" htmlFor="email">Email:</label>
                                    <input className="form-control"type="email" id="email" placeholder="Type your email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                                    <label className="form-label" htmlFor="review">Review:</label>
                                    <textarea className="form-control" type="text" id="review" placeholder="Type your review" onChange={(e) => setReview(e.target.value)} value={review}/>
                                    <label className="form-label" htmlFor="rating">Rating:</label>
                                    <input className="form-control" type="number" id="rating" placeholder="Type your rating" onChange={(e) => setRating(e.target.value)} value={rating}/>
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
};

export default Movie;