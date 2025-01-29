import Footer from "./Footer";
import React, { useState, useEffect } from "react";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null); // Track the review being edited
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editReview, setEditReview] = useState("");
    const [editRating, setEditRating] = useState("");

    // Fetch reviews on component mount
    useEffect(() => {
        fetch("http://127.0.0.1:5000/get_reviews")
            .then((response) => response.json())
            .then((data) => setReviews(data))
            .catch((error) => console.error("Error fetching reviews:", error));
    }, []);

    // Function to handle review deletion
    const handleDeleteReview = async (review_id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/delete_review/${review_id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Review deleted successfully!");
                    setReviews(reviews.filter((review) => review.id !== review_id)); // Remove the deleted review from the state
                } else {
                    alert("Failed to delete review.");
                }
            } catch (error) {
                console.error("Error deleting review:", error);
                alert("Error connecting to server.");
            }
        }
    };

    // Function to handle review editing
    const handleEditReview = async (review_id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/update_review/${review_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: editName,
                    email: editEmail,
                    review: editReview,
                    rating: parseInt(editRating),
                }),
            });

            if (response.ok) {
                alert("Review updated successfully!");
                setEditingReview(null); // Exit edit mode
                setReviews((prevReviews) =>
                    prevReviews.map((review) =>
                        review.id === review_id
                            ? {
                                  ...review,
                                  name: editName,
                                  email: editEmail,
                                  review: editReview,
                                  rating: parseInt(editRating),
                              }
                            : review
                    )
                );
            } else {
                alert("Failed to update review.");
            }
        } catch (error) {
            console.error("Error updating review:", error);
            alert("Error connecting to server.");
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="d-flex justify-content-center m-3 mt-5 pt-5">
                    <p className="display-1 text-white">Reviews</p>
                </div>
            </div>
            <div className="container mt-4">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div className="card mb-3" key={index}>
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div className="flex-grow-1">
                                    <h5 className="card-title">Movie: {review.title}</h5>
                                    <h6 className="card-subtitle mb-2 mt-3">Name: {review.name}</h6>
                                    <h6 className="card-subtitle mb-2 mt-3 text-muted">Email: {review.email}</h6>
                                    <p className="card-text mt-3">Review: {review.review}</p>
                                    <p className="card-text"><strong>Rating:</strong> {review.rating}</p>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setEditingReview(review.id);
                                            setEditName(review.name);
                                            setEditEmail(review.email);
                                            setEditReview(review.review);
                                            setEditRating(review.rating);
                                        }}
                                    >
                                        Edit Review
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteReview(review.id)}
                                    >
                                        Delete Review
                                    </button>
                                </div>
                            </div>
                            {editingReview === review.id && (
                                <div className="mt-3 p-3 border-top">
                                    <h6>Edit Review</h6>
                                    <label className="form-label" htmlFor="editName">Name:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="editName"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="editEmail">Email:</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        id="editEmail"
                                        value={editEmail}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="editReview">Review:</label>
                                    <textarea
                                        className="form-control"
                                        id="editReview"
                                        value={editReview}
                                        onChange={(e) => setEditReview(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="editRating">Rating:</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        id="editRating"
                                        value={editRating}
                                        onChange={(e) => setEditRating(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={() => handleEditReview(review.id)}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        className="btn btn-secondary mt-2 ms-2"
                                        onClick={() => setEditingReview(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-white">No reviews available yet!</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Reviews;