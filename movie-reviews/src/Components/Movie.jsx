function Movie(props) {
    return (
        <>
            <div class="card bg-dark border-0">
                <img src={props.posterLink} class="card-img-top rounded"/>
                <div class="card-body text-center">
                    <h5 class="card-title text-white">{props.title}</h5>
                    <p class="card-text text-white">{props.description}</p>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#submit-message">Add Review</button>

                    {/* Modal */}
                    <div className="modal fade" id="submit-message" tabIndex={-1} aria-labelledby="submitted" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="submitted">Submitted</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Your message was submitted!</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

export default Movie