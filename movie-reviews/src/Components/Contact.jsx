import Footer from "./Footer";

const Contact = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <p className="display-4 text-white mt-5 border-bottom border-3 border-white-50 text-center"><strong>Contact Us</strong></p>
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-lg-6">
                        <label htmlFor="name" className="form-label text-white lead">Full Name:</label>
                        <input type="text" className="form-control" id="name" placeholder="eg. John Doe"/>
                        <div className="pt-4">
                            <label htmlFor="email" className="form-label text-white lead">Email:</label>
                            <input type="email" className="form-control" id="email" placeholder="example@example.com"/>
                        </div>
                        <div className="pt-4 pb-4">
                            <label htmlFor="message" className="form-label text-white lead">Message:</label>
                            <textarea className="form-control" id="message"/>
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="btn btn-secondary text-white btn-lg" data-bs-toggle="modal" data-bs-target="#submit-message">Submit</button>

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
                    <div className="col-lg-6">
                        <img src="https://posterspy.com/wp-content/uploads/2022/08/Interstellar_poster.jpg" alt="Interstellar Movie Poster" className="rounded float-end mx-auto w-75"/>
                    </div>
                </div>                
            </div>
            <Footer />
        </>
    );
};

export default Contact;