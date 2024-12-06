import Footer from "./Footer";
import React, { useState, useEffect } from "react";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Get reviews from localStorage
        const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        setReviews(storedReviews);
    }, []);

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
                            <div className="card-body">
                                <h5 className="card-title">Movie: {review.Title}</h5>
                                <h6 className="card-subtitle mb-2 mt-3">Name: {review.Name}</h6>
                                <h6 className="card-subtitle mb-2 mt-3 text-muted">Email: {review.Email}</h6>
                                <p className="card-text mt-3">Review: {review.Review}</p>
                                <p className="card-text"><strong>Rating:</strong> {review.Rating}</p>
                            </div>
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